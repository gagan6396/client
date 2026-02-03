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
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f5f7f0] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] mb-4">
              Our Blogs and Articles
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, Tips, and Stories from the World of Organic Farming
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border border-gray-100"
              >
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4"></div>
                <div className="flex gap-2 mb-3">
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f5f7f0] to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#e8eed8] to-[#d4e0b5] flex items-center justify-center">
              <span className="text-5xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#3c4e1b] shadow-lg"
            >
              Retry Loading Blogs
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#f5f7f0] to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] mb-4">
            Our Blogs and Articles
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, Tips, and Stories from the World of Organic Farming
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#3c4e1b] hover:shadow-md"
              } focus:outline-none focus:ring-2 focus:ring-[#3c4e1b]/50`}
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
              <div key={category} className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#3c4e1b] to-[#5a7530] rounded-full mr-4"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                    {category.replace("-", " ")}
                  </h3>
                  <span className="ml-4 px-3 py-1 bg-[#e8eed8] text-[#3c4e1b] text-sm font-medium rounded-full">
                    {groupedBlogs[category].length} {groupedBlogs[category].length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedBlogs[category].map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-3 h-8 bg-gradient-to-b from-[#3c4e1b] to-[#5a7530] rounded-full mr-4"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                  {selectedCategory.replace("-", " ")}
                </h3>
                <span className="ml-4 px-3 py-1 bg-[#e8eed8] text-[#3c4e1b] text-sm font-medium rounded-full">
                  {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory("all")}
                className="flex items-center text-sm text-gray-600 hover:text-[#3c4e1b] transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to all
              </button>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#e8eed8] flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">
                      No blogs found
                    </h4>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any blogs in this category.
                    </p>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="px-6 py-2.5 bg-[#e8eed8] text-[#3c4e1b] font-medium rounded-full hover:bg-[#d4e0b5] transition-all border border-[#d4e0b5]"
                    >
                      Browse all categories
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-white to-[#f5f7f0] rounded-2xl p-8 md:p-12 border border-[#d4e0b5] shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Stay Updated with Our Latest Blogs
            </h3>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter and get the latest articles delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3c4e1b]/50 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate Blog Card Component
const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Blog Image */}
      <div className="relative h-56 overflow-hidden">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#e8eed8] to-[#d4e0b5] flex items-center justify-center">
            <span className="text-5xl text-[#5a7530]">🌱</span>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Pinned Badge */}
        {blog.isPinned && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            📌 Featured
          </div>
        )}
      </div>
      
      {/* Blog Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1.5 bg-[#e8eed8] text-[#3c4e1b] text-xs font-semibold rounded-full">
            {blog.category?.replace("-", " ") || "Uncategorized"}
          </span>
        </div>
        
        {/* Title */}
        <h4 className="font-bold text-xl text-gray-800 line-clamp-2 mb-3 group-hover:text-[#3c4e1b] transition-colors duration-300">
          {blog.title}
        </h4>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-[#f5f7f0] to-[#e8eed8] text-[#3c4e1b] px-2.5 py-1 rounded-full font-medium border border-[#d4e0b5]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Read More Link */}
        <div className="pt-4 border-t border-gray-100">
          <a
            href={`/blogs/${blog._id}`}
            className="inline-flex items-center text-[#3c4e1b] font-semibold hover:text-[#2a3713] transition-colors duration-300 group/link"
          >
            Read Full Article
            <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;