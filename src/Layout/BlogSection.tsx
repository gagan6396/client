"use client";
import { getAllBlogsAPI } from "@/apis/blogAPIs";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  sequence?: number;
  isPinned?: boolean;
  isHidden?: boolean;
  tags?: string[];
}

const BlogSection: FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllBlogsAPI();
        const fetchedBlogs = response.data.data;
        setBlogs(fetchedBlogs.filter((blog: Blog) => !blog.isHidden));
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Group blogs by category
  const groupedBlogs = blogs.reduce((acc, blog) => {
    const category = blog.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(blog);
    return acc;
  }, {} as Record<string, Blog[]>);

  // Get unique categories for filter
  const categories = ["all", ...Object.keys(groupedBlogs).sort()];

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === "all" 
    ? blogs 
    : groupedBlogs[selectedCategory] || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-4xl font-bold text-center text-[#7A6E18] mb-6">
          Our Blogs and Articles
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg">
          Insights, Tips, and Stories from the World of Organic Farming
        </p>
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-5 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-4xl font-bold text-center text-[#7A6E18] mb-6">
          Our Blogs and Articles
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg">
          Insights, Tips, and Stories from the World of Organic Farming
        </p>
        <div className="text-center">
          <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#7A6E18] text-white rounded-full hover:bg-[#6A5E15] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#7A6E18]"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-[#7A6E18] mb-6">
        Our Blogs and Articles
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg">
        Insights, Tips, and Stories from the World of Organic Farming
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? "bg-[#7A6E18] text-white shadow-md"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-[#7A6E18]`}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${category === "all" ? "All Categories" : category.replace("-", " ")}`}
          >
            {category === "all" ? "All" : category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Blog Sections */}
      {selectedCategory === "all" ? (
        Object.keys(groupedBlogs)
          .sort()
          .map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold text-center text-[#7A6E18] mb-8 capitalize">
                {category.replace("-", " ")}
              </h3>
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {groupedBlogs[category].map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  >
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                        width={300}
                        height={200}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags?.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-xl text-gray-800 line-clamp-2 mb-3">
                        {blog.title}
                      </h4>
                      <a
                        href={`/blogs/${blog._id}`}
                        className="text-[#7A6E18] font-medium hover:underline transition-colors duration-200"
                        aria-label={`Read more about ${blog.title}`}
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      ) : (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center text-[#7A6E18] mb-8 capitalize">
            {selectedCategory.replace("-", " ")}
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {blog.imageUrl ? (
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-56 object-cover rounded-t-xl"
                      width={300}
                      height={200}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags?.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold text-xl text-gray-800 line-clamp-2 mb-3">
                      {blog.title}
                    </h4>
                    <a
                      href={`/blogs/${blog._id}`}
                      className="text-[#7A6E18] font-medium hover:underline transition-colors duration-200"
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full text-lg">
                No blogs found in this category.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;