"use client";
import { Button } from "@/components/ui/button";
import Product1Image from "@/public/product-1.png";
import Product2Image from "@/public/product-2.png";
import Product3Image from "@/public/product-3.png";
import Product4Image from "@/public/product-4.png";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type CartItemProps = {
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
};

const AddToCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([
    {
      id: 1,
      imageSrc: Product1Image.src,
      title: "Mixed Sweets",
      price: 118.75,
      quantity: 2,
    },
    {
      id: 2,
      imageSrc: Product2Image.src,
      title: "Gir Cow Pure Vedic Ghee 500 ml",
      price: 599.0,
      quantity: 1,
    },
    {
      id: 3,
      imageSrc: Product3Image.src,
      title: "Buransh Tea 30 gms",
      price: 225.0,
      quantity: 3,
    },
    {
      id: 4,
      imageSrc: Product4Image.src,
      title: "Rotana 500 gms",
      price: 150.0,
      quantity: 1,
    },
  ]);

  // Update quantity of an item
  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

      {/* Cart Items */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white border rounded-lg shadow-lg p-4 gap-4"
          >
            {/* Image */}
            <div className="w-24 h-24 relative">
              <Image
                src={item.imageSrc}
                alt={item.title}
                layout="fill"
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
                  className="text-gray-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border rounded">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="text-gray-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:scale-110 transition-all"
              aria-label="Remove item"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500">
            Your cart is empty. Start shopping now!
          </p>
        </div>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
            Cart Summary
          </h2>
          <div className="flex justify-between mt-4">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-gray-800 font-bold">₹{calculateTotal()}</span>
          </div>
          <div className="mt-6">
            <Button className="bg-[#2B0504] text-white w-full hover:bg-[#3C0606] transition">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
