"use client";
import { createContactAPI } from "@/apis/contactAPIs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import bg1 from "@/public/about_us/contact/1.png";
import bg2 from "@/public/about_us/contact/2.png";
// import bannerImage from "@/public/about_us/contact/banner.png"; // Add your banner image import
import { useFormik } from "formik";
import { Mail, MapPin, Phone, Clock, Send, User, MessageSquare } from "lucide-react";
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createContactAPI(values);
        toast.success("Message sent successfully!");
        resetForm();
      } catch (error) {
        toast.error("Failed to send message. Please try again.");
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-gradient-to-b from-gray-50/50 to-white">
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

      {/* Banner Image Section */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src='/abt.png' // Replace with your actual banner image path
          alt="Contact Us Banner"
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Section - Form */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Send us a message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full h-14 rounded-xl border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] transition-all px-4"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-2 px-1">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                {/* Phone & Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Phone Number
                    </label>
                    <div className="h-14 rounded-xl border border-gray-300 bg-gray-50/50 focus-within:ring-2 focus-within:ring-[#ae5809]/50 focus-within:border-[#ae5809] overflow-hidden">
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={formik.values.phone}
                        onChange={(value) => formik.setFieldValue("phone", value)}
                        onBlur={formik.handleBlur}
                        className="PhoneInput h-full"
                        inputClassName="!h-full !border-0 !bg-transparent !px-4 !w-full"
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm mt-2 px-1">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        className="w-full h-14 rounded-xl border border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] transition-all px-4 appearance-none"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Support">Support</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {formik.touched.category && formik.errors.category && (
                      <p className="text-red-500 text-sm mt-2 px-1">
                        {formik.errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-xl border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] min-h-[140px] p-4 transition-all"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={5}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm mt-2 px-1">
                      {formik.errors.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 bg-[#556b2f] hover:bg-[#3c4e1b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Right Section - Contact Info with Background Image */}
            <div className="relative p-8 md:p-12 overflow-hidden border-l border-gray-200">
              {/* Background Image with Opacity */}
              <div className="absolute inset-0">
                <Image
                  src='/bgc.png'
                  alt="Contact Background"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Dark overlay for better text readability */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" /> */}
              </div>

              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ae5809]/10 rounded-full -translate-y-16 translate-x-16 z-0" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ae5809]/5 rounded-full translate-y-24 -translate-x-24 z-0" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-white">Get in touch</h3>
                
                <div className="space-y-6 mb-10">
                  {/* Address */}
                  <div className="flex items-start gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-[#ae5809]/30 flex items-center justify-center group-hover:bg-[#ae5809]/40 transition-colors">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-white">Our Address</h4>
                      <p className="text-gray-200 text-sm">
                        Gauraj Valleyfood Pvt. Ltd.<br />
                        New Mothorowala Road,<br />
                        Uttarakhand 248001
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <a href="mailto:info@gauraaj.org" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/10 transition-all ">
                    <div className="w-12 h-12 rounded-lg bg-[#ae5809]/30 flex items-center justify-center group-hover:bg-[#ae5809]/40 transition-colors">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-white">Email Us</h4>
                      <p className="text-gray-200 text-sm  transition-colors">
                        info@gauraaj.org
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+916397904655" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/10 transition-all ">
                    <div className="w-12 h-12 rounded-lg bg-[#ae5809]/30 flex items-center justify-center group-hover:bg-[#ae5809]/40 transition-colors">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-white">Call Us</h4>
                      <p className="text-gray-200 text-sm  transition-colors">
                        +91-6397904655
                      </p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all ">
                    <div className="w-12 h-12 rounded-lg bg-[#ae5809]/30 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-white">Working Hours</h4>
                      <p className="text-gray-200 text-sm">
                        Mon - Sat: 10:00 AM - 8:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-gradient-to-r from-[#ae5809]/5 to-transparent rounded-3xl p-8 md:p-12 border border-[#ae5809]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ae5809]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ae5809]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Quick Response</h4>
              <p className="text-gray-600 text-sm">We typically respond within 24 hours during business days</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ae5809]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ae5809]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Communication</h4>
              <p className="text-gray-600 text-sm">Your information is protected with industry-standard security</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ae5809]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ae5809]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Dedicated Support</h4>
              <p className="text-gray-600 text-sm">Our team is ready to assist you with any questions or concerns</p>
            </div>
          </div>
        </div>

        {/* Bottom Image */}
        {/* <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mt-12">
          <Image
            src={bg2}
            alt="Get in Touch"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 to-transparent flex items-center">
            <div className="p-8 md:p-12 text-white max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Let's Create Something Great Together</h3>
              <p className="text-gray-100">
                Whether you have a question about our products, need support, or just want to say hello—we're here for you.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}