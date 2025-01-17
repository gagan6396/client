import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-[#a5a54a] focus:border-[#a5a54a] border-gray-300 placeholder-gray-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
