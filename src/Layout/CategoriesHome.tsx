// components/CategoryRoundedImages.tsx
"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images?: string[];
}

const CategoryRoundedImages = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategoriesAPI();
        setCategories(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth;
      
      const newScrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="bg-amber-100 py-8 md:py-12">
        <div className="w-full">
          <div className="mb-8 md:mb-10 px-4 sm:px-6 lg:px-8">
            <div className="h-10 bg-gray-200 rounded w-56 animate-pulse mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse mx-auto"></div>
          </div>
          
          <div className="flex gap-6 sm:gap-8 md:gap-10 justify-center px-4 sm:px-6 lg:px-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col items-center flex-shrink-0 w-24 sm:w-28 md:w-32"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-full mb-4 shadow-lg"></div>
                <div className="h-5 bg-gray-200 rounded w-20 sm:w-24 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 sm:w-28"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't chunk categories - show them all in a scrollable row
  return (
    <>
      <section className="bg-amber-100 py-8 md:py-12 relative overflow-hidden">
        <div className="w-full relative z-10">
          <div className="mb-8 md:mb-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5437] text-center">
              Shop By Category
            </h2>
            {/* <p className="text-gray-600 text-center mt-2 md:text-lg max-w-2xl mx-auto">
              Explore our wide range of products
            </p> */}
          </div>
          
          <div className="relative">
            {categories.length > 0 && (
              <>
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-[#2d5437]/10 rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 group"
                  aria-label="Scroll left"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-[#2d5437] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => scroll('right')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-[#2d5437]/10 rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 group"
                  aria-label="Scroll right"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-[#2d5437] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide px-12 sm:px-14 md:px-16"
            >
              <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 justify-start min-w-max py-4">
                {categories.map((category, index) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category._id}`}
                    className="group flex flex-col items-center w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 flex-shrink-0 transform hover:-translate-y-2 transition-all duration-500"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="relative mb-3">
                      {/* Glow effect with #2d5437 color */}
                      <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full bg-[#2d5437]/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10 group-hover:scale-110"></div>
                      
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:border-[#2d5437] group-hover:border-[3px] group-hover:scale-105 transition-all duration-500 bg-white">
                        {/* Inner wrapper with overflow-hidden to clip the scaled image */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          {category.images && category.images[0] ? (
                            <Image
                              src={category.images[0]}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, 128px"
                              priority={index < 6}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f8f7f4] to-[#f2f1ea] group-hover:from-[#f5f4ef] group-hover:to-[#efeee5] transition-all duration-500">
                              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2d5437] group-hover:scale-110 transition-transform duration-500">
                                {category.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                          
                          <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow indicator with #2d5437 color */}
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-[#2d5437] rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center w-full min-h-[50px] sm:min-h-[60px] md:min-h-[70px] flex flex-col items-center justify-center px-1">
                      {/* Category name with #2d5437 color on hover */}
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-[#2d5437] transition-all duration-300 uppercase tracking-wide break-words w-full line-clamp-2">
                        {category.name}
                      </h3>
                      
                      {/* Description with #2d5437 color on hover */}
                      <p className="text-xs sm:text-sm text-gray-600 group-hover:text-[#2d5437] mt-1 sm:mt-1.5 line-clamp-2 min-h-[24px] sm:min-h-[28px] md:min-h-[32px] max-w-full transition-colors duration-300">
                        {category.description || 'Explore our premium collection'}
                      </p>
                      
                      {/* Underline with #2d5437 color */}
                      <div className="h-0.5 sm:h-0.5 w-0 group-hover:w-full bg-[#2d5437] transition-all duration-700 mx-auto rounded-full mt-1.5 sm:mt-2"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {!loading && categories.length === 0 && (
            <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#2d5437]/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#2d5437]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Yet</h3>
              <p className="text-gray-600">Check back soon for our curated collection</p>
            </div>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes borderPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(45, 84, 55, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(45, 84, 55, 0.1);
          }
        }
        
        a[href*="/products"] {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        
        .group:hover .relative > div:first-child {
          animation: borderPulse 2s ease-in-out infinite;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .break-words {
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}} />
    </>
  );
};

export default CategoryRoundedImages;