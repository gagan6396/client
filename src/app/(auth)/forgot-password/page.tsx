"use client";

import { requestPasswordResetAPI } from "@/apis/AuthAPIs";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

// Define the schema for the form
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type FormData = z.infer<typeof schema>;

const RequestPasswordResetPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await requestPasswordResetAPI({ email: data.email });
      if (response.data.success) {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg px-1">
        <CardHeader className="bg-gradient-to-r from-[#2B0504] to-[#3C0606] text-white rounded-t-lg">
          <CardTitle className="text-2xl font-semibold">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-gray-200">
            Enter your email to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-gray-800 text-lg font-medium">
                Check Your Email
              </p>
              <p className="text-gray-600 mt-2">
                We’ve sent a password reset link to {form.getValues("email")}.
                Please check your inbox (and spam folder).
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 bg-[#2B0504] text-white hover:bg-[#3C0606] transition"
              >
                Request Another Link
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
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
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestPasswordResetPage;
