"use client";

import { getOrderByIdAPI } from "@/apis/orderAPIs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Updated Order interface based on the new API response
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
  products: {
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
  }[];
  shippingAddressId: string | null;
  paymentMethod: number;
  estimatedDeliveryDays: number;
  courierService: string;
  payment_id?: {
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
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderConfirmationPage = ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchOrderDetails = async () => {
      try {
        const orderId = (await params).orderId;
        const response = await getOrderByIdAPI(orderId);
        if (response.success) {
          setOrder(response.data);
        } else {
          console.error("API response unsuccessful:", response.message);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params]);

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2B0504] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">Order Not Found</p>
          <p className="text-gray-600 mt-2">
            We couldn’t find the order you’re looking for.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Calculate estimated delivery date
  const estimatedDeliveryDate = moment(order.orderDate)
    .add(order.estimatedDeliveryDays, "days")
    .format("DD-MM-YYYY");

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Thank you for your purchase, {order.userDetails.name}!
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary Card */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="bg-[#2B0504] text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-700 font-medium">
                  Order ID: <span className="font-normal">{order._id}</span>
                </p>
                <p className="text-gray-700 font-medium">
                  Order Date:{" "}
                  <span className="font-normal">
                    {moment(order.orderDate).format("DD-MM-YYYY")}
                  </span>
                </p>
                <p className="text-gray-700 font-medium">
                  Status:{" "}
                  <span
                    className={`font-normal ${
                      order.orderStatus === "Confirmed"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>
                <p className="text-gray-700 font-medium">
                  Shipping Status:{" "}
                  <span className="font-normal">{order.shippingStatus}</span>
                </p>
                <p className="text-gray-700 font-medium">
                  Estimated Delivery:{" "}
                  <span className="font-normal">{estimatedDeliveryDate}</span>
                </p>
                <p className="text-gray-700 font-medium">
                  Courier Service:{" "}
                  <span className="font-normal">{order.courierService}</span>
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>

            {/* User Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Customer Details
              </h3>
              <p className="text-gray-600">
                Name: {order.userDetails.name}
              </p>
              <p className="text-gray-600">
                Email: {order.userDetails.email}
              </p>
              <p className="text-gray-600">
                Phone: {order.userDetails.phone}
              </p>
            </div>

            {/* Products List */}
            {order.products && order.products.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Items Ordered
                </h3>
                <ul className="space-y-4">
                  {order.products.map((product, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                    >
                      {product.productId.images &&
                        product.productId.images.length > 0 && (
                          <Image
                            src={
                              product.productId.images.find(
                                (img) => img.sequence === 0
                              )?.url || ""
                            }
                            alt={product.productId.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                        )}
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">
                          {product.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Quantity: {product.quantity} | Unit Price: ₹
                          {product.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-gray-900 font-semibold">
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions and Info Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-100 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {order.payment_id && (
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Payment Details
                </h3>
                <p className="text-gray-600">
                  Method: {order.payment_id.paymentMethod}
                </p>
                <p className="text-gray-600">
                  Status: {order.payment_id.status}
                </p>
                <p className="text-gray-600">
                  Amount: ₹{order.payment_id.amount.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Transaction ID: {order.payment_id.transactionId}
                </p>
              </div>
            )}
            <div>
              <Button
                onClick={() => router.push("/user-account")}
                variant="outline"
                className="w-full border-[#2B0504] text-[#2B0504] hover:bg-[#2B0504] hover:text-white transition"
              >
                View Order History
              </Button>
              <Button
                onClick={() => router.push("/products")}
                className="mt-4 w-full bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;