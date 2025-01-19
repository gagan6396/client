"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product1Image from "@/public/product-1.png";
import Product2Image from "@/public/product-2.png";
import Product3Image from "@/public/product-3.png";
import Image from "next/image";
const orders = [
  {
    id: "ORD12345",
    date: "2025-01-10",
    total: "₹1,250.00",
    items: [
      {
        title: "Mixed Sweets",
        imageSrc: Product1Image,
        price: "₹118.75",
        quantity: 2,
      },
      {
        title: "Gir Cow Pure Vedic Ghee 500 ml",
        imageSrc: Product2Image,
        price: "₹118.75",
        quantity: 1,
      },
    ],
    status: "Delivered",
  },
  {
    id: "ORD12346",
    date: "2025-01-12",
    total: "₹850.00",
    items: [
      {
        title: "Rotana 500 gms",
        imageSrc: Product3Image,
        price: "₹425.00",
        quantity: 2,
      },
    ],
    status: "Pending",
  },
];

export default function UserAccount() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <Tabs defaultValue="account" className="w-full">
        {/* Tabs List */}
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                View and update your personal information here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Name:</p>
                <p>John Doe</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>johndoe@example.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>+91 9876543210</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p>123 Street, City, Country</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                Track your past orders and their statuses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-xl p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-500">
                        Date: {order.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {order.status}
                      </p>
                    </div>
                    <p className="font-bold text-lg">Total: {order.total}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 border rounded-md p-3"
                      >
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            Price: {item.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
