// ResetPasswordPage.tsx
"use client";

import { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ResetPasswordForm } from "./ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="flex mar items-center justify-center min-h-screen bg-gradient-to-b bg-[#7A6E18]/20 to-gray-100 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="text-center">
            <ClipLoader size={30} color="#16a34a" />
            <p className="text-gray-800 text-lg font-medium mt-4">Loading...</p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
