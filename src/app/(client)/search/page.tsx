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
    <div className="w-full aspect-square bg-gray-300 rounded-t-xl" />
    <div className="p-4 space-y-3 bg-white">
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

// Reusable ProductGrid Component
const ProductGrid = ({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {isLoading ? (
        [...Array(8)].map((_, index) => <SkeletonProductCard key={index} />)
      ) : products.length > 0 ? (
        products.map((product) => {
          if (!product?.images || product.images.length === 0) {
            console.warn(`Product ${product._id} has no images`, product);
            return null;
          }

          const firstVariant = product.variants[0];
          const currentDate = new Date();
          const isDiscountActive =
            firstVariant?.discount?.active &&
            (!firstVariant.discount.startDate ||
              new Date(firstVariant.discount.startDate) <= currentDate) &&
            (!firstVariant.discount.endDate ||
              new Date(firstVariant.discount.endDate) >= currentDate);
          const discountValue = isDiscountActive
            ? firstVariant?.discount?.value
            : 0;
          const price = parseFloat(firstVariant?.price?.$numberDecimal || "0");
          const originalPrice = discountValue
            ? price / (1 - discountValue / 100)
            : price + 10; // Fallback to +10 if no discount

          return (
            <div
              key={product._id}
              className="embla__slide rounded-xl p-2 sm:p-4 my-2 sm:my-3 relative hover:shadow-lg transition-shadow duration-300"
            >
              <ProductCard
                images={product.images} // Pass the full images array for hover effect
                title={`${product.name} - ${firstVariant?.name || "Default"}`}
                price={firstVariant.price.$numberDecimal || "N/A"}
                originalPrice={originalPrice}
                isBestSeller={product.isBestSeller}
                productId={product._id}
                variantId={firstVariant._id}
                inWishlist={product?.inWishlist}
                inCart={product?.inCart}
                discount={firstVariant?.discount}
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
              className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6 animate-pulse"
            />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              We couldn&apos;t find any products matching your criteria. Stay tuned
              for updates!
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
            className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6 animate-pulse"
          />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Oops! Something Went Wrong
          </h3>
          <p className="text-sm sm:text-base text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      {/* Carousel Section */}
      <section className="my-8 sm:my-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-900">
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
            <p className="text-sm sm:text-base text-gray-700">
              Loading products...
            </p>
          </div>
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
