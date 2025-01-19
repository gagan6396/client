"use client";
import { RootState } from "@/app/store";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "@/features/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Validation schema with Yup
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
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: any) => {
    dispatch(registerStart());
    // Simulate the registration process (no API call)
    setTimeout(() => {
      if (values.name && values.email && values.password) {
        // Simulate successful registration
        dispatch(registerSuccess(values));
        toast.success("Registration successful!", { position: "top-center" });
        route.push("/");
      } else {
        // Simulate error
        dispatch(registerFailure("Registration failed. Please try again."));
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
        });
      }
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* Form Container */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">Create a new account</p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col gap-4 mt-2">
                <Field
                  className="p-2 rounded-xl border"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
                <Field
                  className="p-2 rounded-xl border"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
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
                <Field
                  className="p-2 rounded-xl border"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}
              </Form>
            )}
          </Formik>
          {/* Other sections (Google login, etc.) */}
        </div>
        {/* Image Section */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Register"
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage;
