"use client";
import {
  deleteToCartAPI,
  getAddTOCartProductsAPI,
  updateToCartAPI,
} from "@/apis/addToCartAPIs";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type CartItemProps = {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
  onQuantityChange: (amount: number) => void;
  onRemove: () => void;
  isUpdating: boolean;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  imageSrc,
  title,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  isUpdating,
}) => {
  return (
    <div className="group flex bg-white rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-green-600 font-bold text-sm md:text-base mt-1">
            ₹{price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange(-1)}
              disabled={isUpdating || quantity <= 1}
              className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base font-medium border border-gray-200 rounded bg-gray-50">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(1)}
              disabled={isUpdating}
              className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={onRemove}
            disabled={isUpdating}
            className="text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove item"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AddToCartPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all cart products
  const getAllCartProducts = async () => {
    setLoading(true);
    try {
      const response = await getAddTOCartProductsAPI();
      const mappedItems = response.data.data.products.map((item: any) => ({
        id: item.productId._id,
        imageSrc: item.productId.images[0],
        title: item.productId.name,
        price: parseFloat(item.productId.price.$numberDecimal),
        quantity: item.quantity,
      }));
      setCartItems(mappedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCartProducts();
  }, []);

  // Update quantity of an item
  const updateQuantity = async (productId: string, amount: number) => {
    if (updatingItemId === productId) return;
    setUpdatingItemId(productId);

    try {
      const item = cartItems.find((item) => item.id === productId);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + amount);
      await updateToCartAPI({ productId, quantity: newQuantity });
      await getAllCartProducts();
      toast.success("Quantity updated!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Remove an item from the cart
  const removeItem = async (productId: string) => {
    if (updatingItemId === productId) return;
    setUpdatingItemId(productId);

    try {
      await deleteToCartAPI(productId);
      await getAllCartProducts();
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-10 md:mb-14 tracking-tight">
        Your Cart
      </h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex bg-white rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 items-center animate-pulse"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="flex gap-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-8 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onQuantityChange={(amount) => updateQuantity(item.id, amount)}
                  onRemove={() => removeItem(item.id)}
                  isUpdating={updatingItemId === item.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center mt-12 md:mt-16">
              <ShoppingBag size={80} className="text-gray-200 mx-auto mb-6 animate-bounce" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Your Cart is Empty
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-6">
                Looks like you haven’t added anything yet. Start shopping now!
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => router.push("/products")}
              >
                Browse Products
              </Button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && !loading && (
          <div className="mt-8 lg:mt-0 p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
              Cart Summary
            </h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-base md:text-lg">Subtotal:</span>
              <span className="text-green-600 font-bold text-lg md:text-xl">
                ₹{calculateTotal()}
              </span>
            </div>
            <Button
              onClick={() => router.push("/checkout")}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartPage;