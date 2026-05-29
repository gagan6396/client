"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { Button } from "@/components/ui/button";
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
  isSeasonalFavorite?: boolean;
  isNewLaunch?: boolean;
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

// Type for product filter
type ProductFilterType = 'bestSeller' | 'newLaunch' | 'seasonalFavorites';

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
      <div className="drop-shadow-sm flex gap-2">
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
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [productFilter, setProductFilter] = useState<ProductFilterType>('bestSeller');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const categoryResponse = await getCategoriesAPI();
      setCategories(categoryResponse?.data?.data || []);

      const productsResponse = await getProductsAPI();
      const productsData = productsResponse?.data?.data?.products || [];
      
      // Debug logs - remove these in production
      console.log("=== Product Categories Debug ===");
      console.log("Total products:", productsData.length);
      console.log("Products with isBestSeller=true:", productsData.filter((p: Product) => p.isBestSeller === true).length);
      console.log("Products with isSeasonalFavorite=true:", productsData.filter((p: Product) => p.isSeasonalFavorite === true).length);
      console.log("Products with isNewLaunch=true:", productsData.filter((p: Product) => p.isNewLaunch === true).length);
      console.log("Sample product fields:", productsData.slice(0, 2).map((p: Product) => ({
        name: p.name,
        isBestSeller: p.isBestSeller,
        isSeasonalFavorite: p.isSeasonalFavorite,
        isNewLaunch: p.isNewLaunch
      })));
      console.log("================================");
      
      setProducts(productsData);
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

  const handleProductClick = (productId: string) => {
    navigate.push(`/products/${productId}`);
  };

  // Filter products based on selected filter
  const getFilteredProducts = () => {
    if (productFilter === 'bestSeller') {
      const filtered = products.filter((item) => item.isBestSeller === true);
      console.log(`Best Seller filter: ${filtered.length} products found`);
      return filtered;
    } else if (productFilter === 'newLaunch') {
      let filtered = products.filter((item) => item.isNewLaunch === true);
      console.log(`New Launch filter (by flag): ${filtered.length} products found`);
      
      if (filtered.length === 0) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = products
          .filter((item) => new Date(item.createdAt) >= thirtyDaysAgo)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(`New Launch filter (by date - last 30 days): ${filtered.length} products found`);
      }
      
      return filtered;
    } else if (productFilter === 'seasonalFavorites') {
      let filtered = products.filter((item) => item.isSeasonalFavorite === true);
      console.log(`Seasonal Favorites filter (by flag): ${filtered.length} products found`);
      
      if (filtered.length === 0) {
        filtered = products
          .filter((item) => item.rating >= 4)
          .sort((a, b) => b.rating - a.rating);
        console.log(`Seasonal Favorites filter (by rating >=4): ${filtered.length} products found`);
      }
      
      return filtered;
    }
    return [];
  };

  const filteredProducts = getFilteredProducts();

  const emptyStateMessages: Record<ProductFilterType, string> = {
    bestSeller: 'There are no best seller products available at the moment.',
    newLaunch: 'There are no new launch products available at the moment.',
    seasonalFavorites: 'There are no seasonal favorites available at the moment.',
  };

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
            className="bg-[#7A6E18] text-white hover:bg-[#7A6E18] px-6 py-2 rounded-full"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 overflow-x-hidden w-full">
      {/* Top Products Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="container mx-auto w-full">

          {/* Tab Navigation — scrollable on mobile */}
          <div className="w-full overflow-x-auto mb-8" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className="flex min-w-max mx-auto border-b border-gray-200 w-fit" style={{ margin: "0 auto" }}>
              <button
                onClick={() => setProductFilter('bestSeller')}
                className={`px-4 sm:px-6 py-3 text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  productFilter === 'bestSeller'
                    ? 'text-[#2d5437] border-b-2 border-[#7A6E18]'
                    : 'text-gray-500 hover:text-[#2d5437]'
                }`}
              >
                Best Seller
              </button>
              <button
                onClick={() => setProductFilter('newLaunch')}
                className={`px-4 sm:px-6 py-3 text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  productFilter === 'newLaunch'
                    ? 'text-[#2d5437] border-b-2 border-[#7A6E18]'
                    : 'text-gray-500 hover:text-[#2d5437]'
                }`}
              >
                New Launch
              </button>
              <button
                onClick={() => setProductFilter('seasonalFavorites')}
                className={`px-4 sm:px-6 py-3 text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  productFilter === 'seasonalFavorites'
                    ? 'text-[#2d5437] border-b-2 border-[#7A6E18]'
                    : 'text-gray-500 hover:text-[#2d5437]'
                }`}
              >
                Seasonal Favorites
              </button>
            </div>
          </div>

          {/* Products Grid with Empty State */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, index) => <SkeletonCard key={index} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4 gap-4">
              {filteredProducts.slice(0, 12).map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="cursor-pointer"
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Products Available
              </h3>
              <p className="text-gray-500 mb-6">
                {emptyStateMessages[productFilter]}
              </p>
              <Button
                onClick={() => navigate.push('/products')}
                className="bg-amber-50 text-[#7A6E18] hover:bg-amber-100 px-6 py-2 rounded-full border border-amber-200"
              >
                Browse All Products
              </Button>
            </div>
          )}

          {/* View All Button */}
          {!loading && filteredProducts.length > 0 && (
            <div className="mt-8 text-center">
              <Link href="/products">
                <Button className="bg-amber-50 text-[#7A6E18] hover:bg-amber-100 px-6 py-2 rounded-full border border-amber-200">
                  View All Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Best Product Categories Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 bg-white w-full">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#40572c] mb-3">
              Our Collection
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCategoryCard key={i} />)
              : (showAllCategories ? categories : categories.slice(0, 12)).map(
                  (category) => (
                    <div
                      onClick={() => navigate.push(`/products?category=${category._id}`)}
                      key={category?._id || `category-${Math.random()}`}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-[#7A6E18]"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={category?.images?.[0] || "/placeholder-category.jpg"}
                          alt={category?.name || "Unnamed Category"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                          priority={true}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-bold text-white text-xl mb-3 drop-shadow-lg text-center flex items-center justify-center gap-2">
                            {category?.name || "Unnamed Category"}
                            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                              →
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  )
                )}
          </div>

          {categories.length > 12 && (
            <div className="mt-10 text-center">
              <Button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="bg-amber-50 text-[#7A6E18] hover:bg-amber-100 px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 border border-amber-200"
              >
                {showAllCategories ? "Show Less" : "See More Categories"}
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Video and Description Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-16 md:py-16 w-full">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-white rounded-2xl shadow-xl shadow-amber-900/5 overflow-hidden p-0 lg:p-0">
            {/* Image Section */}
            <div className="relative lg:order-2 overflow-hidden h-full min-h-[400px] lg:min-h-[500px]">
              <Image
                src='/ab.png'
                alt="Nature Essence"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                priority
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-amber-300/30 rounded-full"></div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 lg:p-14 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                Discover the
                <span className="block font-serif italic text-[#40572c] mt-2">
                  Essence of Nature
                </span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200"></div>
              <div className="space-y-4">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                  At Gauraaj, we are dedicated to providing pure, wholesome and natural products straight from source.
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                  We are all about a movement that connects nature's rich unadulterated offerings, indigenous farmers, and you consumers – catalysing health, welfare and wellbeing for all. With our mission to promote positive social impact through Gauraaj products and programmes, we believe in shaping healthier and responsible communities for generations to come. With the support of our consumers, together, we can create a future where conscious and responsible choices lead to thriving rural and natural ecosystems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="text-2xl font-light text-[#2d5437]">100%</div>
                  <div className="text-sm text-gray-500">Naturally Sourced</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-light text-[#2d5437]">Framer's</div>
                  <div className="text-sm text-gray-500">Welfare and Wellbeing</div>
                </div>
              </div>
              <div className="pt-6">
                <Button
                  onClick={() => navigate.push("/about")}
                  className="group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 px-8 py-4 rounded-full transition-all duration-300 overflow-hidden shadow-lg shadow-amber-200"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-base font-medium">Learn More</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProductCategories;