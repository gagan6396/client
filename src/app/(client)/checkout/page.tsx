"use client";
import { getAddTOCartProductsAPI } from "@/apis/addToCartAPIs";
import { createOrderAPI } from "@/apis/orderAPIs";
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
import { toast } from "react-toastify";
import * as Yup from "yup";

interface CartItem {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
}

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  _id: string;
  shoppingAddress: {
    addressLine1: string;
    addressLine2?: string; // Optional field
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"Razorpay" | "COD">("Razorpay");

  const formik = useFormik({
    initialValues: {
      name: "",
      addressLine1: "", // Updated to match addressSnapshot
      city: "",
      state: "",
      postalCode: "", // Updated to match addressSnapshot
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
        .matches(/^\d{10}$/, "Phone must be 10 digits"),
    }),
    onSubmit: async (values) => {
      if (!cartItems.length) {
        toast.error("Cart is empty");
        return;
      }
      await handlePlaceOrder(values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProfileLoading(true);
        const [profileRes, cartRes] = await Promise.all([
          getUserProfileAPI(),
          getAddTOCartProductsAPI(),
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
        }

        const mappedItems = cartRes.data.data.products.map((item: any) => ({
          id: item.productId._id,
          imageSrc: item.productId.images[0],
          title: item.productId.name,
          price: parseFloat(item.productId.price.$numberDecimal),
          quantity: item.quantity,
        }));
        setCartItems(mappedItems);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load checkout data");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlaceOrder = async (values: typeof formik.values) => {
    setLoading(true);
    try {
      const addressSnapshot = {
        addressLine1: values.addressLine1,
        city: values.city,
        state: values.state,
        country: "India",
        postalCode: values.postalCode,
      };

      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          discount: 0,
          tax: 0,
        })),
        shippingAddress: addressSnapshot,
        paymentMethod,
        userDetails: {
          name: values.name,
          phone: values.phone,
          email: profile?.email || "",
        },
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
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${orderId}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
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
        name: "Your Company Name",
        description: "Order Payment",
        handler: async (paymentResponse: any) => {
          try {
            const verifyResponse = await verifyPaymentAPI({
              orderId,
              razorpay_order_id: razorpayOrderId,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              addressSnapshot,
            });

            if (verifyResponse.data.success) {
              toast.success("Payment successful!");
              router.push(`/order-confirmation/${orderId}`);
              resolve(true);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
            reject(error);
          }
        },
        prefill: {
          name: formik.values.name,
          email: profile?.email || "",
          contact: formik.values.phone,
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        reject(new Error("Payment failed"));
      });
      rzp.open();
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (profileLoading) {
    return (
      <div className="container mx-auto py-7 p-3 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-7 p-3">
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
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              />
              {formik.touched.state && formik.errors.state ? (
                <p className="text-sm text-red-500">{formik.errors.state}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="postalCode">Pincode</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <p className="text-sm text-red-500">{formik.errors.postalCode}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">
                      ₹{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800 font-bold">
                ₹{calculateTotal()}
              </span>
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
              disabled={loading || !cartItems.length}
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