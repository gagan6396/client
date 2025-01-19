import FAQs from "@/Layout/FAQs";
import { CarouselPlugin } from "@/Layout/HeroCarousel";
import ProductCategories from "@/Layout/ProductCategories";
import ProductCategoryGrid from "@/Layout/ProductCategoryGrid";
import { ReelsCarousel } from "@/Layout/ReelsCarousel";
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
