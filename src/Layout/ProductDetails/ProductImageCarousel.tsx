// components/ProductImageCarousel.tsx
"use client";

import { Product } from "@/types";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface ProductImageCarouselProps {
  product: Product;
}

const ProductImageCarousel = ({ product }: ProductImageCarouselProps) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(
    product.video || (product.images[0]?.url ?? null)
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (media: string) => {
    setSelectedMedia(media);
    setIsZoomed(false); // Reset zoom when switching media
  };

  const toggleZoom = () => {
    if (!selectedMedia || selectedMedia === product.video) return; // Disable zoom for video
    setIsZoomed(!isZoomed);
  };

  // Combine video (if present) and images into a single array for thumbnails
  const mediaItems = product.video
    ? [product.video, ...product.images.map((img) => img.url)]
    : product.images.map((img) => img.url);

  return (
    <div className="w-full">
      {mediaItems.length > 0 ? (
        <>
          {/* Main Media Display */}
          <div className="relative flex justify-center mb-6">
            {selectedMedia === product.video ? (
              <video
                src={selectedMedia || ""}
                className="rounded-lg object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-auto"
                controls
                playsInline
                title={`${product.name} Video`}
              />
            ) : (
              <Zoom>
                <img
                  src={selectedMedia || ""}
                  width={500}
                  height={500}
                  alt="Main Product Image"
                  className="rounded-lg object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-auto cursor-zoom-in"
                />
              </Zoom>
            )}
            {/* {isZoomed && selectedMedia !== product.video && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button
                  className="text-white text-sm md:text-lg bg-black bg-opacity-75 px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-opacity-90 transition-all"
                  onClick={toggleZoom}
                >
                  Zoom Out
                </button>
              </div>
            )} */}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {mediaItems.map((media: string, index: number) => {
              const isSelected = selectedMedia === media;

              return (
                <div
                  key={index}
                  className={`cursor-pointer p-1 rounded-xl transition-transform transform hover:scale-105 ${
                    isSelected ? "bg-green-100 shadow-md" : ""
                  }`}
                  onClick={() => handleThumbnailClick(media)}
                >
                  {media === product.video ? (
                    <video
                      src={media}
                      muted
                      playsInline
                      className={`h-12 sm:h-16 md:h-20 lg:h-24 w-full object-cover rounded-lg transition-all ${
                        isSelected
                          ? "ring-4 ring-green-500"
                          : "ring-1 ring-gray-300"
                      }`}
                    />
                  ) : (
                    <img
                      src={media}
                      width={100}
                      height={100}
                      alt={`Product Thumbnail ${index + 1}`}
                      className={`h-12 sm:h-16 md:h-20 lg:h-24 w-full object-cover rounded-lg transition-all ${
                        isSelected
                          ? "ring-4 ring-green-500"
                          : "ring-1 ring-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 rounded-lg">
          <p className="text-gray-500">No media available</p>
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
