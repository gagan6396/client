"use client"
import category1 from "@/public/category1.png";
import category2 from "@/public/category2.png";
import category3 from "@/public/category3.png";
import category4 from "@/public/category4.png";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { FC, useRef } from "react";

interface Category {
  title: string;
  description: string;
  imageUrl: any; // Use 'any' or 'StaticImageData' from Next.js for type safety
}

const categories: Category[] = [
  {
    title: "Sustainability Practices",
    description: "Learn about eco-friendly farming techniques.",
    imageUrl: category1, // Directly use the imported image
  },
  {
    title: "Healthy Living",
    description: "Discover how organic products improve your well-being.",
    imageUrl: category2,
  },
  {
    title: "Farmer Stories",
    description: "Meet the people behind our organic produce.",
    imageUrl: category3,
  },
  {
    title: "Recipe Corners",
    description: "Delicious recipes using fresh organic ingredients.",
    imageUrl: category4,
  },
];

const BlogCategorySection: FC = () => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Blog Categories
      </h2>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex space-x-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="embla__slide min-w-[calc(100%/1.25)] sm:min-w-[calc(100%/2)] md:min-w-[calc(100%/3)] lg:min-w-[calc(100%/4)] px-4"
            >
              <div className="bg-white rounded-md shadow-md overflow-hidden border h-full">
                {/* Use the Next.js Image component for optimized image rendering */}
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                  width={300} // Specify dimensions for optimization
                  height={200}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategorySection;
