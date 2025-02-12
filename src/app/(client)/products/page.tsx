"use client";
import { getProductByCategoryAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { ProductCard } from "@/Layout/ProductCategoryGrid";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const ProductGrid = ({ products }: { products: any[] }) => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.length > 0 &&
        products.map((product, index) => {
          if (!product?.images || product.images.length === 0) {
            console.warn(`Product at index ${index} has no images`, product);
            return null;
          }

          return (
            <div
              key={index}
              className="embla__slide rounded-xl p-4 my-3 relative min-w-[80%] sm:min-w-[50%] md:min-w-[33%] lg:min-w-[25%]"
            >
              <ProductCard
                skuParameters={product.skuParameters}
                imageSrc={product.images[0]}
                title={product.name}
                price={product.price?.$numberDecimal || "N/A"}
                originalPrice={(product.price?.$numberDecimal ?? 0) + 10}
                isBestSeller={true}
                productId={product._id}
              />
            </div>
          );
        })}
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (category) {
          const response = await getProductByCategoryAPI(category);
          console.log("API Response:", response.data); // Check structure
          setProducts(response.data.data);
        } else {
          const ProductsResponse = await getProductsAPI();
          console.log(ProductsResponse);
          setProducts(ProductsResponse.data.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchCategories();
  }, [category]);

  useEffect(() => {
    if (emblaApi) emblaApi.on("init", () => autoplay.current?.play());
  }, [emblaApi]);

  return (
    <div>
      {/* Carousel Section */}
      <section className="my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Discover Our Organic Products
        </h2>
        <div ref={emblaRef} className="embla w-11/12 mx-auto">
          <div className="embla__container flex gap-4">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Top Products
        </h2>
        <ProductGrid products={products} />
      </section>

      {/* Popular Products Section */}
      <section className="my-12 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Popular Products
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductPage />
    </Suspense>
  );
}
