"use client";
import { getAddTOCartProductsAPI } from "@/apis/addToCartAPIs";
import { createOrderAPI } from "@/apis/orderAPIs"; // API to create an order
import { verifyPaymentAPI } from "@/apis/paymentAPIs";
import { getUserProfileAPI, updateUserProfileAPI } from "@/apis/userProfile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type CartItemProps = {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
};

type UserProfile = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  _id: string;
  shoppingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
};

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  // Fetch user profile
  const getUserProfile = async () => {
    try {
      const response = await getUserProfileAPI();
      console.log("User Profile", response.data.data);
      setProfile(response.data.data);

      // Pre-fill shipping address form with profile data
      if (response.data.data) {
        const { first_name, last_name, phone, shoppingAddress } =
          response.data.data;
        setShippingAddress({
          name: `${first_name} ${last_name}`,
          address: `${shoppingAddress.addressLine1} ${shoppingAddress.addressLine2}`,
          city: shoppingAddress.city,
          state: shoppingAddress.state,
          pincode: shoppingAddress.postalCode,
          phone: phone,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  // Update user profile with new shipping address
  const updateProfileAndAddress = async () => {
    try {
      const { name, address, city, state, pincode, phone } = shippingAddress;
      const [first_name, last_name] = name.split(" ");

      const response = await updateUserProfileAPI({
        first_name,
        last_name,
        phone,
        shoppingAddress: {
          addressLine1: address,
          addressLine2: "",
          city,
          state,
          country: "India", // Default country
          postalCode: pincode,
        },
        email: profile?.email || "", // Use existing email
      });

      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Fetch cart products
  const getAllCartProducts = async () => {
    setLoading(true);
    try {
      const response = await getAddTOCartProductsAPI();
      console.log("Get All Cart Products", response.data);

      // Map the API response to the CartItemProps type
      const mappedItems = response.data.data.products.map((item: any) => ({
        id: item.productId._id,
        imageSrc: item.productId.images[0],
        title: item.productId.name,
        price: parseFloat(item.productId.price.$numberDecimal),
        quantity: item.quantity,
      }));

      setCartItems(mappedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    getAllCartProducts();
  }, []);

  // Handle input change for shipping address
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  console.log({ key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID });

  // Handle order submission
  const handlePlaceOrder = async () => {
    if (
      !shippingAddress.name ||
      !shippingAddress.address ||
      !shippingAddress.phone ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    setLoading(true);

    try {
      // Update user profile with new shipping address
      await updateProfileAndAddress();

      // Prepare order data
      const orderData: any = {
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          discount: 0, // Add discount if applicable
          tax: 0, // Add tax if applicable
        })),
        shippingAddressId: profile?._id, // Replace with actual shipping address ID
        paymentMethod: paymentMethod || "Razorpay",
        addressSnapshot: {
          addressLine1: shippingAddress.address, // Map address to addressLine1
          addressLine2: "", // Add addressLine2 if applicable
          city: shippingAddress.city,
          state: shippingAddress.state,
          country: "India", // Default country
          postalCode: shippingAddress.pincode, // Map pincode to postalCode
        },
      };

      // Create order
      const response = await createOrderAPI(orderData);
      console.log("API Response:", response); // Debugging

      // Check if the response structure is valid
      if (!response.data || !response.data.data || !response.data.data.order) {
        throw new Error("Invalid API response structure");
      }

      const { totalAmount, _id: orderId } = response.data.data.order;

      // Handle Razorpay payment
      if (paymentMethod === "Razorpay") {
        if (!response.data.data.razorpayOrder) {
          throw new Error("Invalid API response structure");
        }
        const { id: razorpayOrderId } = response.data.data.razorpayOrder;
        console.log("Razorpay Order ID:", razorpayOrderId); // Debugging

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use environment variable
          amount: totalAmount * 100, // Amount in paise
          currency: "INR",
          order_id: razorpayOrderId, // Order ID from the backend
          name: "Your Company Name",
          description: "Payment for your order",
          handler: async function (paymentResponse: any) {
            try {
              const verifyResponse = await verifyPaymentAPI({
                razorpay_order_id: razorpayOrderId,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              });

              const verificationResult = verifyResponse.data.data;
              console.log("verificationResult", verificationResult);

              if (verificationResult.success) {
                toast.success("Payment successful!");
                router.push(`/order-confirmation/${orderId}`);
              } else {
                toast.error(
                  "Payment verification failed. Please contact support."
                );
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              toast.error(
                "Payment verification failed. Please contact support."
              );
            }
          },
          prefill: {
            name: shippingAddress.name,
            email: profile?.email,
            contact: shippingAddress.phone,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          console.error("Payment failed:", response);
          toast.error("Payment failed. Please try again.");
        });
        rzp.open();
      } else {
        // For COD, redirect to order confirmation page
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${orderId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total: any, item: any) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto py-7 p-3">
      <h1 className="text-2xl md:text-4xl font-bold text-center">Checkout</h1>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Shipping Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={shippingAddress.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={shippingAddress.state}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={shippingAddress.pincode}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item: any) => (
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
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === "Razorpay"}
                    onChange={() => handlePaymentMethodChange("Razorpay")}
                  />
                  Razorpay
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => handlePaymentMethodChange("COD")}
                  />
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>
            <Button
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className="w-full mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
