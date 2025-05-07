'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendSubscriptionEmail } from '@/lib/sendSubscriptionEmail';
import { useFormik } from 'formik';
import { FC } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

const SubscriptionForm: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append('email', values.email);

      try {
        const result = await sendSubscriptionEmail(formData);
        if (result.success) {
          toast.success(result.message, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          resetForm();
        } else {
          toast.error(result.message, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error('An unexpected error occurred.', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 max-w-lg mx-auto my-8 sm:my-12 md:my-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7A6E18] mb-3 sm:mb-4 md:mb-6 text-center tracking-tight">
        🌿 Join Our Organic Community!
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center mb-6 sm:mb-8">
        Get fresh updates on organic products, wellness insights, and special deals delivered to your inbox. Stay connected to nature’s best!
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <div className="w-full sm:flex-1 max-w-sm">
          <Input
            type="email"
            placeholder="Enter your email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 shadow-sm ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full sm:w-auto bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-500"
        >
          {formik.isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SubscriptionForm;