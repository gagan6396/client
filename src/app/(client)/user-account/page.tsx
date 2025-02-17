"use client";

import { getUserOrdersAPI } from "@/apis/orderAPIs";
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
import { format } from "date-fns"; // Add date-fns for consistent date formatting
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

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
  description: string;
  price: { $numberDecimal: string };
  images: string[];
}

interface ShippingAddress {
  shoppingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

interface Payment {
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
  products: {
    productId: Product;
    quantity: number;
    skuParameters: Record<string, any>;
    _id: string;
  }[];
  shippingAddressId: ShippingAddress;
  payment_id: Payment;
}

const schema = yup.object({
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

export default function UserAccount() {
  const [userProfile, setUserProfile] = useState({
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

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: userProfile,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await getUserProfileAPI();
        if (profileResponse.data.success) {
          setUserProfile(profileResponse.data.data);
          form.reset(profileResponse.data.data);
        }

        const ordersResponse = await getUserOrdersAPI();
        if (ordersResponse.data.success) {
          setOrders(ordersResponse.data.data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [form]);

  const handleUpdateProfile = async (data: any) => {
    try {
      const response = await updateUserProfileAPI(data);
      if (response.data.success) {
        setUserProfile(response.data.data);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdateProfile)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shoppingAddress.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shoppingAddress.addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shoppingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shoppingAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shoppingAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shoppingAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Profile</Button>
                </form>
              </Form>
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
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-md rounded-xl p-4 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Order ID: {order._id}</p>
                        <p className="text-sm text-gray-500">
                          Date:{" "}
                          {format(new Date(order.orderDate), "yyyy-MM-dd")}
                        </p>
                        <p className="text-sm text-gray-500">
                          Status: {order.orderStatus}
                        </p>
                      </div>
                      <p className="font-bold text-lg">
                        Total: ₹{order.totalAmount}
                      </p>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <p className="font-semibold">Shipping Address:</p>
                      <p className="text-sm text-gray-500">
                        {order.shippingAddressId.shoppingAddress.addressLine1},{" "}
                        {order.shippingAddressId.shoppingAddress.addressLine2},{" "}
                        {order.shippingAddressId.shoppingAddress.city},{" "}
                        {order.shippingAddressId.shoppingAddress.state},{" "}
                        {order.shippingAddressId.shoppingAddress.country},{" "}
                        {order.shippingAddressId.shoppingAddress.postalCode}
                      </p>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <p className="font-semibold">Payment Details:</p>
                      <p className="text-sm text-gray-500">
                        Method: {order.payment_id.paymentMethod}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {order.payment_id.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        Amount: ₹{order.payment_id.amount.$numberDecimal}
                      </p>
                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {order.products.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center gap-4 border rounded-md p-3"
                        >
                          <Image
                            src={product.productId.images[0]}
                            alt={product.productId.name}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                          <div>
                            <p className="font-semibold">
                              {product.productId.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Price: ₹{product.productId.price.$numberDecimal}
                            </p>
                            <p className="text-sm text-gray-500">
                              Quantity: {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
