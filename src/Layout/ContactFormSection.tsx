"use client";

import { createContactAPI } from "@/apis/contactAPIs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import bg2 from "@/public/l2.jpg";
import bg1 from "@/public/l3.jpg";
import { useFormik } from "formik";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

// Define the validation schema using Yup
const contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+[1-9]\d{1,14}$/, "Phone number must be valid"),
  category: Yup.string()
    .required("Category is required")
    .oneOf(
      ["General Inquiry", "Support", "Feedback", "Other"],
      "Invalid category"
    ),
  message: Yup.string().required("Message is required"),
});

export default function ContactFormSection() {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      category: "General Inquiry",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      try {
        const response = await createContactAPI(values);
        toast.success("Contact form submitted successfully!");
        formik.resetForm();
      } catch (error) {
        toast.error("Failed to submit the form. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-5 py-3">
        {/* Left Section */}
        <div className="flex-1 relative">
          <Image src={bg1} alt="bg1" className="w-full h-full object-cover" />
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white p-8 border border-gray-300 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <Input
                name="name"
                placeholder="Enter your name"
                className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 w-full p-3"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Phone
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 w-full p-3"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              ) : null}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 w-full p-3"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.category}
                </div>
              ) : null}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <Textarea
                name="message"
                placeholder="Write your message here"
                className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 w-full p-3"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.message}
                </div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="w-full bg-[#4a2b2b] text-white hover:bg-[#3b2323] py-3 rounded-lg text-lg"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col lg:flex-row gap-8 p-10 lg:p-16 bg-white">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#a5a54a] mb-4">
            GET IN TOUCH WITH US
          </h2>
          <p className="text-gray-600 mb-8">
            “We’d love to hear from you! Reach out for inquiries, feedback, or
            support.”
          </p>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4 p-4 border border-[#d9d9a0] rounded-lg shadow-sm">
              <MapPin className="text-[#a5a54a] w-6 h-6" />
              <p className="text-sm text-gray-700">
                Gauraj Valleyfood Pvt. Ltd. <br />
                New Mothorowala Road, Uttarakhand 248001
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 border border-[#d9d9a0] rounded-lg shadow-sm">
              <Mail className="text-[#a5a54a] w-6 h-6" />
              <p className="text-sm text-gray-700">support@gauraj.org</p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 border border-[#d9d9a0] rounded-lg shadow-sm">
              <Phone className="text-[#a5a54a] w-6 h-6" />
              <p className="text-sm text-gray-700">+91-6397-90-4655</p>
            </div>

            {/* Working Hours */}
            <div className="p-4 border border-[#d9d9a0] rounded-lg shadow-sm">
              <p className="text-sm text-gray-700">
                Monday – Saturday: 9:00–20:00 <br />
                Sunday: 10:00–19:00
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 relative">
          <Image src={bg2} alt="bg2" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}