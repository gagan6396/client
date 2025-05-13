import FAQs from "@/Layout/FAQs";
import ProductCategories from "@/Layout/ProductCategories";
import ProductCategoryGrid from "@/Layout/ProductCategoryGrid";
import Testimonials from "@/Layout/Testimonials";
import YouTubeShortsCarousel from "@/Layout/YouTubeShortsCarousel";
export default function Home() {
  return (
    <div>
      {/* <CarouselPlugin /> */}
      <ProductCategories />
      <ProductCategoryGrid />
      {/* <ReelsCarousel /> */}
      <YouTubeShortsCarousel />
      <Testimonials />
      <FAQs />
    </div>
  );
}
