import { NextPage } from "next";
import BlogSection from "@/Layout/BlogSection";
import BlogCategorySection from "@/Layout/BlogCategorySection";
import PopularArticlesSection from "@/Layout/PopularArticlesSection";

const page = () => {
  return (
    <div>
      <BlogSection />
      <BlogCategorySection />
      <PopularArticlesSection />
    </div>
  )
}

export default page


