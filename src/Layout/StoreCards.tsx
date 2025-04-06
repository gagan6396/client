"use client";
import { FC } from "react";

interface StoreInfo {
  title: string;
  address: string;
  timings: string;
  delivery: string;
}

const stores: StoreInfo[] = [
  {
    title: "Banjarawala",
    address: "Vega Superstore Near Siddheshwar Temple, Bajaraawala, Dehradun",
    timings: "7:00–23:00",
    delivery: "10:00 – 17:00",
  },
];

const StoreSection: FC = () => {
  return (
    <section className="mt-10 sm:mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-br from-green-50 via-white to-yellow-50 overflow-hidden">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-600 mb-10 md:mb-14 text-center tracking-wide animate-fade-in-down">
        Discover Our Local Hub
      </h2>

      {/* Store Section */}
      <div className="relative max-w-4xl mx-auto">
        {stores.map((store, index) => (
          <div
            key={index}
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out animate-slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-20 animate-pulse" />

            {/* Content */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-4 sm:mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent transition-all duration-300">
              {store.title}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 font-light">
              {store.address}
            </p>
            <div className="space-y-2">
              <p className="text-gray-800 text-base sm:text-lg flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-bounce" />
                <strong className="font-semibold text-green-700">Open:</strong>{" "}
                <span className="ml-2">{store.timings}</span>
              </p>
              <p className="text-gray-800 text-base sm:text-lg flex items-center">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-bounce" />
                <strong className="font-semibold text-green-700">Delivery:</strong>{" "}
                <span className="ml-2">{store.delivery}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-float" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-10 animate-float delay-1000" />
    </section>
  );
};

export default StoreSection;

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