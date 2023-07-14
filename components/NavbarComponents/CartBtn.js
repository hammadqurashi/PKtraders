"use client";
import React, { useContext } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";

const CartBtn = () => {
  // useContext hook
  const context = useContext(cartContext);

  // desturcturing context
  const { cart } = context;

  return (
    <Link
      href="/cart"
      className="hidden md:flex h-12 w-12 md:h-24 md:w-24 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground active:bg-gray-200 "
    >
      {/* Showing Cart Length */}
      {cart && Object.keys(cart).length > 0 && (
        <div className="relative">
          <div className="flex items-center justify-center absolute top-0 min-w-[18px] min-h-[18px] bg-[#ed1c24] rounded-full">
            <span className="text-xs text-white">
              {Object.keys(cart).length}
            </span>
          </div>
        </div>
      )}
      {/* End Cart Length */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 dark:text-dark-primaryText"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="hidden text-xs font-semibold text-gray-500 dark:text-dark-primaryText sm:block">
        Cart
      </span>
    </Link>
  );
};

export default CartBtn;
