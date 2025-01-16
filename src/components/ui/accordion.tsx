import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Accordion Root
export const Accordion = AccordionPrimitive.Root;

// Accordion Item
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionPrimitive.AccordionItemProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={clsx("border-b border-gray-200 focus-within:ring focus-within:ring-green-200", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
);
AccordionItem.displayName = "AccordionItem";

// Accordion Trigger
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionPrimitive.AccordionTriggerProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={clsx(
          "group flex flex-1 items-center justify-between py-4 text-left text-gray-800 transition",
          "hover:text-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-200",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={clsx(
            "ml-2 h-5 w-5 text-gray-600 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionPrimitive.AccordionContentProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={clsx(
        "overflow-hidden text-gray-600 transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp",
        "pb-4",
        className
      )}
      {...props}
    >
      <div>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = "AccordionContent";
