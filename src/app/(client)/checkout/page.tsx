"use client";

import { getAddToCartProductsAPI } from "@/apis/addToCartAPIs";
import { calculateShippingChargesAPI, createOrderAPI } from "@/apis/orderAPIs";
import { verifyPaymentAPI } from "@/apis/paymentAPIs";
import { getUserProfileAPI } from "@/apis/userProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface CartItem {
  id: string;
  variantId: string;
  imageSrc: string;
  title: string;
  variantName: string;
  price: string;
  quantity: number;
  discount?: {
    type?: string;
    value?: number;
    active: boolean;
    startDate?: string;
    endDate?: string;
  };
}

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  _id: string;
  shoppingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

interface ShippingOption {
  courierName: string;
  rate: number;
  estimatedDeliveryDays: number;
}

interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: Array<{
    Name: string;
    District: string;
    State: string;
    Pincode: string;
  }>;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"Razorpay" | "COD">("Razorpay");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<ShippingOption | null>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      addressLine1: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      addressLine1: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      postalCode: Yup.string()
        .required("Pincode is required")
        .matches(/^\d{6}$/, "Pincode must be 6 digits"),
      phone: Yup.string()
        .required("Phone is required")
        .test("is-valid-phone", "Phone number is invalid", (value) => {
          return value ? isValidPhoneNumber(value) : false;
        }),
    }),
    onSubmit: async (values) => {
      if (!cartItems.length) {
        toast.info("Cart is empty");
        return;
      }
      if (!selectedCourier) {
        toast.info("Please select a courier");
        return;
      }
      await handlePlaceOrder(values);
    },
  });

  // Function to fetch city and state from PIN code via proxy API
  const fetchCityStateFromPincode = async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) return;

    setPincodeLoading(true);
    try {
      const response = await fetch(`/api/pincode/${pincode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: PincodeResponse[] = await response.json();

      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        formik.setFieldValue("city", postOffice.District);
        formik.setFieldValue("state", postOffice.State);
      } else {
        toast.info("Invalid PIN code or no data found");
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
      }
    } catch (error) {
      console.error("Error fetching PIN code data:", error);
      toast.info("Failed to fetch city and state");
      formik.setFieldValue("city", "");
      formik.setFieldValue("state", "");
    } finally {
      setPincodeLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProfileLoading(true);
        const [profileRes, cartRes] = await Promise.all([
          getUserProfileAPI(),
          getAddToCartProductsAPI(),
        ]);

        const profileData = profileRes.data.data;
        setProfile(profileData);

        if (profileData) {
          formik.setValues({
            name: `${profileData.first_name || ""} ${profileData.last_name || ""}`.trim(),
            addressLine1: profileData?.shoppingAddress?.addressLine1 || "",
            city: profileData?.shoppingAddress?.city || "",
            state: profileData.shoppingAddress?.state || "",
            postalCode: profileData.shoppingAddress?.postalCode || "",
            phone: profileData.phone || "",
          });

          // Fetch city and state if postalCode exists in profile
          if (profileData.shoppingAddress?.postalCode) {
            await fetchCityStateFromPincode(profileData.shoppingAddress.postalCode);
          }
        }

        const mappedItems = cartRes.data.data.products.map((item: any) => ({
          id: item.productId,
          variantId: item.variantId,
          imageSrc:
            item.productDetails.images.find((img: any) => img.sequence === 0)?.url ||
            "/placeholder-image.jpg",
          title: item.productDetails.name,
          variantName: item.productDetails.variant.name,
          price: item.productDetails.variant.price.$numberDecimal,
          quantity: item.quantity,
          discount: item.productDetails.variant.discount,
        }));
        setCartItems(mappedItems);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // toast.error("Failed to load checkout data");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle PIN code changes
  useEffect(() => {
    const pincode = formik.values.postalCode.trim();
    if (pincode.length === 6) {
      fetchCityStateFromPincode(pincode);
    }
  }, [formik.values.postalCode]);

  // Fetch shipping charges when postal code, cart items, or payment method change
  useEffect(() => {
    const fetchShippingCharges = async () => {
      const postalCode = formik.values.postalCode.trim();

      if (!/^\d{6}$/.test(postalCode) || cartItems.length === 0) return;

      try {
        const products = cartItems.map((item) => ({
          productId: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
        }));

        const response = await calculateShippingChargesAPI(
          postalCode,
          products,
          paymentMethod === "COD" ? 1 : 0
        );

        const { shippingOptions } = response.data;

        const parsedOptions = shippingOptions.map((option: any) => ({
          ...option,
          estimatedDeliveryDays: parseInt(option.estimatedDeliveryDays, 10),
        }));

        setShippingOptions(parsedOptions);

        const cheapestOption = parsedOptions.reduce(
          (min: ShippingOption, option: ShippingOption) =>
            option.rate < min.rate ? option : min,
          parsedOptions[0]
        );

        setSelectedCourier(cheapestOption);
      } catch (error) {
        console.error("Error fetching shipping charges:", error);
        toast.info("Failed to calculate shipping charges");
      }
    };

    fetchShippingCharges();
  }, [formik.values.postalCode, cartItems, paymentMethod]);

  const handlePlaceOrder = async (values: typeof formik.values) => {
    setLoading(true);
    try {
      const addressSnapshot = {
        addressLine1: values.addressLine1,
        city: values.city,
        state: values.state,
        country: "India",
        postalCode: values.postalCode,
        name: values.name,
        phone: values.phone,
        email: profile?.email || "",
      };

      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          discount:
            item.discount?.active && item.discount?.value
              ? item.discount.value
              : 0,
          tax: 0,
        })),
        shippingAddress: addressSnapshot,
        paymentMethod: paymentMethod === "COD" ? (1 as 0 | 1) : (0 as 0 | 1),
        userDetails: {
          name: values.name,
          phone: values.phone,
          email: profile?.email || "",
        },
        courierName: selectedCourier?.courierName || "",
      };

      const response = await createOrderAPI(orderData);
      const { orderId, totalAmount, razorpayOrderId } = response.data.data;

      if (paymentMethod === "Razorpay" && razorpayOrderId) {
        await handleRazorpayPayment({
          razorpayOrderId,
          totalAmount,
          orderId,
          addressSnapshot,
        });
      } else {
        const verifyResponse = await verifyPaymentAPI({
          orderId,
          addressSnapshot,
          paymentMethod: 1,
          courierName: selectedCourier?.courierName || "",
        });
        if (verifyResponse.data.success) {
          toast.success("Order placed successfully!");
          router.push(`/order-confirmation/${orderId}`);
        } else {
          throw new Error("COD order verification failed");
        }
      }
    } catch (error: any) {
      console.error("Order placement error:", error);
      toast.info(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = ({
    razorpayOrderId,
    totalAmount,
    orderId,
    addressSnapshot,
  }: {
    razorpayOrderId: string;
    totalAmount: number;
    orderId: string;
    addressSnapshot: any;
  }) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        order_id: razorpayOrderId,
        name: "Gauraaj",
        description: "Order Payment",
        handler: async (paymentResponse: any) => {
          try {
            const verifyResponse = await verifyPaymentAPI({
              orderId,
              razorpay_order_id: razorpayOrderId,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              addressSnapshot,
              paymentMethod: 0,
              courierName: selectedCourier?.courierName || "",
            });

            if (verifyResponse.data.success) {
              toast.success("Payment successful!");
              router.push(`/order-confirmation/${orderId}`);
              resolve(true);
            } else {
              setLoading(true);
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast.info("Payment verification failed");
            reject(error);
          }
        },
        prefill: {
          name: formik.values.name,
          email: profile?.email || "",
          contact: profile?.phone || "",
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.info("Payment failed. Please try again.");
        reject(new Error("Payment failed"));
      });

      rzp.on("modal.closed", () => {
        toast.info("Payment cancelled.");
        setLoading(false);
      });
      rzp.open();
    });
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => {
        const numericPrice = parseFloat(item.price);
        const discountedPrice =
          item.discount?.active && item.discount?.value
            ? numericPrice * (1 - item.discount.value / 100)
            : numericPrice;
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) + (selectedCourier?.rate || 0)
    ).toFixed(2);
  };

  if (profileLoading) {
    return (
      <div className="container mx-auto py-7 p-3 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-7 p-3 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-center">Checkout</h1>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="addressLine1">Address</Label>
              <Input
                id="addressLine1"
                name="addressLine1"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                <p className="text-sm text-red-500">{formik.errors.addressLine1}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="postalCode">Pincode</Label>
              <div className="relative">
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={pincodeLoading}
                />
                {pincodeLoading && (
                  <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin" />
                )}
              </div>
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <p className="text-sm text-red-500">{formik.errors.postalCode}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={pincodeLoading}
              />
              {formik.touched.city && formik.errors.city ? (
                <p className="text-sm text-red-500">{formik.errors.city}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={pincodeLoading}
              />
              {formik.touched.state && formik.errors.state ? (
                <p className="text-sm text-red-500">{formik.errors.state}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <PhoneInput
                id="phone"
                name="phone"
                international
                defaultCountry="IN"
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                onBlur={formik.handleBlur}
                className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 w-full transition-all duration-300"
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-sm text-red-500">{formik.errors.phone}</p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => {
              const numericPrice = parseFloat(item.price);
              const discountedPrice =
                item.discount?.active && item.discount?.value
                  ? numericPrice * (1 - item.discount.value / 100)
                  : numericPrice;

              return (
                <div
                  key={`${item.id}-${item.variantId}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.variantName}</p>
                      <div className="flex items-center gap-2">
                        {item.discount?.active && item.discount?.value ? (
                          <>
                            <p className="text-gray-800">
                              ₹{discountedPrice.toFixed(2)} x {item.quantity}
                            </p>
                            <p className="text-gray-500 line-through text-sm">
                              ₹{numericPrice.toFixed(2)}
                            </p>
                            <span className="text-xs text-red-500">
                              ({item.discount.value}% OFF)
                            </span>
                          </>
                        ) : (
                          <p className="text-gray-800">
                            ₹{numericPrice.toFixed(2)} x {item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    ₹{(discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800 font-bold">
                ₹{calculateSubtotal()}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-gray-800 font-bold">
                ₹{(selectedCourier?.rate || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Total:</span>
              <span className="text-gray-800 font-bold">
                ₹{calculateTotal()}
              </span>
            </div>
            {selectedCourier && (
              <div className="mt-2">
                <span className="text-gray-600">
                  Estimated Delivery: {selectedCourier.estimatedDeliveryDays} days
                </span>
              </div>
            )}
            <div className="mt-4 hidden">
              <h3 className="text-lg font-semibold mb-2">Select Courier</h3>
              <RadioGroup
                value={selectedCourier?.courierName || ""}
                onValueChange={(value) => {
                  const courier = shippingOptions.find(
                    (option) => option.courierName === value
                  );
                  setSelectedCourier(courier || null);
                }}
              >
                {shippingOptions.map((option) => (
                  <div
                    key={option.courierName}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.courierName}
                      id={option.courierName}
                    />
                    <Label htmlFor={option.courierName}>
                      {option.courierName} (₹{option.rate.toFixed(2)},{" "}
                      {option.estimatedDeliveryDays} days)
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as "Razorpay" | "COD")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Razorpay" id="razorpay" />
                  <Label htmlFor="razorpay">Razorpay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COD" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              type="submit"
              onClick={() => formik.handleSubmit()}
              disabled={loading || !cartItems.length || !selectedCourier}
              className="w-full mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606]"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;