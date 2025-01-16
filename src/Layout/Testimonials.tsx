import React from "react";

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-8">
          WHAT OUR CUSTOMERS SAY ABOUT THE PRODUCTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-lg p-6 text-center">
              <p className="text-gray-700 italic">
                "Gauraaj has been a game changer for my health. Their organic honey and grains have made a significant
                difference in my diet. The quality is top-notch, and I love knowing that I’m supporting sustainable
                farming."
              </p>
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={`/images/customer${index + 1}.jpg`}
                  alt={`Customer ${index + 1}`}
                  className="w-16 h-16 rounded-full border-2 border-green-500"
                />
                <h4 className="mt-2 font-semibold text-gray-800">Ravi S.</h4>
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
