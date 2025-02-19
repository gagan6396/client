import { Product } from "@/types";
import { useState } from "react";

interface ProductImageCarouselProps {
  product: Product;
}

const ProductImageCarousel = ({ product }: ProductImageCarouselProps) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || "");
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="w-full">
      {product.images.length ? (
        <>
          <div className="relative flex justify-center mb-6">
            <img
              src={selectedImage}
              width={500}
              height={500}
              alt="Main Product Image"
              className={`rounded-lg object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-auto cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? "scale-150 transform origin-center" : ""
              }`}
              onClick={toggleZoom}
            />
            {isZoomed && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button
                  className="text-white text-sm md:text-lg bg-black bg-opacity-75 px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-opacity-90 transition-all"
                  onClick={toggleZoom}
                >
                  Zoom Out
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {product.images.map((image: any, index: number) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:border-green-600 ${
                  selectedImage === image
                    ? "border-green-600"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(image)}
              >
                <img
                  src={image}
                  width={100}
                  height={100}
                  alt={`Product Thumbnail ${index + 1}`}
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-full object-contain hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 rounded-lg">
          <p className="text-gray-500">No images available</p>
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
