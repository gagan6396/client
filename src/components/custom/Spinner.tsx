import React from "react";

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`animate-spin rounded-full border-t-2 border-blue-600 border-solid w-6 h-6 ${className}`}
  />
);
