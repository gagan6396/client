"use client";

import { RegisterAPI } from "@/apis/AuthAPIs";
import bgImage from "@/public/l1.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
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
    <section className="min-h-screen flex items-center justify-center ">
      <div className="flex rounded-2xl shadow-lg max-w-5xl p-5 items-center bg-white">
        {/* Form Container */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-gray-600">Create a new account</p>

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
            {({ isValid, dirty }) => (
              <Form className="flex flex-col gap-4 mt-4">
                {/* Name Field */}
                <Field
                  className="p-2 rounded-xl border w-full"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />

                {/* Email Field */}
                <Field
                  className="p-2 rounded-xl border w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />

                {/* Phone Field */}
                <Field
                  className="p-2 rounded-xl border w-full"
                  type="text"
                  name="phone"
                  placeholder="Phone (Optional)"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs"
                />

                {/* Password Field */}
                <div className="relative">
                  <Field
                    className="p-2 rounded-xl border w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff color="gray" size={16} />
                    ) : (
                      <Eye color="gray" size={16} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />

                {/* Confirm Password Field */}
                <div className="relative">
                  <Field
                    className="p-2 rounded-xl border w-full"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!isValid || !dirty || loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>

        {/* Image Section */}
        <div className="md:block hidden w-1/2">
          <Image className="rounded-2xl" src={bgImage} alt="Register" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage;
