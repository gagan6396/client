import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface ProductDetailsProps {
  product: Product;
  addToCart: () => void;
  buyNow: () => void;
  addToWishList: () => void;
  deleteProductFromWishlist: () => void;
  subCategoryProducts: Product[];
}

const ProductDetails = ({
  product,
  addToCart,
  buyNow,
  addToWishList,
  deleteProductFromWishlist,
  subCategoryProducts,
}: ProductDetailsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 sm:space-y-6">
      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Price and Stock Status */}
      <div className="flex items-center gap-3 sm:gap-4">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600">
          ₹{product.price?.$numberDecimal || "N/A"}
        </p>
        <Badge
          variant="outline"
          className={`text-xs sm:text-sm ${
            product.stock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      {/* Product Description */}
      <div
        className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed line-clamp-1 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      {/* Related Products (Subcategory Products) */}
      {subCategoryProducts.length > 0 && (
        <div className="mt-4 sm:mt-6">
          {/* <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Related Products
          </h2> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {subCategoryProducts.slice(0, 6).map((item) => (
              <div
                key={item._id}
                className="cursor-pointer border rounded-lg p-2 sm:p-3 hover:shadow-md transition-shadow"
                onClick={() => router.push(`/products/${item._id}`)}
              >
                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  ₹{item.price?.$numberDecimal || "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm md:text-base transition-transform transform hover:scale-105 rounded-full shadow-lg"
          onClick={addToCart}
          disabled={product.inCart}
        >
          <AiOutlineShoppingCart className="mr-1 sm:mr-2" />
          {product.inCart ? "Added to Cart" : "Add to Cart"}
        </Button>
        <Button
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base transition-transform transform hover:scale-105 rounded-full shadow-lg"
          onClick={buyNow}
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base transition-transform transform hover:scale-105 rounded-full shadow-lg"
          onClick={
            product.inWishlist ? deleteProductFromWishlist : addToWishList
          }
        >
          {product.inWishlist ? (
            <FaHeart className="mr-1 sm:mr-2 text-red-600" />
          ) : (
            <CiHeart className="mr-1 sm:mr-2 text-gray-400 hover:text-red-600" />
          )}
          {product.inWishlist ? "In Wishlist" : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;