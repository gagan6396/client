import React from "react";

type CategoryCardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageSrc,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

const ProductCategoryGrid: React.FC = () => {
  const categories = [
    {
      imageSrc: "https://via.placeholder.com/500x300?text=Category+1",
      title: "Category 1",
      description: "Description for Category 1",
    },
    {
      imageSrc: "https://via.placeholder.com/500x300?text=Category+2",
      title: "Category 2",
      description: "Description for Category 2",
    },
    {
      imageSrc: "https://via.placeholder.com/500x300?text=Category+3",
      title: "Category 3",
      description: "Description for Category 3",
    },
    {
      imageSrc: "https://via.placeholder.com/500x300?text=Category+4",
      title: "Category 4",
      description: "Description for Category 4",
    },
    {
      imageSrc: "https://via.placeholder.com/500x300?text=Category+5",
      title: "Category 5",
      description: "Description for Category 5",
    },
    {
      imageSrc: "https://via.placeholder.com/500x300?text=Category+6",
      title: "Category 6",
      description: "Description for Category 6",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {categories.map((category, index) => (
        <CategoryCard key={index} {...category} />
      ))}
    </div>
  );
};

export default ProductCategoryGrid;
