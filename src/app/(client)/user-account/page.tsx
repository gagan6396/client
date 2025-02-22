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

// Interfaces based on API responses
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Product {
  _id: string;
  name: string;
  price: { $numberDecimal: string };
  images: string[];
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
  products: { productId: Product; quantity: number; _id: string }[];
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
  products: { productId: string; quantity: number }[];
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

  const handleReturnOrder = async (data: any) => {
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

  const handleExchangeOrder = async (data: any) => {
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
      console.log("response.data.success", response.success);

      if (response.success) {
        const trackingKey = Object.keys(response.data);
        console.log("response.data.data", trackingKey);

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
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Account
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your profile and track your orders.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 rounded-lg p-1">
          <TabsTrigger
            value="account"
            className="py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md transition-all"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md transition-all"
          >
            Order History
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#2B0504] to-[#3C0606] text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">
                Profile Details
              </CardTitle>
              <CardDescription className="text-gray-200">
                Update your personal information below.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={profileForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="shoppingAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-[#2B0504]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
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
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#2B0504] to-[#3C0606] text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">
                Order History
              </CardTitle>
              <CardDescription className="text-gray-200">
                View and manage your past orders.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card
                    key={order._id}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                          <p className="text-gray-800 font-semibold">
                            Order ID: {order._id}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date:{" "}
                            {format(new Date(order.orderDate), "yyyy-MM-dd")}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status:{" "}
                            <span
                              className={
                                order.orderStatus === "Delivered"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }
                            >
                              {order.orderStatus}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Shipping Status: {order.shippingStatus}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          ₹{order.totalAmount}
                        </p>
                      </div>

                      {/* Shipping Address */}
                      <div className="mb-4">
                        <p className="text-gray-800 font-medium">
                          Shipping Address:
                        </p>
                        <p className="text-sm text-gray-600">
                          {userProfile.shoppingAddress.addressLine1},{" "}
                          {userProfile.shoppingAddress.addressLine2},{" "}
                          {userProfile.shoppingAddress.city},{" "}
                          {userProfile.shoppingAddress.state},{" "}
                          {userProfile.shoppingAddress.country},{" "}
                          {userProfile.shoppingAddress.postalCode}
                        </p>
                      </div>

                      {/* Payment Details */}
                      <div className="mb-4">
                        <p className="text-gray-800 font-medium">Payment:</p>
                        <p className="text-sm text-gray-600">
                          {order.payment_id.paymentMethod} -{" "}
                          {order.payment_id.status} - ₹
                          {order.payment_id.amount.$numberDecimal}
                        </p>
                      </div>

                      {/* Products */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {order.products.map((product) => (
                          <div
                            key={product._id}
                            className="flex items-center gap-4 border-b py-2"
                          >
                            <Image
                              src={product.productId.images[0]}
                              alt={product.productId.name}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <p className="text-gray-800 font-medium">
                                {product.productId.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                Qty: {product.quantity} | ₹
                                {product.productId.price.$numberDecimal}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {order.orderStatus === "Pending" && (
                          <Button
                            variant="destructive"
                            onClick={() => handleCancelOrder(order._id)}
                            className="hover:bg-red-700 transition"
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
                                  className="border-[#2B0504] text-[#2B0504] hover:bg-[#2B0504] hover:text-white transition"
                                >
                                  Return Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Request Return</DialogTitle>
                                </DialogHeader>
                                <Form {...returnExchangeForm}>
                                  <form
                                    onSubmit={returnExchangeForm.handleSubmit(
                                      handleReturnOrder
                                    )}
                                    className="space-y-4"
                                  >
                                    <FormField
                                      control={returnExchangeForm.control}
                                      name="reason"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Reason</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              className="border-gray-300 focus:ring-[#2B0504]"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    {order.products.map((product, index) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center gap-2"
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
                                          name={`products.${index}.quantity`}
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormLabel>
                                                {product.productId.name}
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  min={1}
                                                  max={product.quantity}
                                                  {...field}
                                                  className="border-gray-300 focus:ring-[#2B0504]"
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <Button
                                      type="submit"
                                      className="w-full bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
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
                                  className="border-[#2B0504] text-[#2B0504] hover:bg-[#2B0504] hover:text-white transition"
                                >
                                  Exchange Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Request Exchange</DialogTitle>
                                </DialogHeader>
                                <Form {...returnExchangeForm}>
                                  <form
                                    onSubmit={returnExchangeForm.handleSubmit(
                                      handleExchangeOrder
                                    )}
                                    className="space-y-4"
                                  >
                                    <FormField
                                      control={returnExchangeForm.control}
                                      name="reason"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Reason</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              className="border-gray-300 focus:ring-[#2B0504]"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    {order.products.map((product, index) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center gap-2"
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
                                          name={`products.${index}.quantity`}
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormLabel>
                                                {product.productId.name}
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  min={1}
                                                  max={product.quantity}
                                                  {...field}
                                                  className="border-gray-300 focus:ring-[#2B0504]"
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <Button
                                      type="submit"
                                      className="w-full bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
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
                          className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                        >
                          Track Order
                        </Button>
                      </div>

                      {/* Tracking Details */}
                      {trackingData && selectedOrder?._id === order._id && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-md border">
                          <p className="text-lg font-semibold text-gray-800 mb-4">
                            Tracking Details
                          </p>
                          {trackingData.tracking_data.error ? (
                            <p className="text-sm text-red-600">
                              {trackingData.tracking_data.error}
                            </p>
                          ) : (
                            <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Tracking Updates:
                              </p>
                              {trackingData.tracking_data
                                .shipment_track_activities &&
                              trackingData.tracking_data
                                .shipment_track_activities.length > 0 ? (
                                <ul className="space-y-3">
                                  {trackingData.tracking_data.shipment_track_activities.map(
                                    (activity, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-3"
                                      >
                                        <span className="w-2 h-2 bg-[#2B0504] rounded-full mt-2"></span>
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
                <p className="text-center text-gray-600">No orders found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
