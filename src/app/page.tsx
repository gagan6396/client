import { CarouselPlugin } from "@/Layout/HeroCarousel";
import ProductCategoryGrid from "@/Layout/ProductCategoryGrid";
import { ReelsCarousel } from "@/Layout/ReelsCarousel";
import ProductCategories from "@/Layout/ProductCategories";
import FAQs from "@/Layout/FAQs";
import Testimonials from "@/Layout/Testimonials";

export default function Home() {
  return (
    <div>
      <CarouselPlugin />
      <ProductCategories />
      <ProductCategoryGrid />
      <ReelsCarousel />
      <Testimonials />
      <FAQs />
    </div>
  );
}
