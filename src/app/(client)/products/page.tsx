"use client";
import { getProductByCategoryAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { ProductCard } from "@/Layout/ProductCategoryGrid";
import noProductFound from "@/public/notfound.jpg";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ProductGrid = ({ products, title }: { products: any[]; title: string }) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-10 md:mb-12 tracking-tight">
          {title}
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => {
              if (!product?.images || product.images.length === 0) {
                console.warn(`Product at index ${index} has no images`, product);
                return null;
              }
              return (
                <div
                  key={index}
                  className="group rounded-2xl overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
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
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <img
                src={noProductFound.src}
                alt="No Products Found"
                className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 animate-pulse"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                No Products Found
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                We couldn’t find any products matching your criteria. Check back soon for updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (category) {
          const response = await getProductByCategoryAPI(category);
          setProducts(response.data.data);
        } else {
          const ProductsResponse = await getProductsAPI();
          setProducts(ProductsResponse.data.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Loading Your Products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <img
            src={noProductFound.src}
            alt="Error"
            className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 animate-pulse"
          />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Oops! Something Went Wrong
          </h3>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <img
            src="/images/coming-soon.svg" // Ensure this image exists or replace with a valid path
            alt="Coming Soon"
            className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 animate-bounce"
          />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Products Coming Soon!
          </h3>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            We’re curating something amazing for you. Stay tuned!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Organic Products Section */}
      <ProductGrid products={products.slice(0, 20)} title="Discover Organic Products" />

      {/* Top Products Section */}
      <ProductGrid products={products.slice(20, 40)} title="Top Products" />

      {/* Popular Products Section */}
      <ProductGrid products={products.slice(40, 100)} title="Popular Products" />
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen bg-gray-50"><p className="text-lg text-gray-700">Loading products...</p></div>}>
      <ProductPage />
    </Suspense>
  );
}