"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input"; // Added react-phone-number-input
import "react-phone-number-input/style.css"; // Import default styles
import { toast } from "react-toastify";
import * as yup from "yup";

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

const profileSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+\d{1,15}$/,
      "Phone number must be a valid international format (e.g., +1234567890)"
    ),
  shoppingAddress: yup.object({
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    postalCode: yup.string().required("Postal Code is required"),
  }),
});

// Skeleton Loader Component
const ProfileSkeleton = () => (
  <Card className="shadow-lg rounded-xl border border-gray-100 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-[#7A6E18] to-[#7A6E18] text-white rounded-t-xl p-4 sm:p-6">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2 mt-2" />
    </CardHeader>
    <CardContent className="p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="md:col-span-2">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ProfileManagement() {
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
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: userProfile,
  });

  useEffect(() => {
    setIsClient(true);

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profileResponse = await getUserProfileAPI();
        if (profileResponse?.data?.success) {
          setUserProfile(profileResponse.data.data);
          profileForm.reset(profileResponse.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profileForm]);

  const handleUpdateProfile = async (data: UserProfile | any) => {
    try {
      setIsActionLoading(true);
      const response = await updateUserProfileAPI(data);
      if (response?.data?.success) {
        setUserProfile(response.data.data);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (!isClient) return null;

  return isLoading ? (
    <ProfileSkeleton />
  ) : (
    <Card className="shadow-lg rounded-xl border border-gray-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#7A6E18] to-[#7A6E18] text-white rounded-t-xl p-4 sm:p-6">
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
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
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry="US"
                      placeholder="Enter phone number"
                      className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 disabled:opacity-50"
                      disabled={isActionLoading}
                      onChange={(value) => field.onChange(value || "")}
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
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
                      disabled={isActionLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={isActionLoading}
                className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isActionLoading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}