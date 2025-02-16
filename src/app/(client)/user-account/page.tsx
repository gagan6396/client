"use client";

import { getUserProfileAPI, updateUserProfileAPI } from "@/apis/userProfile";
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
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfileAPI();
        if (response.data.success) {
          setUserProfile(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await updateUserProfileAPI(userProfile);
      if (response.data.success) {
        setUserProfile(response.data.data);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleAddressChange = (field: any, value: any) => {
    setUserProfile({
      ...userProfile,
      shoppingAddress: {
        ...userProfile.shoppingAddress,
        [field]: value,
      },
    });
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
              <div>
                <p className="font-semibold">Name:</p>
                <input
                  type="text"
                  value={`${userProfile.first_name} ${userProfile.last_name}`}
                  onChange={(e) => {
                    const [first_name, last_name] = e.target.value.split(" ");
                    setUserProfile({ ...userProfile, first_name, last_name });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <input
                  type="text"
                  value={userProfile.phone}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">Address Line 1:</p>
                <input
                  type="text"
                  value={userProfile.shoppingAddress.addressLine1}
                  onChange={(e) =>
                    handleAddressChange("addressLine1", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">Address Line 2:</p>
                <input
                  type="text"
                  value={userProfile.shoppingAddress.addressLine2}
                  onChange={(e) =>
                    handleAddressChange("addressLine2", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">City:</p>
                <input
                  type="text"
                  value={userProfile.shoppingAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">State:</p>
                <input
                  type="text"
                  value={userProfile.shoppingAddress.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">Country:</p>
                <input
                  type="text"
                  value={userProfile.shoppingAddress.country}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <p className="font-semibold">Postal Code:</p>
                <input
                  type="text"
                  value={userProfile.shoppingAddress.postalCode}
                  onChange={(e) =>
                    handleAddressChange("postalCode", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Profile
              </button>
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
