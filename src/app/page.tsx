import { CarouselPlugin } from "@/Layout/HeroCarousel";
import ProductCategoryGrid from "@/Layout/ProductCategoryGrid";
import { ReelsCarousel } from "@/Layout/ReelsCarousel";

export default function Home() {
  return (
    <div>
      <CarouselPlugin />
      <ReelsCarousel />
      <ProductCategoryGrid />
    </div>
  );
}
