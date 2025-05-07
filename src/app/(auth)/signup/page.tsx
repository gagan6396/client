"use client";

import { RegisterAPI } from "@/apis/AuthAPIs";
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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  first_name: Yup.string()
    .min(1, "First name must be at least 1 character")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  last_name: Yup.string()
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+\d{1,3}\d{9,14}$/, "Invalid phone number")
    .optional(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const response = await RegisterAPI({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values?.phone || "",
        password: values.password,
      });
      if (response.data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", response.data.data.user.token);
        }
        toast.success("Registration successful!", { position: "top-center" });
        router.push("/");
      } else {
        toast.error(response.data.message || "Registration failed", {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b bg-[#7A6E18]/20 to-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0 my-2">
        <CardHeader className="bg-gradient-to-r from-[#7A6E18] to-[#7A6E18] text-white rounded-t-xl p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-100 text-sm sm:text-base text-center">
            Join Gauraaj and start your organic journey today!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your first name"
                          className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your last name"
                          className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-700">
                      Phone (Optional)
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={field.value}
                        onChange={field.onChange}
                        className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 w-full transition-all duration-300"
                        placeholder="Enter your phone number"
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
                          placeholder="Confirm your password"
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
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#7A6E18] font-semibold hover:text-[#7A6E18] hover:underline transition-colors duration-200"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;