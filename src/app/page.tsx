import FAQs from "@/Layout/FAQs";
import ProductCategories from "@/Layout/ProductCategories";
import ProductCategoryGrid from "@/Layout/ProductCategoryGrid";
import Testimonials from "@/Layout/Testimonials";
import YouTubeShortsCarousel from "@/Layout/YouTubeShortsCarousel";

export const metadata = {
  title: "Gauraaj (Gauraaj Valley Foods/Organic Pahadi Store)",
  description:
    "Gauraaj (Gauraaj Valley Foods/Organic Pahadi Store) is a brand that specializes in authentic Himalayan and organic mountain-grown products—delivered pan‑India. Their focus is on traditional, wholesome ingredients sourced directly from local Pahadi farmers",
  openGraph: {
    type: "website",
    url: "https://www.gauraaj.com/",
    title: "Gauraaj (Gauraaj Valley Foods/Organic Pahadi Store)",
    description:
      "Gauraaj (Gauraaj Valley Foods/Organic Pahadi Store) is a brand that specializes in authentic Himalayan and organic mountain-grown products—delivered pan‑India. Their focus is on traditional, wholesome ingredients sourced directly from local Pahadi farmers",
    images: [
      {
        url: "https://metatags.io/images/meta-tags.png",
        width: 1200,
        height: 630,
        alt: "Gauraaj Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gauraaj (Gauraaj Valley Foods/Organic Pahadi Store)",
    description:
      "Gauraaj (Gauraaj Valley Foods/Organic Pahadi Store) is a brand that specializes in authentic Himalayan and organic mountain-grown products—delivered pan‑India. Their focus is on traditional, wholesome ingredients sourced directly from local Pahadi farmers",
    images: ["https://metatags.io/images/meta-tags.png"],
  },
};
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
