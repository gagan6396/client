"use client";
import { getOrderByIdAPI } from "@/apis/orderAPIs"; // API to fetch order details
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderConfirmationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = (await params).id;
        const response = await getOrderByIdAPI(orderId);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center mt-10">Order not found.</div>;
  }

  return (
    <div className="container mx-auto py-7 p-3">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Order Confirmation
      </h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="text-gray-600">Order ID: {order._id}</p>
        <p className="text-gray-600">Status: {order.orderStatus}</p>
        <p className="text-gray-600">
          Total Amount: ₹{order.totalAmount.toFixed(2)}
        </p>
        <Button
          onClick={() => router.push("/")}
          className="mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
