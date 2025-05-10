"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import OrderHistory from "./OrderHistory";
import ProfileManagement from "./ProfileManagement";

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

  return (
    <div className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-screen">
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
            className="py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#7A6E18] data-[state=active]:shadow-md rounded-md transition-all duration-200"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#7A6E18] data-[state=active]:shadow-md rounded-md transition-all duration-200"
          >
            Order History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <ProfileManagement />
        </TabsContent>
        <TabsContent value="history">
          <OrderHistory userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}