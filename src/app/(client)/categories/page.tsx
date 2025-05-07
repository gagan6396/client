"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await getCategoriesAPI();
      setCategories(response.data.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-10 md:mb-14 tracking-tight animate-fade-in">
        Explore Our Categories
      </h1>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 animate-pulse flex items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full" />
              <div className="ml-6 space-y-3 w-full">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Categories List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category: any, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <Link href={`/products?category=${category._id}`} className="block">
                {/* Image Section */}
                <div className="relative w-full h-40 md:h-48 overflow-hidden">
                  <img
                    src={category?.images[0]}
                    alt={category?.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Information Section */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-[#7A6E18] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-[#7A6E18] text-sm md:text-base font-medium mt-2 group-hover:underline transition-all duration-300">
                    View Products →
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoriesPage;