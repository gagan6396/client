"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAPI();
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error: any) {
      // console.log(error.response.data);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <section className="container mx-auto px-5 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12">
        Explore Our Categories
      </h1>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: any, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4"
          >
            {/* Image Section */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative">
              <img
                src={category?.images[0]}
                alt={category?.name}
                className="rounded-full object-cover"
              />
            </div>

            {/* Information Section */}
            <div className="ml-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
              <Link
                href={`/products?category=${category._id}`}
                className="text-green-600 text-sm md:text-base font-medium mt-2 hover:underline"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
