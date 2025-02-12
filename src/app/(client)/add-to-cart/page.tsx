"use client";
import {
  deleteToCartAPI,
  getAddTOCartProductsAPI,
  updateToCartAPI,
} from "@/apis/addToCartAPIs";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // For error handling (install react-toastify if not already installed)

type CartItemProps = {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
};

const AddToCartPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null); // Track which item is being updated
  const navigate = useRouter();
  // Fetch all cart products
  const getAllCartProducts = async () => {
    setLoading(true);
    try {
      const response = await getAddTOCartProductsAPI();
      console.log("Get All Cart Products", response.data);

      // Map the API response to the CartItemProps type
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
    if (updatingItemId === productId) return; // Prevent duplicate updates
    setUpdatingItemId(productId);

    try {
      const item = cartItems.find((item) => item.id === productId);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + amount); // Ensure quantity is at least 1
      await updateToCartAPI({ productId, quantity: newQuantity });

      // Refresh cart items after successful update
      await getAllCartProducts();
      toast.success("Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Remove an item from the cart
  const removeItem = async (productId: string) => {
    if (updatingItemId === productId) return; // Prevent duplicate deletions
    setUpdatingItemId(productId);

    try {
      await deleteToCartAPI(productId);

      // Refresh cart items after successful deletion
      await getAllCartProducts();
      toast.success("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Please try again.");
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
    <div className="container mx-auto py-7 p-3">
      <h1 className="text-2xl md:text-4xl font-bold text-center">Your Cart</h1>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          {/* Cart Items */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white border rounded-lg shadow-lg p-4 gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 relative">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="rounded-lg object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-green-600 font-bold">
                    ₹{item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={
                        updatingItemId === item.id || item.quantity <= 1
                      }
                      className="text-gray-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={updatingItemId === item.id}
                      className="text-gray-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={updatingItemId === item.id}
                  className="text-red-600 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Remove item"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Empty Cart Message */}
          {cartItems.length === 0 && !loading && (
            <div className="text-center mt-10">
              <p className="text-gray-500">
                Your cart is empty. Start shopping now!
              </p>
            </div>
          )}
        </div>
        <div>
          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
                Cart Summary
              </h2>
              <div className="flex justify-between mt-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800 font-bold">
                  ₹{calculateTotal()}
                </span>
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => navigate.push("/checkout")}
                  className="bg-[#2B0504] text-white w-full hover:bg-[#3C0606] transition"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddToCartPage;
