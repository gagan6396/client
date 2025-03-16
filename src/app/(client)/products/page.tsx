"use client";

import {
  getCategoriesAPI,
  getProductByCategoryAPI,
} from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/Layout/ProductCategoryGrid";
import noProductFound from "@/public/notfound.jpg";
import { FilterIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Define Product type based on provided data
interface Product {
  _id: string;
  category_id: { _id: string; name: string; description: string; slug: string };
  subcategory_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  name: string;
  description: string;
  variants: {
    name: string;
    price: { $numberDecimal: string };
    stock: number;
    weight: number;
    dimensions: { height: number; length: number; width: number };
    sku: string;
    images: string[];
    _id: string;
  }[];
  images: string[];
  rating: number;
  brand: string;
  createdAt: string;
  inWishlist?: boolean;
  inCart?: boolean;
}

// Skeleton Product Card
const SkeletonProductCard = () => (
  <div className="group rounded-2xl overflow-hidden animate-pulse border border-gray-100">
    <div className="w-full aspect-square bg-gray-300 rounded-t-2xl" />
    <div className="p-4 md:p-6 space-y-3 bg-white">
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

const ProductGrid = ({
  products,
  title,
  isLoading,
}: {
  products: Product[];
  title: string;
  isLoading: boolean;
}) => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-10 md:mb-12 tracking-tight">
          {title}
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(10)].map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => {
              if (!product?.images || product.images.length === 0) {
                console.warn(
                  `Product at index ${index} has no images`,
                  product
                );
                return null;
              }
              const firstVariant = product.variants[0]; // Use the first variant for price and SKU
              return (
                <div
                  key={product._id}
                  className="group rounded-2xl overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
                >
                  <ProductCard
                    imageSrc={product.images[0]}
                    title={product.name}
                    price={firstVariant?.price.$numberDecimal || "N/A"}
                    originalPrice={
                      parseFloat(firstVariant?.price.$numberDecimal || "0") + 10
                    }
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
                We couldn’t find any products matching your criteria. Check back
                soon for updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("default");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (category) {
          const response = await getProductByCategoryAPI(category);
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        } else {
          const productsResponse = await getProductsAPI();
          setProducts(productsResponse.data.data.products);
          setFilteredProducts(productsResponse.data.data.products);
        }

        const categoriesResponse = await getCategoriesAPI();
        const categoryNames = categoriesResponse.data.data.map(
          (cat: any) => cat.name
        );
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by price range (using the first variant's price)
    filtered = filtered.filter((product) => {
      const price = parseFloat(
        product.variants[0]?.price.$numberDecimal || "0"
      );
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category_id.name)
      );
    }

    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter(
        (product) => (product.rating || 0) >= minRating
      );
    }

    // Sort products
    if (sortOption === "price-asc") {
      filtered.sort(
        (a, b) =>
          parseFloat(a.variants[0]?.price.$numberDecimal || "0") -
          parseFloat(b.variants[0]?.price.$numberDecimal || "0")
      );
    } else if (sortOption === "price-desc") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.variants[0]?.price.$numberDecimal || "0") -
          parseFloat(a.variants[0]?.price.$numberDecimal || "0")
      );
    } else if (sortOption === "rating-desc") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(filtered);
    setIsSheetOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setMinRating(0);
    setSortOption("default");
    setFilteredProducts(products);
    setIsSheetOpen(false);
  };

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

  return (
    <div className="min-h-screen">
      {/* Filter Trigger Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-end">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 md:px-4 md:py-2">
              <FilterIcon className="w-5 h-5" />
              <span className="hidden md:inline">Filter Products</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[90%] sm:w-[400px] max-w-[400px] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-6">Filter Products</h3>
            <div className="space-y-8">
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range
                </label>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <Checkbox
                        id={cat}
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, cat]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== cat)
                            );
                          }
                        }}
                      />
                      <label htmlFor={cat} className="text-sm text-gray-600">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={[minRating]}
                  onValueChange={(value) => setMinRating(value[0])}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-2">
                  {minRating} ★ and above
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sort By
                </label>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select sorting option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating-desc">
                      Rating: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Apply and Reset Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={applyFilters}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Apply Filters
                </Button>
                <Button onClick={resetFilters} className="w-full">
                  Reset
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Organic Products Section */}
      <ProductGrid
        products={filteredProducts}
        title="Discover Organic Products"
        isLoading={isLoading}
      />
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-lg text-gray-700">Loading products...</div>
        </div>
      }
    >
      <ProductPage />
    </Suspense>
  );
}
