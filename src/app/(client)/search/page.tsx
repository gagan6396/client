"use client";

import { getProductsAPI } from "@/apis/productsAPIs";
import { ProductCard } from "@/Layout/ProductCategoryGrid";
import { default as image404, default as noProductFound } from "@/public/notfound.jpg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

// Reusable ProductGrid Component
const ProductGrid = ({ products }: { products: any[] }) => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product, index) => {
          if (!product?.images || product.images.length === 0) {
            console.warn(`Product at index ${index} has no images`, product);
            return null;
          }

          return (
            <div
              key={index}
              className="embla__slide rounded-xl p-2 sm:p-4 my-2 sm:my-3 relative hover:shadow-lg transition-shadow duration-300"
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
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="max-w-md mx-auto">
            <img
              src="/images/no-products.svg"
              alt="No Products Found"
              className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6"
            />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              We couldn&apos;t find any products matching your criteria. Stay
              tuned for updates!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Hook for Fetching and Filtering Products
const useProducts = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProductsAPI();
        setAllProducts(response.data.data.products);
        setFilteredProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [query, allProducts]);

  return { filteredProducts, isLoading, error };
};

// Main SearchPage Component
const SearchPage = () => {
  const { filteredProducts, isLoading, error } = useProducts();
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.on("init", () => autoplay.current?.play());
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-700">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="max-w-md mx-auto">
          <img
            src={noProductFound.src}
            alt="No Products Found"
            className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6"
          />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            No Products Found
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            We couldn&apos;t find any products matching your criteria. Stay
            tuned for updates!
          </p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0 && !isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <img
            src={image404.src}
            alt="Products Coming Soon"
            className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6"
          />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Products Coming Soon!
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            We&apos;re working hard to bring you amazing products. Stay tuned!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Carousel Section */}
      <section className="my-8 sm:my-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
          Search Results
        </h2>
        <div ref={emblaRef} className="embla w-11/12 mx-auto">
          <div className="embla__container flex gap-4">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Suspense Wrapper
export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <SearchPage />
    </Suspense>
  );
}
