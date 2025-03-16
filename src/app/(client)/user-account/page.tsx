"use client";

import {
  cancelOrderAPI,
  exchangeOrderAPI,
  getUserOrdersAPI,
  returnOrderAPI,
  trackOrderAPI,
} from "@/apis/orderAPIs";
import { getUserProfileAPI, updateUserProfileAPI } from "@/apis/userProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

// Interfaces based on updated API response
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Product {
  productId: { _id: string; name: string; images: string[] };
  variantId: string;
  quantity: number;
  price: number; // Variant-specific price
  name: string; // Variant-specific name (e.g., "Test Product - 1 Kg")
  skuParameters: { weight: string };
  _id: string;
}

interface Payment {
  _id: string;
  paymentMethod: string;
  status: string;
  amount: { $numberDecimal: string };
}

interface Order {
  _id: string;
  user_id: User;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  shippingStatus: string;
  products: Product[];
  shippingAddressId: string | null;
  payment_id: Payment;
  shipRocketOrderId?: number;
}

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profileImage: string;
  shoppingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

interface ReturnExchangeFormData {
  reason: string;
  products: { productId: string; variantId: string; quantity: number }[];
}

interface TrackingData {
  tracking_data: {
    track_status: number;
    shipment_status: number;
    shipment_track: {
      awb_code: string;
      courier_name: string;
      current_status: string;
      edd: string | null;
      delivered_date: string;
      pickup_date: string;
    }[];
    shipment_track_activities:
      | { activity: string; date: string; location: string }[]
      | null;
    track_url: string;
    error?: string;
  };
}

// Yup schemas
const profileSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  shoppingAddress: yup.object({
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    postalCode: yup.string().required("Postal Code is required"),
  }),
});

const returnExchangeSchema = yup.object({
  reason: yup.string().required("Reason is required"),
  products: yup
    .array()
    .of(
      yup.object({
        productId: yup.string().required("Product ID is required"),
        variantId: yup.string().required("Variant ID is required"),
        quantity: yup
          .number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      })
    )
    .min(1, "At least one product is required"),
});

export default function UserAccount() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profileImage: "",
    shoppingAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isClient, setIsClient] = useState(false);

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: userProfile,
  });
  const returnExchangeForm = useForm({
    resolver: yupResolver(returnExchangeSchema),
    defaultValues: { reason: "", products: [] },
  });

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        const profileResponse = await getUserProfileAPI();
        if (profileResponse.data.success) {
          setUserProfile(profileResponse.data.data);
          profileForm.reset(profileResponse.data.data);
        }

        const ordersResponse = await getUserOrdersAPI();
        if (ordersResponse.success) {
          setOrders(ordersResponse.data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [profileForm]);

  const handleUpdateProfile = async (data: any) => {
    try {
      const response = await updateUserProfileAPI(data);
      if (response.data.success) {
        setUserProfile(response.data);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await cancelOrderAPI(orderId);
      if (response.success) {
        setOrders(
          orders.map((o) =>
            o._id === orderId ? { ...o, orderStatus: "Cancelled" } : o
          )
        );
        toast.success("Order cancelled successfully!");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order");
    }
  };

  const handleReturnOrder = async (data: ReturnExchangeFormData) => {
    if (!selectedOrder) return;
    try {
      const response = await returnOrderAPI(
        selectedOrder._id,
        data.reason,
        data.products
      );
      if (response.success) {
        setOrders(
          orders.map((o) =>
            o._id === selectedOrder._id
              ? { ...o, orderStatus: "Return Requested" }
              : o
          )
        );
        toast.success("Return request submitted!");
        returnExchangeForm.reset();
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Failed to return order:", error);
      toast.error("Failed to submit return request");
    }
  };

  const handleExchangeOrder = async (data: ReturnExchangeFormData) => {
    if (!selectedOrder) return;
    try {
      const response = await exchangeOrderAPI(
        selectedOrder._id,
        data.reason,
        data.products
      );
      if (response.success) {
        setOrders(
          orders.map((o) =>
            o._id === selectedOrder._id
              ? { ...o, orderStatus: "Exchange Requested" }
              : o
          )
        );
        toast.success("Exchange request submitted!");
        returnExchangeForm.reset();
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Failed to exchange order:", error);
      toast.error("Failed to submit exchange request");
    }
  };

  const handleTrackOrder = async (orderId: string) => {
    try {
      const response = await trackOrderAPI(orderId);
      if (response.success) {
        const trackingKey = Object.keys(response.data);
        setTrackingData(response.data[trackingKey[0]]);
        setSelectedOrder(orders.find((o) => o._id === orderId) || null);
        toast.success("Tracking details retrieved!");
      }
    } catch (error) {
      console.error("Failed to track order:", error);
      toast.error("Failed to track order");
    }
  };

  if (!isClient) return null;

  return (
    <div className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10 sm:mb-12 md:mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          My Account
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          Manage your profile and explore your order journey.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 sm:mb-10 bg-gray-100 rounded-lg p-1 shadow-sm">
          <TabsTrigger
            value="account"
            className="py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md rounded-md transition-all duration-200"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md rounded-md transition-all duration-200"
          >
            Order History
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card className="shadow-lg rounded-xl border border-gray-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Profile Details
              </CardTitle>
              <CardDescription className="text-gray-100 text-sm sm:text-base">
                Keep your personal information up to date.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                >
                  <FormField
                    control={profileForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Address Line 1
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Address Line 2
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          State
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      Update Profile
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="history">
          <Card className="shadow-lg rounded-xl border border-gray-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Order History
              </CardTitle>
              <CardDescription className="text-gray-100 text-sm sm:text-base">
                View and manage your past orders.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card
                    key={order._id}
                    className="shadow-md hover:shadow-xl transition-all duration-300 rounded-lg border border-gray-100 overflow-hidden"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">
                            Order ID: {order._id}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Date:{" "}
                            {format(new Date(order.orderDate), "yyyy-MM-dd")}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Status:{" "}
                            <span
                              className={
                                order.orderStatus === "Delivered"
                                  ? "text-green-600 font-medium"
                                  : order.orderStatus === "Cancelled"
                                  ? "text-red-600 font-medium"
                                  : "text-yellow-600 font-medium"
                              }
                            >
                              {order.orderStatus}
                            </span>
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Shipping: {order.shippingStatus}
                          </p>
                        </div>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                      </div>

                      {/* Shipping Address */}
                      <div className="mb-4 sm:mb-6">
                        <p className="text-gray-800 font-medium text-sm sm:text-base">
                          Shipping Address:
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {userProfile.shoppingAddress.addressLine1}
                          {userProfile.shoppingAddress.addressLine2 && ", "}
                          {userProfile.shoppingAddress.addressLine2},{" "}
                          {userProfile.shoppingAddress.city},{" "}
                          {userProfile.shoppingAddress.state},{" "}
                          {userProfile.shoppingAddress.country},{" "}
                          {userProfile.shoppingAddress.postalCode}
                        </p>
                      </div>

                      {/* Payment Details */}
                      <div className="mb-4 sm:mb-6">
                        <p className="text-gray-800 font-medium text-sm sm:text-base">
                          Payment:
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {order.payment_id.paymentMethod} -{" "}
                          <span
                            className={
                              order.payment_id.status === "Paid"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }
                          >
                            {order.payment_id.status}
                          </span>{" "}
                          - ₹
                          {parseFloat(
                            order.payment_id.amount.$numberDecimal
                          ).toFixed(2)}
                        </p>
                      </div>

                      {/* Products */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        {order.products.map((product) => (
                          <div
                            key={product._id}
                            className="flex items-center gap-3 sm:gap-4 border-b py-2 sm:py-3"
                          >
                            <Image
                              src={product.productId.images[0]}
                              alt={product.name}
                              width={60}
                              height={60}
                              className="rounded-md object-cover w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                            />
                            <div className="flex-1">
                              <p className="text-gray-800 font-medium text-sm sm:text-base">
                                {product.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Qty: {product.quantity} | ₹
                                {product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {order.orderStatus === "Pending" && (
                          <Button
                            variant="destructive"
                            onClick={() => handleCancelOrder(order._id)}
                            className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                          >
                            Cancel Order
                          </Button>
                        )}
                        {order.orderStatus === "Delivered" && (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedOrder(order)}
                                  className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 transition-all duration-300 transform hover:scale-105"
                                >
                                  Return Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-xl shadow-lg">
                                <DialogHeader>
                                  <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    Request Return
                                  </DialogTitle>
                                </DialogHeader>
                                <Form {...returnExchangeForm}>
                                  <form
                                    onSubmit={returnExchangeForm.handleSubmit(
                                      handleReturnOrder
                                    )}
                                    className="space-y-4 sm:space-y-6"
                                  >
                                    <FormField
                                      control={returnExchangeForm.control}
                                      name="reason"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm sm:text-base text-gray-700">
                                            Reason
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                                            />
                                          </FormControl>
                                          <FormMessage className="text-xs sm:text-sm" />
                                        </FormItem>
                                      )}
                                    />
                                    {order.products.map((product, index) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center gap-2 sm:gap-3"
                                      >
                                        <FormField
                                          control={returnExchangeForm.control}
                                          name={`products.${index}.productId`}
                                          render={() => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  type="hidden"
                                                  value={product.productId._id}
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={returnExchangeForm.control}
                                          name={`products.${index}.variantId`}
                                          render={() => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  type="hidden"
                                                  value={product.variantId}
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={returnExchangeForm.control}
                                          name={`products.${index}.quantity`}
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormLabel className="text-sm sm:text-base text-gray-700">
                                                {product.name}
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  min={1}
                                                  max={product.quantity}
                                                  {...field}
                                                  className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                                                />
                                              </FormControl>
                                              <FormMessage className="text-xs sm:text-sm" />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <Button
                                      type="submit"
                                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                                    >
                                      Submit Return
                                    </Button>
                                  </form>
                                </Form>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedOrder(order)}
                                  className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 transition-all duration-300 transform hover:scale-105"
                                >
                                  Exchange Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-xl shadow-lg">
                                <DialogHeader>
                                  <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    Request Exchange
                                  </DialogTitle>
                                </DialogHeader>
                                <Form {...returnExchangeForm}>
                                  <form
                                    onSubmit={returnExchangeForm.handleSubmit(
                                      handleExchangeOrder
                                    )}
                                    className="space-y-4 sm:space-y-6"
                                  >
                                    <FormField
                                      control={returnExchangeForm.control}
                                      name="reason"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm sm:text-base text-gray-700">
                                            Reason
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                                            />
                                          </FormControl>
                                          <FormMessage className="text-xs sm:text-sm" />
                                        </FormItem>
                                      )}
                                    />
                                    {order.products.map((product, index) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center gap-2 sm:gap-3"
                                      >
                                        <FormField
                                          control={returnExchangeForm.control}
                                          name={`products.${index}.productId`}
                                          render={() => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  type="hidden"
                                                  value={product.productId._id}
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={returnExchangeForm.control}
                                          name={`products.${index}.variantId`}
                                          render={() => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  type="hidden"
                                                  value={product.variantId}
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={returnExchangeForm.control}
                                          name={`products.${index}.quantity`}
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormLabel className="text-sm sm:text-base text-gray-700">
                                                {product.name}
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  min={1}
                                                  max={product.quantity}
                                                  {...field}
                                                  className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3"
                                                />
                                              </FormControl>
                                              <FormMessage className="text-xs sm:text-sm" />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <Button
                                      type="submit"
                                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                                    >
                                      Submit Exchange
                                    </Button>
                                  </form>
                                </Form>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        <Button
                          variant="secondary"
                          onClick={() => handleTrackOrder(order._id)}
                          className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                        >
                          Track Order
                        </Button>
                      </div>

                      {/* Tracking Details */}
                      {trackingData && selectedOrder?._id === order._id && (
                        <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                            Tracking Details
                          </p>
                          {trackingData.tracking_data.error ? (
                            <p className="text-sm sm:text-base text-red-600">
                              {trackingData.tracking_data.error}
                            </p>
                          ) : (
                            <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">
                                    AWB Code:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {trackingData.tracking_data
                                      .shipment_track[0]?.awb_code ||
                                      "Not Available"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">
                                    Courier:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {trackingData.tracking_data
                                      .shipment_track[0]?.courier_name ||
                                      "Not Assigned"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">
                                    Current Status:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {trackingData.tracking_data
                                      .shipment_track[0]?.current_status ||
                                      "Pending"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">
                                    Estimated Delivery:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {trackingData.tracking_data
                                      .shipment_track[0]?.edd ||
                                      "Not Available"}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                                Tracking Updates:
                              </p>
                              {trackingData.tracking_data
                                .shipment_track_activities &&
                              trackingData.tracking_data
                                .shipment_track_activities.length > 0 ? (
                                <ul className="space-y-2 sm:space-y-3">
                                  {trackingData.tracking_data.shipment_track_activities.map(
                                    (activity, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2 sm:gap-3"
                                      >
                                        <span className="w-2 h-2 bg-green-600 rounded-full mt-1.5 sm:mt-2"></span>
                                        <div>
                                          <p className="text-sm font-medium text-gray-800">
                                            {activity.activity}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {activity.date} -{" "}
                                            {activity.location}
                                          </p>
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No tracking updates available yet.
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg">
                  No orders found. Start shopping to see your history!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
