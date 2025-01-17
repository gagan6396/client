import { FC } from "react";

const SubscriptionForm: FC = () => {
  return (
    <div className="bg-white rounded-md p-6 text-center max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold text-green-700 mb-2">
        🌿 Join Our Organic Community!
      </h2>
      <p className="text-gray-600">
        Get fresh updates on organic products, wellness insights, and special
        deals delivered to your inbox. Sign up and stay connected to nature’s
        best!
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className="border rounded-md p-2 flex-grow max-w-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
