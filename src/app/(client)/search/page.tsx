"use client";

import { getProductsAPI } from "@/apis/productsAPIs";
import { ProductCard } from "@/Layout/ProductCategoryGrid";
import noProductFound from "@/public/notfound.jpg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

// Product Interface
export interface Product {
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

// Skeleton Product Card
const SkeletonProductCard = () => (
  <div className="rounded-xl overflow-hidden animate-pulse border border-gray-100">
    <div className="w-full aspect-square bg-gray-200 rounded-t-xl" />
    <div className="p-3 space-y-2 bg-white">
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

// Reusable ProductGrid Component
const ProductGrid = ({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {isLoading ? (
        [...Array(8)].map((_, index) => <SkeletonProductCard key={index} />)
      ) : products.length > 0 ? (
        products.map((product) => {
          if (!product?.images || product.images.length === 0) {
            console.warn(`Product ${product._id} has no images`, product);
            return null;
          }

          return (
            <div
              key={product._id}
              className="embla__slide rounded-xl p-2 relative hover:shadow-lg transition-shadow duration-300"
            >
              <ProductCard
                images={product.images}
                title={product.name}
                variants={product.variants}
                rating={product.rating}
                isBestSeller={product.isBestSeller}
                productId={product._id}
                inWishlist={product.inWishlist}
                inCart={product.inCart}
              />
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="max-w-md mx-auto">
            <img
              src={noProductFound.src}
              alt="No Products Found"
              className="w-32 h-32 mx-auto mb-4 animate-pulse"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-sm text-gray-500">
              We couldn't find any products matching your criteria. Stay tuned for updates!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Hook for Fetching and Filtering Products
const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <img
            src={noProductFound.src}
            alt="Error"
            className="w-32 h-32 mx-auto mb-4 animate-pulse"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something Went Wrong
          </h3>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Carousel Section */}
      <section className="my-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-900">
          Search Results
        </h2>
        <div ref={emblaRef} className="embla w-full overflow-hidden">
          <div className="embla__container flex gap-4">
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Suspense Wrapper
export default function SuspenseWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-sm text-gray-700">Loading products...</p>
          </div>
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}