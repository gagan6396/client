import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-[#a5a54a] focus:border-[#a5a54a] border-gray-300 placeholder-gray-400 resize-none",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
