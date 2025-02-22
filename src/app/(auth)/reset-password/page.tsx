"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm"; // New child component

const ResetPasswordPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Suspense
        fallback={
          <div className="text-center">
            <p className="text-gray-800 text-lg font-medium">Loading...</p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;