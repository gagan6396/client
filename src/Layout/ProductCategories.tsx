"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { Button } from "@/components/ui/button";
import l2 from "@/public/l2.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductCard } from "./ProductCategoryGrid";

// Updated Product interface based on new data structure
interface Product {
  _id: string;
  supplier_id: {
    shop_address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    _id: string;
    email: string;
    phone: string;
    shop_name: string;
  };
  category_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  subcategory_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  reviews: any[];
  name: string;
  description: string;
  variants: {
    dimensions: {
      height: number;
      length: number;
      width: number;
    };
    discount: {
      type?: string;
      value?: number;
      active: boolean;
      startDate?: string;
      endDate?: string;
    };
    name: string;
    price: { $numberDecimal: string };
    stock: number;
    weight: number;
    sku: string;
    images: string[];
    _id: string;
  }[];
  images: {
    url: string;
    sequence: number;
    _id: string;
  }[];
  video: string | null;
  rating: number;
  brand: string;
  isBestSeller: boolean;
  createdAt: string;
  inWishlist: boolean;
  inCart: boolean;
}

// Category interface
interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images?: string[];
}

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100">
    <div className="w-full aspect-square bg-gray-300 rounded-t-2xl" />
    <div className="p-4 md:p-6 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-300 rounded-full" />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <div className="h-5 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-12" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 h-10 bg-gray-300 rounded-full" />
        <div className="h-6 w-6 bg-gray-300 rounded-full" />
      </div>
    </div>
  </div>
);

const SkeletonCategoryCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center p-4 animate-pulse">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-300 rounded w-1/2" />
  </div>
);

const ProductCategories: React.FC = () => {
  const navigate = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const categoryResponse = await getCategoriesAPI();
      setCategories(categoryResponse?.data?.data || []);

      const productsResponse = await getProductsAPI();
      setProducts(productsResponse?.data?.data?.products || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to load products and categories. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (error) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">{error}</p>
          <Button
            onClick={fetchCategories}
            className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      {/* Top Products Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl text-center font-extrabold text-gray-900 mb-10 tracking-tight">
            Popular Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {loading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : products.slice(0, 10).map((product) => {
                  const firstVariant = product.variants?.[0];
                  const currentDate = new Date();
                  const isDiscountActive =
                    firstVariant?.discount?.active &&
                    (!firstVariant.discount.startDate ||
                      new Date(firstVariant.discount.startDate) <= currentDate) &&
                    (!firstVariant.discount.endDate ||
                      new Date(firstVariant.discount.endDate) >= currentDate);
                  const discountValue = isDiscountActive ? firstVariant?.discount?.value : 0;
                  const price = parseFloat(firstVariant?.price?.$numberDecimal || "0");
                  const originalPrice = discountValue
                    ? price / (1 - discountValue / 100)
                    : price + 10; // Fallback to +10 if no discount

                  return (
                    <ProductCard
                      key={product._id}
                      images={product.images} // Pass the full images array for hover effect
                      title={`${product.name} - ${firstVariant?.name || "Default"}`}
                      price={firstVariant?.price?.$numberDecimal || "N/A"}
                      originalPrice={originalPrice}
                      isBestSeller={product.isBestSeller}
                      productId={product._id}
                      variantId={firstVariant?._id || ""}
                      inWishlist={product.inWishlist}
                      inCart={product.inCart}
                      discount={firstVariant?.discount}
                    />
                  );
                })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products">
              <Button className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Best Product Categories Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-extrabold text-gray-900 mb-10 tracking-tight">
            Best Product Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {loading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <SkeletonCategoryCard key={index} />)
              : categories.slice(0, 10).map((category) => (
                  <div
                    key={category?._id || `category-${Math.random()}`}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center p-4 md:p-6 transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border border-gray-100"
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4">
                      <img
                        src={category?.images?.[0] || "/placeholder-category.jpg"}
                        alt={category?.name || "Unnamed Category"}
                        className="w-full h-full object-cover rounded-full border-2 border-green-100 group-hover:border-green-300 transition-colors"
                      />
                      <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-1">
                      {category?.name || "Unnamed Category"}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {category?.description || "No description available"}
                    </p>
                    <Link
                      href={`/products?category=${category?._id || ""}`}
                      className="mt-3 inline-block text-green-600 font-medium text-sm md:text-base hover:text-green-700 transition-colors"
                    >
                      Explore Now →
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </main>

      {/* Video and Description Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center bg-white rounded-3xl shadow-lg p-6 md:p-10">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={l2}
                alt="Nature Essence"
                className="w-full h-auto object-cover transform transition-all hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Discover the Essence of Nature
              </h2>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                At Gauraaj, we’re passionate about delivering pure, organic
                products sourced directly from nature’s heart. Embrace
                sustainable living and join us in nurturing a healthier, greener
                planet.
              </p>
              <Button
                onClick={() => navigate.push("/about")}
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProductCategories;