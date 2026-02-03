"use client";

import {
  cancelOrderAPI,
  exchangeOrderAPI,
  getUserOrdersAPI,
  returnOrderAPI,
  trackOrderAPI,
} from "@/apis/orderAPIs";
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
import { Skeleton } from "@/components/ui/skeleton"; // Added shadcn skeleton
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

// Interfaces remain the same as in your original code
interface Product {
  productId: {
    _id: string;
    name: string;
    images: { url: string; sequence: number; _id: string }[];
  };
  variantId: string;
  quantity: number;
  price: number;
  name: string;
  skuParameters: { weight: string };
  _id: string;
}

interface Payment {
  _id: string;
  userId: string;
  orderId: string;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  refundDetails: { refundId: string | null };
}

interface Order {
  _id: string;
  user_id: string;
  userDetails: {
    name: string;
    phone: string;
    email: string;
  };
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  shippingStatus: string;
  products: Product[];
  shippingAddressId: string | null;
  paymentMethod: number;
  estimatedDeliveryDays: number;
  courierService: string;
  payment_id?: Payment;
  shipRocketOrderId?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ReturnExchangeFormData {
  reason: string;
  products?: { productId: string; variantId: string; quantity: number }[];
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

interface UserProfile {
  shoppingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

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

interface OrderHistoryProps {
  userProfile: UserProfile;
}

// Skeleton Loader Component
const OrderSkeleton = () => (
  <Card className="shadow-md rounded-lg border border-gray-100">
    <CardContent className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex items-center gap-3 sm:gap-4 border-b py-2 sm:py-3">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>
    </CardContent>
  </Card>
);

export default function OrderHistory({ userProfile }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [isActionLoading, setIsActionLoading] = useState(false); // Added action loading state

  const returnExchangeForm = useForm<ReturnExchangeFormData>({
    resolver: yupResolver(returnExchangeSchema),
    defaultValues: { reason: "", products: [] },
  });

  useEffect(() => {
    setIsClient(true);

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const ordersResponse = await getUserOrdersAPI();
        if (ordersResponse.success) {
          setOrders(ordersResponse.data?.orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      setIsActionLoading(true);
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
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReturnOrder = async (data: ReturnExchangeFormData) => {
    if (!selectedOrder) return;
    try {
      setIsActionLoading(true);
      const response = await returnOrderAPI(
        selectedOrder._id,
        data.reason,
        data.products || []
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
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleExchangeOrder = async (data: ReturnExchangeFormData) => {
    if (!selectedOrder) return;
    try {
      setIsActionLoading(true);
      const response = await exchangeOrderAPI(
        selectedOrder._id,
        data.reason,
        data.products || []
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
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleTrackOrder = async (orderId: string) => {
    try {
      setIsActionLoading(true);
      const response = await trackOrderAPI(orderId);
      if (response.success) {
        setTrackingData(response.data);
        setSelectedOrder(orders.find((o) => o._id === orderId) || null);
        toast.success("Tracking details retrieved!");
      } else {
        // Show toast if API response indicates failure
        toast.info("Tracking data is not available.");
      }
    } catch (error) {
      console.error("Failed to track order:", error);
      // Show toast for any error during API call
      toast.info("Tracking data is not available.");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <Card className="shadow-lg rounded-xl border border-gray-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#556b2f] to-[#2f420d] text-white rounded-t-xl p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Order History
        </CardTitle>
        <CardDescription className="text-gray-100 text-sm sm:text-base">
          View and manage your past orders.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <OrderSkeleton key={index} />
            ))}
          </div>
        ) : orders?.length > 0 ? (
          orders.map((order) => {
            const estimatedDeliveryDate = format(
              addDays(new Date(order.orderDate), order.estimatedDeliveryDays),
              "yyyy-MM-dd"
            );

            return (
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
                        Date: {format(new Date(order.orderDate), "yyyy-MM-dd")}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Status:{" "}
                        <span
                          className={
                            order.orderStatus === "Delivered"
                              ? "text-[#7A6E18] font-medium"
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
                      <p className="text-xs sm:text-sm text-gray-600">
                        Estimated Delivery: {estimatedDeliveryDate}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Courier: {order.courierService}
                      </p>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      ₹{order.totalAmount?.toFixed(2)}
                    </p>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                      Customer Details:
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Name: {order.userDetails?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Email: {order.userDetails?.email}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Phone: {order.userDetails?.phone}
                    </p>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                      Shipping Address:
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {order.shippingAddressId
                        ? `${userProfile?.shoppingAddress?.addressLine1}${
                            userProfile?.shoppingAddress?.addressLine2
                              ? ", " + userProfile.shoppingAddress.addressLine2
                              : ""
                          }, ${userProfile?.shoppingAddress?.city}, ${
                            userProfile?.shoppingAddress?.state
                          }, ${userProfile?.shoppingAddress?.country}, ${
                            userProfile?.shoppingAddress?.postalCode
                          }`
                        : "Not provided"}
                    </p>
                  </div>

                  {order.payment_id && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-gray-800 font-medium text-sm sm:text-base">
                        Payment:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {order.payment_id?.paymentMethod} -{" "}
                        <span
                          className={
                            order.payment_id?.status === "Completed"
                              ? "text-[#7A6E18]"
                              : "text-yellow-600"
                          }
                        >
                          {order.payment_id?.status}
                        </span>{" "}
                        - ₹{order.payment_id?.amount?.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    {order.products?.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-3 sm:gap-4 border-b py-2 sm:py-3"
                      >
                        <Image
                          src={
                            product?.productId?.images?.find(
                              (img) => img.sequence === 0
                            )?.url || "/placeholder-image.jpg"
                          }
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
                            {product.price?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {(order.orderStatus === "Pending" ||
                      order.orderStatus === "Confirmed") && (
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={isActionLoading}
                        className="px-3 py-2 sm:pl-4 sm:pr-4 sm:pb-2 sm:pt-2 text-sm sm:text-base hover:bg-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                      >
                        {isActionLoading ? "Cancelling..." : "Cancel Order"}
                      </Button>
                    )}
                    {order.orderStatus === "Delivered" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                              disabled={isActionLoading}
                              className="px-3 py-2 sm:pl-4 sm:pr-4 sm:pb-2 sm:pt-2 text-sm sm:text-base border-green-600 text-[#7A6E18] hover:bg-[#7A6E18]/10 hover:text-[#7A6E18] transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
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
                                          disabled={isActionLoading}
                                        />
                                      </FormControl>
                                      <FormMessage className="text-xs sm:text-sm" />
                                    </FormItem>
                                  )}
                                />
                                {order.products?.map((product, index) => (
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
                                              value={product.productId?._id}
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
                                              disabled={isActionLoading}
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
                                  disabled={isActionLoading}
                                  className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                                >
                                  {isActionLoading
                                    ? "Submitting..."
                                    : "Submit Return"}
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
                              disabled={isActionLoading}
                              className="px-3 py-2 sm:pl-4 sm:pr-4 sm:pb-2 sm:pt-2 text-sm sm:text-base border-green-600 text-[#7A6E18] hover:bg-[#7A6E18]/10 hover:text-[#7A6E18] transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
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
                                          disabled={isActionLoading}
                                        />
                                      </FormControl>
                                      <FormMessage className="text-xs sm:text-sm" />
                                    </FormItem>
                                  )}
                                />
                                {order.products?.map((product, index) => (
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
                                              value={product.productId?._id}
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
                                              disabled={isActionLoading}
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
                                  disabled={isActionLoading}
                                  className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                                >
                                  {isActionLoading
                                    ? "Submitting..."
                                    : "Submit Exchange"}
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
                      disabled={isActionLoading}
                      className="px-3 py-2 sm:pl-4 sm:pr-4 sm:pb-2 sm:pt-2 text-sm sm:text-base bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {isActionLoading ? "Tracking..." : "Track Order"}
                    </Button>
                  </div>

                  {trackingData && selectedOrder?._id === order._id && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                        Tracking Details
                      </p>
                      {trackingData.tracking_data?.error ? (
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
                                {trackingData.tracking_data?.shipment_track?.[0]
                                  ?.awb_code || "Not Available"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Courier:
                              </p>
                              <p className="text-sm text-gray-600">
                                {trackingData.tracking_data?.shipment_track?.[0]
                                  ?.courier_name || "Not Assigned"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Current Status:
                              </p>
                              <p className="text-sm text-gray-600">
                                {trackingData.tracking_data?.shipment_track?.[0]
                                  ?.current_status || "Pending"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Estimated Delivery:
                              </p>
                              <p className="text-sm text-gray-600">
                                {trackingData.tracking_data?.shipment_track?.[0]
                                  ?.edd || estimatedDeliveryDate}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                            Tracking Updates:
                          </p>
                          {trackingData.tracking_data?.shipment_track_activities &&
                          trackingData.tracking_data.shipment_track_activities
                            .length > 0 ? (
                            <ul className="space-y-2 sm:space-y-3">
                              {trackingData.tracking_data?.shipment_track_activities?.map(
                                (activity, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 sm:gap-3"
                                  >
                                    <span className="w-2 h-2 bg-[#7A6E18] rounded-full mt-1.5 sm:mt-2"></span>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {activity.activity}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {activity.date} - {activity.location}
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
            );
          })
        ) : (
          <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg">
            No orders found. Start shopping to see your history!
          </p>
        )}
      </CardContent>
    </Card>
  );
}