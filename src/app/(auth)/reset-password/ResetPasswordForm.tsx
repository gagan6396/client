// ResetPasswordForm.tsx
"use client";

import { resetPasswordAPI } from "@/apis/AuthAPIs";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import * as z from "zod";

// Define the schema for the form
const schema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Invalid or missing token", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const response = await resetPasswordAPI({
        token,
        newPassword: data.newPassword,
      });
      if (response.data.success) {
        setIsReset(true);
        toast.success("Password reset successfully!", {
          position: "top-center",
        });
      } else {
        toast.error(response.data.message || "Failed to reset password", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0">
        <CardHeader className="bg-gradient-to-r from-[#7A6E18] to-[#7A6E18] text-white rounded-t-xl p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Invalid Link
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
          <p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold">
            Invalid or Missing Token
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            It seems the reset link is invalid or expired. Please request a new
            one.
          </p>
          <Button
            onClick={() => router.push("/forgot-password")}
            className="w-full sm:w-auto bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Request New Link
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0">
      <CardHeader className="bg-gradient-to-r from-[#7A6E18] to-[#7A6E18] text-white rounded-t-xl p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center">
          Set New Password
        </CardTitle>
        <CardDescription className="text-gray-100 text-sm sm:text-base text-center">
          Create a strong new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        {isReset ? (
          <div className="text-center space-y-4 sm:space-y-6">
            <p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold">
              Password Reset Successful
            </p>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Your password has been updated successfully. You can now log in
              with your new credentials.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full sm:w-auto bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-700">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="sm:size-4" />
                          ) : (
                            <Eye size={20} className="sm:size-4" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="sm:size-4" />
                          ) : (
                            <Eye size={20} className="sm:size-4" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <ClipLoader size={20} color="#ffffff" />
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
