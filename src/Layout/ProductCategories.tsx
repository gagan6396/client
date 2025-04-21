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

// Product interface
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

// Skeleton Product Card
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
    <div className="w-full aspect-square bg-gray-200 rounded-t-xl" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-3 bg-gray-200 rounded-full" />
        ))}
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded-full flex-1" />
        <div className="h-5 w-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

// Skeleton Category Card
const SkeletonCategoryCard = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col items-center text-center p-3 animate-pulse">
    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
    <div className="h-2 bg-gray-200 rounded w-1/2" />
  </div>
);

const ProductCategories: React.FC = () => {
  const navigate = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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
    fetchData();
  }, []);

  if (error) {
    return (
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={fetchData}
            className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-full"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50">
      {/* Top Products Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-6">
            Popular Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : products
                  .filter((item) => item.isBestSeller)
                  .slice(0, 12)
                  .map((product) => (
                    <ProductCard
                      key={product._id}
                      images={product.images}
                      title={product.name}
                      variants={product.variants}
                      rating={product.rating}
                      isBestSeller={product.isBestSeller}
                      productId={product._id}
                      inWishlist={product.inWishlist}
                      inCart={product.inCart}
                    />
                  ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-full">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Best Product Categories Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-6">
            Best Product Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <SkeletonCategoryCard key={index} />)
              : categories.slice(0, 8).map((category) => (
                  <div
                    key={category?._id || `category-${Math.random()}`}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col items-center text-center p-3 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 border border-gray-100"
                  >
                    <div className="relative w-16 h-16 mb-2">
                      <img
                        src={
                          category?.images?.[0] || "/placeholder-category.jpg"
                        }
                        alt={category?.name || "Unnamed Category"}
                        className="w-full h-full object-cover rounded-full border border-green-100 group-hover:border-green-300 transition-colors"
                      />
                      <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {category?.name || "Unnamed Category"}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {category?.description || "No description available"}
                    </p>
                    <Link
                      href={`/products?category=${category?._id || ""}`}
                      className="mt-2 inline-block text-green-600 font-medium text-xs hover:text-green-700 transition-colors"
                    >
                      Explore Now →
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </main>

      {/* Video and Description Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-white rounded-xl shadow-sm p-6">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={l2}
                alt="Nature Essence"
                className="w-full h-auto object-cover transition-all hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                Discover the Essence of Nature
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                At Gauraaj, we’re passionate about delivering pure, organic
                products sourced directly from nature’s heart. Embrace
                sustainable living and join us in nurturing a healthier, greener
                planet.
              </p>
              <Button
                onClick={() => navigate.push("/about")}
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-full"
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
