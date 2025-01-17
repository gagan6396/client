import { FC } from "react";
import Image from "next/image";

import blog1 from "@/public/blog1.png";
import blog2 from "@/public/blog2.png";
import blog3 from "@/public/blog3.png";


interface Blog {
  title: string;
  description: string;
  imageUrl: any;
}

const blogs: Blog[] = [
  {
    title: "The Health Benefits of Organic Honey: Why You Should Make the Switch",
    description: "Read More",
    imageUrl: blog1,
  },
  {
    title: "Sustainability in Farming: How Gauraj is Making a Difference",
    description: "Read More",
    imageUrl: blog2,
  },
  {
    title: "5 Simple Ways to Use Organic Spices in Your Cooking",
    description: "Read More",
    imageUrl: blog3,
  },
];

const BlogSection: FC = () => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Our Blogs and Articles
      </h2>
      <p className="text-center text-gray-600 mb-8">
        "Insights, Tips, and Stories from the World of Organic Farming"
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md overflow-hidden border"
          >
            <Image
              src={blog.imageUrl} 
              alt={blog.title}
              className="w-full h-48 object-cover"
              width={300} 
              height={200} 
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{blog.title}</h3>
              <a href="#" className="text-green-700 font-medium mt-2 block">
                {blog.description}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
