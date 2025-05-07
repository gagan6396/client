"use client";

import {
  deleteToCartAPI,
  getAddToCartProductsAPI,
  updateToCartAPI,
} from "@/apis/addToCartAPIs";
import { calculateShippingChargesAPI } from "@/apis/orderAPIs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type CartItemProps = {
  productId: string;
  variantId: string;
  imageSrc: string;
  title: string;
  price: string;
  quantity: number;
  variantName: string;
  brand: string;
  discount?: {
    type?: string;
    value?: number;
    active: boolean;
    startDate?: string;
    endDate?: string;
  };
  onQuantityChange: (amount: number) => void;
  onRemove: () => void;
  isUpdating: boolean;
};

interface ShippingOption {
  courierName: string;
  rate: number;
  estimatedDeliveryDays: number;
}

const CartItem: React.FC<CartItemProps> = ({
  productId,
  variantId,
  imageSrc,
  title,
  price,
  quantity,
  variantName,
  brand,
  discount,
  onQuantityChange,
  onRemove,
  isUpdating,
}) => {
  const numericPrice = parseFloat(price);
  const discountedPrice =
    discount?.active && discount?.value
      ? numericPrice * (1 - discount.value / 100)
      : numericPrice;

  return (
    <div className="group flex bg-white rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{variantName}</p>
          <p className="text-sm text-gray-600">Brand: {brand}</p>
          <div className="flex items-center gap-2 mt-1">
            {discount?.active && discount?.value ? (
              <>
                <p className="text-green-600 font-bold text-sm md:text-base">
                  ₹{discountedPrice.toFixed(2)}
                </p>
                <p className="text-gray-500 line-through text-xs md:text-sm">
                  ₹{numericPrice.toFixed(2)}
                </p>
                <span className="text-xs text-red-500">
                  ({discount.value}% OFF)
                </span>
              </>
            ) : (
              <p className="text-green-600 font-bold text-sm md:text-base">
                ₹{numericPrice.toFixed(2)}
              </p>
            )}
          </div>
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
  const [postalCode, setPostalCode] = useState<string>("");
  const [selectedCourier, setSelectedCourier] = useState<ShippingOption | null>(
    null
  );
  const router = useRouter();

  const getAllCartProducts = async () => {
    setLoading(true);
    try {
      const response = await getAddToCartProductsAPI();
      const mappedItems = response.data.data.products.map((item: any) => ({
        productId: item.productId,
        variantId: item.variantId,
        imageSrc:
          item.productDetails.images.find((img: any) => img.sequence === 0)
            ?.url || "/placeholder-image.jpg",
        title: item.productDetails.name,
        price: item.productDetails.variant?.price?.$numberDecimal || "0",
        quantity: item.quantity,
        variantName: item.productDetails.variant?.name || "Default",
        brand: item.productDetails.brand,
        discount: item.productDetails.variant?.discount || { active: false },
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

  const updateQuantity = async (
    productId: string,
    variantId: string,
    amount: number
  ) => {
    const itemKey = `${productId}-${variantId}`;
    if (updatingItemId === itemKey) return;
    setUpdatingItemId(itemKey);

    try {
      const item = cartItems.find(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + amount);
      await updateToCartAPI({ productId, variantId, quantity: newQuantity });
      await getAllCartProducts();
      toast.success("Quantity updated!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const removeItem = async (productId: string, variantId: string) => {
    const itemKey = `${productId}-${variantId}`;
    if (updatingItemId === itemKey) return;
    setUpdatingItemId(itemKey);

    try {
      await deleteToCartAPI({ productId, variantId });
      await getAllCartProducts();
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => {
        const numericPrice = parseFloat(item.price);
        const discountedPrice =
          item.discount?.active && item.discount?.value
            ? numericPrice * (1 - item.discount.value / 100)
            : numericPrice;
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) + (selectedCourier?.rate || 0)
    ).toFixed(2);
  };

  useEffect(() => {
    const fetchShippingCharges = async () => {
      if (!postalCode.match(/^\d{6}$/) || !cartItems.length) return;

      try {
        const products = cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));
        const response = await calculateShippingChargesAPI(
          postalCode,
          products,
          0
        );
        const { shippingOptions } = response.data;

        const parsedOptions = shippingOptions.map((option: any) => ({
          ...option,
          estimatedDeliveryDays: parseInt(option.estimatedDeliveryDays, 10),
        }));

        const cheapestOption = parsedOptions.reduce(
          (min: ShippingOption, option: ShippingOption) =>
            option.rate < min.rate ? option : min,
          parsedOptions[0]
        );
        setSelectedCourier(cheapestOption);
      } catch (error) {
        console.error("Error fetching shipping charges:", error);
        toast.error("Failed to calculate shipping charges");
      }
    };

    fetchShippingCharges();
  }, [postalCode, cartItems]);

  return (
    <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-10 md:mb-14 tracking-tight">
        Your Cart
      </h1>
      <div className="mb-6">
        <Label htmlFor="postalCode">Postal Code (for delivery check)</Label>
        <Input
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter 6-digit postal code"
          className="max-w-xs"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
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
                  key={`${item.productId}-${item.variantId}`}
                  {...item}
                  onQuantityChange={(amount) =>
                    updateQuantity(item.productId, item.variantId, amount)
                  }
                  onRemove={() => removeItem(item.productId, item.variantId)}
                  isUpdating={
                    updatingItemId === `${item.productId}-${item.variantId}`
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center mt-12 md:mt-16">
              <ShoppingBag
                size={80}
                className="text-gray-200 mx-auto mb-6 animate-bounce"
              />
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
        {cartItems.length > 0 && !loading && (
          <div className="mt-8 lg:mt-0 p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
              Cart Summary
            </h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-base md:text-lg">
                Subtotal:
              </span>
              <span className="text-green-600 font-bold text-lg md:text-xl">
                ₹{calculateSubtotal()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-base md:text-lg">
                Shipping ({selectedCourier?.courierName || "Not selected"}):
              </span>
              <span className="text-green-600 font-bold text-lg md:text-xl">
                ₹{(selectedCourier?.rate || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-base md:text-lg">Total:</span>
              <span className="text-green-600 font-bold text-lg md:text-xl">
                ₹{calculateTotal()}
              </span>
            </div>
            {selectedCourier && (
              <div className="mb-4">
                <span className="text-gray-600 text-base md:text-lg">
                  Estimated Delivery: {selectedCourier.estimatedDeliveryDays}{" "}
                  days
                </span>
              </div>
            )}
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