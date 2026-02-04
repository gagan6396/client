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
import ClipLoader from "react-spinners/ClipLoader";
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
        toast.success("Password reset link sent to your email!", {
          position: "top-center",
        });
      } else {
        toast.error(response.data.message || "Failed to send reset link", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mar items-center justify-center min-h-screen bg-gradient-to-b bg-[#7A6E18]/20 to-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0">
        <CardHeader className="bg-gradient-to-r from-[#7A6E18] to-[#7A6E18] text-white rounded-t-xl p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-gray-100 text-sm sm:text-base text-center">
            Enter your email to receive a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center space-y-4 sm:space-y-6">
              <p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold">
                Check Your Email
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                We’ve sent a password reset link to{" "}
                <span className="font-medium text-[#7A6E18]">
                  {form.getValues("email")}
                </span>
                . Please check your inbox (and spam folder) to proceed.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 sm:mt-4 w-full sm:w-auto bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Request Another Link
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                        />
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
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
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