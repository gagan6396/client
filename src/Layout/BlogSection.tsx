"use client";
import { getAllBlogsAPI } from "@/apis/blogAPIs";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

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
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllBlogsAPI();
        const fetchedBlogs = response.data.data; // Adjust based on your API response structure
        setBlogs(fetchedBlogs.filter((blog: Blog) => !blog.isHidden)); // Exclude hidden blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Our Blogs and Articles
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Insights, Tips, and Stories from the World of Organic Farming
        </p>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Our Blogs and Articles
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Insights, Tips, and Stories from the World of Organic Farming
        </p>
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Our Blogs and Articles
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Insights, Tips, and Stories from the World of Organic Farming
      </p>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex space-x-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="embla__slide min-w-[calc(100%/1.25)] sm:min-w-[calc(100%/2)] md:min-w-[calc(100%/3)] lg:min-w-[calc(100%/4)] px-4"
            >
              <div className="bg-white rounded-md shadow-md overflow-hidden border h-full">
                {blog.imageUrl ? (
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                    width={300}
                    height={200}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {blog.title}
                  </h3>
                  <a
                    href={`/blogs/${blog._id}`} // Assuming a blog detail page route
                    className="text-green-700 font-medium mt-2 block"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;