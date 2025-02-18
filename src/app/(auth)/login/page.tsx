"use client";
import { LoginAPI } from "@/apis/AuthAPIs";
import bgImage from "@/public/l1.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as Yup from "yup";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle login submission
  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await LoginAPI({
        email: values.email,
        password: values.password,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.data.token);
      }
      toast.success("Login successful!", { position: "top-center" });
      router.replace("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl max-w-5xl w-full bg-white overflow-hidden">
        {/* Form Container */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="font-bold text-3xl text-[#002D74] mb-2">Login</h2>
          <p className="text-sm text-[#002D74] mb-8">
            If you are already a member, easily log in
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col gap-6">
                <div>
                  <Field
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74] focus:ring-1 focus:ring-[#002D74] transition-all"
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

                <div className="relative">
                  <Field
                    className="p-3 rounded-xl border w-full focus:outline-none focus:border-[#002D74] focus:ring-1 focus:ring-[#002D74] transition-all"
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

                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-3 hover:bg-[#004494] transition-all duration-300 mt-4 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color="#ffffff" /> : "Login"}
                </button>
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}
              </Form>
            )}
          </Formik>

          {/* Forgot Password */}
          <div className="mt-6 text-sm text-[#002D74] text-center">
            <Link href="#" className="hover:underline hover:text-[#004494]">
              Forgot your password?
            </Link>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-sm text-[#002D74] text-center">
            <p>Don&apos;t have an account?</p>
            <Link
              href="/signup"
              className="inline-block mt-2 py-2 px-6 bg-white border border-[#002D74] rounded-xl hover:bg-[#002D74] hover:text-white transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 hidden md:block relative">
          <Image
            className="object-cover"
            src={bgImage}
            alt="Login"
            fill
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
