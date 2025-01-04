"use client";
import { Spinner } from "@/components/custom/Spinner"; // If you have a spinner component in ShadCN
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false); // For showing loader on form submission

  // Form submit handler
  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Simulate an API call
      console.log("Registering with", values);
      // Use API to handle registration here

      // Simulating a delay
      setTimeout(() => {
        setLoading(false);
        alert("Registered successfully");
      }, 2000);
    } catch (error) {
      setLoading(false);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create Account
          </h2>
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
            {({ isSubmitting }) => (
              <Form>
                {/* Name Field */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? <Spinner className="w-5 h-5" /> : "Register"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
