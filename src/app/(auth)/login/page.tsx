"use client";

import { LoginAPI } from "@/apis/AuthAPIs";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const response = await LoginAPI({
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", response.data.data.user.token);
        }
        toast.success("Login successful!", { position: "top-center" });
        router.replace("/");
      } else {
        toast.error(response.data.message || "Login failed", {
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-100 text-sm sm:text-base text-center">
            Sign in to explore your organic journey with Gauraaj.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
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
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <ClipLoader size={20} color="#ffffff" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-gray-600">
            <Link
              href="/forgot-password"
              className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-3 sm:mt-4 text-center text-sm sm:text-base text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;