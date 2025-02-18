import FAQs from "@/Layout/FAQs";
import { CarouselPlugin } from "@/Layout/HeroCarousel";
import HeroSection from "@/Layout/HeroSection";
import ProductCategories from "@/Layout/ProductCategories";
import ProductCategoryGrid from "@/Layout/ProductCategoryGrid";
import { ReelsCarousel } from "@/Layout/ReelsCarousel";
import Testimonials from "@/Layout/Testimonials";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <CarouselPlugin />
      <ProductCategories />
      <ProductCategoryGrid />
      <ReelsCarousel />
      <Testimonials />
      <FAQs />
    </div>
  );
}
