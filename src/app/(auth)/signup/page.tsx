"use client";

import { RegisterAPI } from "@/apis/AuthAPIs";
import bgImage from "@/public/l1.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Import Loader2 for the spinner
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

// Define Form Values Type
interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^\+\d{1,3}\d{9,14}$/, "Invalid phone number")
      .optional(),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const fullName = values.name.split(" ");
      const firstName = fullName[0] || "";
      const lastName = fullName.slice(1).join(" ") || "";

      const response = await RegisterAPI({
        first_name: firstName,
        last_name: lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.data.user.token);
      }
      toast.success("Registration successful!", { position: "top-center" });
      router.push("/");
    } catch (error: any) {
      setError(error.response.data.message || "Something went wrong!");
      toast.error(
        error.response.data.message || "Registration failed. Please try again.",
        {
          position: "top-center",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row rounded-2xl shadow-lg max-w-5xl w-full bg-white">
        {/* Form Container */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-gray-600">Create a new account</p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, setFieldValue, values }) => (
              <Form className="flex flex-col gap-4 mt-6">
                {/* Name Field */}
                <div>
                  <Field
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74]"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Field
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74]"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={values.phone}
                    onChange={(value) => setFieldValue("phone", value)}
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74]"
                    placeholder="Phone (Optional)"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Field
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74]"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff color="gray" size={20} />
                    ) : (
                      <Eye color="gray" size={20} />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <Field
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74]"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-3 hover:scale-105 duration-300 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={!isValid || !dirty || loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : null}
                  {loading ? "Registering..." : "Register"}
                </button>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}

                {/* Login Link */}
                <div className="mt-4 text-sm text-center text-[#002D74]">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold hover:underline">
                    Login here
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 hidden md:block">
          <Image
            className="rounded-r-2xl h-full object-cover"
            src={bgImage}
            alt="Register"
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage;
