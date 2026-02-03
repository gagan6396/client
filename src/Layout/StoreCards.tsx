'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendCollaborationEmail } from "@/lib/sendCollaborationEmail";
import { useFormik } from "formik";
import { FC } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Handshake, User, Mail, Building, Users, MessageSquare, Send } from "lucide-react";

// Validation schema using Yup
const collaborationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  organization: Yup.string().required(
    "Organization/Individual role is required"
  ),
  collaborationType: Yup.string()
    .required("Collaboration type is required")
    .oneOf(
      ["NGO", "Corporate CSR", "Volunteer", "Student", "Other"],
      "Invalid collaboration type"
    ),
  message: Yup.string().required("Message is required"),
});

const CollaborateSection: FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      organization: "",
      collaborationType: "NGO",
      message: "",
    },
    validationSchema: collaborationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('organization', values.organization);
      formData.append('collaborationType', values.collaborationType);
      formData.append('message', values.message);

      try {
        const result = await sendCollaborationEmail(formData);
        if (result.success) {
          toast.success(result.message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          });
          resetForm();
        } else {
          toast.error(result.message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          });
        }
      } catch (error) {
        toast.error("An unexpected error occurred.", {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-br from-[#ae5809]/5 via-white to-[#ae5809]/10 overflow-hidden">
      {/* Toast Container */}
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

      {/* Header Section */}
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ae5809]/10 mb-6">
            <Handshake className="w-10 h-10 text-[#ae5809]" />
          </div> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
           Collaborate with <span className="text-[#3c4e1b]">Us</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Partner with us to create meaningful change. Whether you're an NGO, corporate, 
            volunteer, or student, let's work together to make a difference.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Left Column - Benefits */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Collaborate With Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-[#ae5809]/5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#ae5809]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#ae5809]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Community Impact</h4>
                    <p className="text-sm text-gray-600">Make a tangible difference in local communities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-[#ae5809]/5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#ae5809]/10 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-[#ae5809]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sustainable Partnerships</h4>
                    <p className="text-sm text-gray-600">Long-term collaboration for lasting change</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-[#ae5809]/5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#ae5809]/10 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 text-[#ae5809]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mutual Growth</h4>
                    <p className="text-sm text-gray-600">Shared learning and development opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#3c4e1b] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Ready to Start?</h3>
              <p className="text-white/90 text-sm mb-4">
                Fill out the form and our partnership team will contact you within 48 hours.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-sm">Direct team contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-sm">Customized collaboration plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-sm">Regular progress updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Collaboration Inquiry</h3>
                <p className="text-gray-600">Tell us about your collaboration ideas and we'll get back to you soon.</p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    placeholder="Enter your name"
                    className={`w-full h-12 rounded-xl border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] transition-all px-4 ${
                      formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                    }`}
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

                {/* Email & Organization Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full h-12 rounded-xl border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] transition-all px-4 ${
                        formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                      }`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-2 px-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Organization/Role *
                    </label>
                    <Input
                      name="organization"
                      placeholder="E.g., NGO name, company, or role"
                      className={`w-full h-12 rounded-xl border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] transition-all px-4 ${
                        formik.touched.organization && formik.errors.organization ? 'border-red-500' : ''
                      }`}
                      value={formik.values.organization}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.organization && formik.errors.organization && (
                      <p className="text-red-500 text-sm mt-2 px-1">
                        {formik.errors.organization}
                      </p>
                    )}
                  </div>
                </div>

                {/* Collaboration Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Collaboration Type *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["NGO", "Corporate CSR", "Volunteer", "Student", "Other"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => formik.setFieldValue("collaborationType", type)}
                        className={`h-12 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                          formik.values.collaborationType === type
                            ? "border-[#ae5809] bg-[#ae5809]/10 text-[#ae5809] font-semibold"
                            : "border-gray-300 bg-gray-50 hover:border-[#ae5809]/50 hover:bg-[#ae5809]/5 text-gray-700"
                        }`}
                      >
                        <span className="text-sm">{type}</span>
                      </button>
                    ))}
                  </div>
                  {formik.touched.collaborationType && formik.errors.collaborationType && (
                    <p className="text-red-500 text-sm mt-2 px-1">
                      {formik.errors.collaborationType}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Your Message *
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your collaboration ideas, goals, and how you'd like to work together..."
                    className={`w-full rounded-xl border-gray-300 bg-gray-50/50 text-base focus:ring-2 focus:ring-[#ae5809]/50 focus:border-[#ae5809] min-h-[140px] p-4 transition-all ${
                      formik.touched.message && formik.errors.message ? 'border-red-500' : ''
                    }`}
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
                  className="w-full h-14 bg-[#3c4e1b] hover:to-[#587429] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                      Sending Inquiry...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Send className="w-5 h-5" />
                      Submit Collaboration Request
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm">
            By submitting this form, you agree to our Privacy Policy and consent to being contacted 
            regarding collaboration opportunities.
          </p>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#ae5809]/5 rounded-full -z-10" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#ae5809]/5 rounded-full -z-10" />
    </section>
  );
};

export default CollaborateSection;