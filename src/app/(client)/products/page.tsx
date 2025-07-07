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

// Product Grid Component
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
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
          {title}
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(8)].map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => {
              if (!product?.images || product.images.length === 0) {
                console.warn(`Product ${product._id} has no images`, product);
                return null;
              }
              return (
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
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <img
                src={noProductFound.src}
                alt="No Products Found"
                className="w-32 h-32 mx-auto mb-4 animate-pulse"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Products Found
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We couldn’t find any products matching your criteria. Check back soon for updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({
  priceRange,
  setPriceRange,
  categories,
  selectedCategories,
  setSelectedCategories,
  minRating,
  setMinRating,
  sortOption,
  setSortOption,
  applyFilters,
  resetFilters,
}: {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}) => {
  return (
    <div className="w-[280px] h-[1000px] bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky -top-20">
      <h3 className="text-base font-semibold mb-4">Filter Products</h3>
      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
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
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="space-y-2">
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
                <label htmlFor={cat} className="text-xs text-gray-600">
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
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
          <div className="text-xs text-gray-600 mt-1">
            {minRating} ★ and above
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default" className="text-xs">Default</SelectItem>
              <SelectItem value="price-asc" className="text-xs">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="text-xs">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc" className="text-xs">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply and Reset Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={applyFilters}
            className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-xs py-2"
          >
            Apply
          </Button>
          <Button onClick={resetFilters} className="w-full text-xs py-2">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main ProductPage Component
const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
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
      const price = parseFloat(product.variants[0].price.$numberDecimal || "0");
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product?.category_id?.name)
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
          parseFloat(a.variants[0].price.$numberDecimal || "0") -
          parseFloat(b.variants[0].price.$numberDecimal || "0")
      );
    } else if (sortOption === "price-desc") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.variants[0].price.$numberDecimal || "0") -
          parseFloat(a.variants[0].price.$numberDecimal || "0")
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
            className="w-32 h-32 mx-auto mb-4 animate-pulse"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something Went Wrong
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              minRating={minRating}
              setMinRating={setMinRating}
              sortOption={sortOption}
              setSortOption={setSortOption}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Floating Filter Button for Mobile */}
            <div className="lg:hidden fixed top-20 right-6 z-50">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="rounded-full bg-[#7A6E18] hover:bg-[#7A6E18] text-white p-4 shadow-lg transform hover:scale-105 transition-transform">
                    <FilterIcon className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[90%] sm:w-[300px] max-w-[300px] overflow-y-auto">
                  <h3 className="text-base font-semibold mb-4">Filter Products</h3>
                  <div className="space-y-6">
                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <Slider
                        min={0}
                        max={10000}
                        step={10}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Categories
                      </label>
                      <div className="space-y-2">
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
                            <label htmlFor={cat} className="text-xs text-gray-600">
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
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
                      <div className="text-xs text-gray-600 mt-1">
                        {minRating} ★ and above
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-full text-xs">
                          <SelectValue placeholder="Select sorting option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default" className="text-xs">Default</SelectItem>
                          <SelectItem value="price-asc" className="text-xs">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc" className="text-xs">Price: High to Low</SelectItem>
                          <SelectItem value="rating-desc" className="text-xs">Rating: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Apply and Reset Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={applyFilters}
                        className="w-full bg-[#7A6E18] hover:bg-[#7A6E18] text-xs py-2"
                      >
                        Apply
                      </Button>
                      <Button onClick={resetFilters} className="w-full text-xs py-2">
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
        </div>
      </div>
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
      <ProductPage />
    </Suspense>
  );
}