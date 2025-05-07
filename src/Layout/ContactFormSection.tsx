"use client";
import { createContactAPI } from "@/apis/contactAPIs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import bg1 from "@/public/contact.jpg";
import bg2 from "@/public/l2.jpg";
import { useFormik } from "formik";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

// Validation schema using Yup
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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await createContactAPI(values);
        toast.success("Message sent successfully!");
        formik.resetForm();
      } catch (error) {
        toast.error("Failed to send message. Please try again.");
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-gradient-to-b bg-white">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left Section - Image */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-full rounded-2xl overflow-hidden">
          <Image
            src={bg1}
            alt="Contact Background"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" /> */}
        </div>

        {/* Right Section - Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 text-center tracking-tight">
            Get in Touch
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <Input
                name="name"
                placeholder="Enter your name"
                className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Your Phone
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <Textarea
                name="message"
                placeholder="Write your message here..."
                className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {formik.errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold py-2.5 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Section - Info */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7A6E18] mb-3 md:mb-4 tracking-tight">
            Let’s Connect
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
            We’d love to hear from you! Reach out for inquiries, feedback, or support.
          </p>

          <div className="space-y-3 sm:space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <MapPin className="text-[#7A6E18] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Gauraj Valleyfood Pvt. Ltd. <br />
                New Mothorowala Road, Uttarakhand 248001
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <Mail className="text-[#7A6E18] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <p className="text-sm sm:text-base text-gray-700">
                info@gauraaj.org
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <Phone className="text-[#7A6E18] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <p className="text-sm sm:text-base text-gray-700">
                +91-6397-90-4655
              </p>
            </div>

            {/* Working Hours */}
            <div className="p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Monday – Saturday: 10:00–20:00 <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-full rounded-2xl overflow-hidden">
          <Image
            src={bg2}
            alt="Contact Background"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" /> */}
        </div>
      </div>
    </div>
  );
}