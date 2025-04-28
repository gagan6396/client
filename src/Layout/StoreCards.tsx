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
    <section className="mt-10 sm:mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 py-10 md:py-12 bg-gradient-to-br from-green-50 via-white to-yellow-50 overflow-hidden">
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

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-600 mb-8 md:mb-10 text-center tracking-wide animate-fade-in-down">
        Collaborate With Us
      </h2>

      {/* Collaboration Form */}
      <div className="relative max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out animate-slide-up">
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-20 animate-pulse" />

        {/* Form Content */}
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 text-center">
          Join hands with Gauraaj! Whether you’re an NGO, corporate (CSR),
          volunteer, student, or other collaborator, we’d love to work together
          to make a difference.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <Input
              name="name"
              placeholder="Enter your name"
              className={`w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm ${
                formik.touched.name && formik.errors.name ? 'border-red-500' : ''
              }`}
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

          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Organization/Role */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Organization/Role
            </label>
            <Input
              name="organization"
              placeholder="E.g., NGO name, company, or individual role"
              className={`w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm ${
                formik.touched.organization && formik.errors.organization ? 'border-red-500' : ''
              }`}
              value={formik.values.organization}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.organization && formik.errors.organization && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {formik.errors.organization}
              </p>
            )}
          </div>

          {/* Collaboration Type */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Collaboration Type
            </label>
            <select
              name="collaborationType"
              className={`w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm ${
                formik.touched.collaborationType && formik.errors.collaborationType ? 'border-red-500' : ''
              }`}
              value={formik.values.collaborationType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="NGO">NGO</option>
              <option value="Corporate CSR">Corporate CSR</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.collaborationType &&
              formik.errors.collaborationType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {formik.errors.collaborationType}
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
              placeholder="Tell us about your collaboration ideas..."
              className={`w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-3.5 shadow-sm ${
                formik.touched.message && formik.errors.message ? 'border-red-500' : ''
              }`}
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
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold py-2.5 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
              "Submit Inquiry"
            )}
          </Button>
        </form>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-float" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-10 animate-float delay-1000" />
    </section>
  );
};

// Add these custom animations to your CSS (e.g., in a global stylesheet or Tailwind config)
const styles = `
  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
  }

  .animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .delay-1000 {
    animation-delay: 1s;
  }
`;

export default CollaborateSection;