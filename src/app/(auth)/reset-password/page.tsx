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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

// Define the schema for the form
const schema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Invalid or missing token");
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
        toast.success("Password reset successfully!");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#2B0504] to-[#3C0606] text-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">
              Invalid Link
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-gray-800 text-lg font-medium">
              Invalid or Missing Token
            </p>
            <p className="text-gray-600 mt-2">
              Please request a new password reset link.
            </p>
            <Button
              onClick={() => router.push("/forgot-password")}
              className="mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
            >
              Request New Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#2B0504] to-[#3C0606] text-white rounded-t-lg">
          <CardTitle className="text-2xl font-semibold">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-200">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isReset ? (
            <div className="text-center">
              <p className="text-gray-800 text-lg font-medium">
                Password Reset Successful
              </p>
              <p className="text-gray-600 mt-2">
                Your password has been updated. You can now log in with your new
                password.
              </p>
              <Button
                onClick={() => router.push("/login")}
                className="mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter new password"
                          className="border-gray-300 focus:ring-[#2B0504]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm new password"
                          className="border-gray-300 focus:ring-[#2B0504]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
