import { FC } from "react";
import Image from "next/image";

import blog1 from "@/public/blog1.png";
import blog2 from "@/public/blog2.png";
import blog3 from "@/public/blog3.png";

interface Article {
  title: string;
  description: string;
  imageUrl: any; // You can replace this with 'StaticImageData' for stricter typing
}

const articles: Article[] = [
  {
    title: "5 Benefits of Organic Farming for the Planet",
    description: "Read More",
    imageUrl: blog1,
  },
  {
    title: "Gauraj's Commitment to Zero Waste",
    description: "Read More",
    imageUrl: blog2,
  },
  {
    title: "How to Make the Perfect Organic Smoothie",
    description: "Read More",
    imageUrl: blog3,
  },
];

const PopularArticlesSection: FC = () => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Popular Articles
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md overflow-hidden border"
          >
            <Image
              src={article.imageUrl} // Corrected to use 'article'
              alt={article.title}
              className="w-full h-48 object-cover"
              width={300} // Replace with your preferred width
              height={200} // Replace with your preferred height
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {article.title}
              </h3>
              <a href="#" className="text-green-700 font-medium mt-2 block">
                {article.description}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularArticlesSection;
