import rishabh from "@/public/rishabh11.jpg";
import Image from "next/image";
import React from "react";
const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold mb-8">
          WHAT OUR CUSTOMERS SAY ABOUT THE PRODUCTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              id: 1,
              image: rishabh,
            },
            {
              id: 2,
              image: rishabh,
            },
            {
              id: 3,
              image: rishabh,
            },
            {
              id: 4,
              image: rishabh,
            },
          ].map((item: any, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg p-6 text-center"
            >
              <p className="text-gray-700 italic">
                "Gauraaj has been a game changer for my health. Their organic
                honey and grains have made a significant difference in my diet.
                The quality is top-notch, and I love knowing that I’m supporting
                sustainable farming."
              </p>
              <div className="mt-4 flex flex-col items-center">
                <Image
                  src={item?.image}
                  alt={`Customer ${index + 1}`}
                  className="w-16 h-16 rounded-full border-2"
                />
                <h4 className="mt-2 font-semibold text-gray-800">Rishabh Gehlot</h4>
                <span className="text-gray-600 text-sm">Health Enthusiast</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
