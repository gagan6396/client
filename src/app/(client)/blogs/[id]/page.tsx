"use client";
import { getBlogByIdAPI } from "@/apis/blogAPIs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  content: string; // This will now be treated as HTML
  category: string;
  imageUrl?: string;
  sequence?: number;
  isPinned?: boolean;
  isHidden?: boolean;
  tags?: string[];
  createdAt?: string;
}

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resolvedParams = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setError(null);

      const id = resolvedParams?.id as string;

      if (!id) {
        setError("Invalid blog ID");
        setIsLoading(false);
        return;
      }

      try {
        const response = await getBlogByIdAPI({ id });
        setBlog(response.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [resolvedParams]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error || "Blog Not Found"}
          </h2>
          <p className="text-gray-600">
            {error
              ? "Something went wrong while fetching the blog."
              : "The blog you are looking for does not exist."}
          </p>
          <Link
            href="/blogs"
            className="mt-4 inline-block text-green-700 font-medium underline"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <article className="max-w-3xl mx-auto">
        {/* Blog Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        {blog.createdAt && (
          <p className="text-sm text-gray-500 mb-6">
            Published on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {/* Blog Image */}
        {blog.imageUrl ? (
          <div className="relative w-full h-64 md:h-96 mb-6">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center mb-6 rounded-md">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Blog Content with dangerouslySetInnerHTML */}
        <div
          className="prose prose-lg text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Blog Meta */}
        <div className="mt-8">
          {blog.category && (
            <p className="text-sm text-gray-600">
              Category: <span className="font-medium">{blog.category}</span>
            </p>
          )}
          {blog.tags && blog.tags.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Tags:{" "}
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-700 mr-2"
                >
                  {tag}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Back Button */}
        <Link
          href="/blogs"
          className="mt-8 inline-block text-green-700 font-medium underline"
        >
          Back to Blogs
        </Link>
      </article>
    </div>
  );
};

export default BlogDetailPage;
