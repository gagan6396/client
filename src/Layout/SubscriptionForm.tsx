"use client";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input
import { FC } from "react";

const SubscriptionForm: FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add subscription logic here (e.g., API call)
    console.log("Subscribed with:", e.currentTarget.email.value);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 max-w-lg mx-auto my-8 sm:my-12 md:my-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-600 mb-3 sm:mb-4 md:mb-6 text-center tracking-tight">
        🌿 Join Our Organic Community!
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center mb-6 sm:mb-8">
        Get fresh updates on organic products, wellness insights, and special deals delivered to your inbox. Stay connected to nature’s best!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <Input
          type="email"
          placeholder="Enter your email address"
          name="email"
          className="w-full sm:flex-1 max-w-sm rounded-lg border-gray-200 bg-gray-50 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 shadow-sm"
        />
        <Button
          type="submit"
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-500"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default SubscriptionForm;