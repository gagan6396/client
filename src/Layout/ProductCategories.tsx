"use client";
import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { Button } from "@/components/ui/button";
import l2 from "@/public/l2.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCategoryGrid";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
      <div className="h-3 bg-gray-300 rounded w-1/4" />
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

const ProductCategories = () => {
  const navigate = useRouter();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesAPI();
      setCategories(response.data.data);

      const ProductsResponse = await getProductsAPI();
      setProducts(ProductsResponse.data.data.products);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
              : products.slice(0, 10).map((product: any, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
                  >
                    <ProductCard
                      skuParameters={product.skuParameters}
                      imageSrc={product.images[0]}
                      title={product.name}
                      price={product.price?.$numberDecimal || "N/A"}
                      originalPrice={(product.price?.$numberDecimal ?? 0) + 10}
                      isBestSeller={true}
                      productId={product._id}
                      inWishlist={product?.inWishlist}
                      inCart={product?.inCart}
                    />
                  </div>
                ))}
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
              : categories.slice(0, 10).map((category: any, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center p-4 md:p-6 transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border border-gray-100"
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4">
                      <img
                        src={category?.images[0]}
                        alt={category?.name}
                        className="w-full h-full object-cover rounded-full border-2 border-green-100 group-hover:border-green-300 transition-colors"
                      />
                      <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-1">
                      {category.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                    <Link
                      href={`/products?category=${category._id}`}
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