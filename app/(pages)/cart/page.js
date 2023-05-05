"use client";
import React, { useContext } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";

const Cart = () => {
  // useContext hook
  const context = useContext(cartContext);

  // desturcturing context
  const {
    user,
    logout,
    cart,
    subtotal,
    addToCart,
    removeFromCart,
    clearCart,
    addQuantity,
    subtractQuantity,
  } = context;

  // Calulating Shipping Fee
  const shippingFee = subtotal != 0 ? 100 : 0;
  return (
    <>
      <div className="bg-white dark:bg-dark-primaryBackground py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="mb-6 sm:mb-10 lg:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-dark-primaryText md:mb-6 lg:text-3xl">
              Your Cart
            </h2>
          </div>

          <div className="mb-5 flex flex-col sm:mb-8 sm:divide-y sm:border-t sm:border-b">
            {/* <!-- product - start --> */}
            {Object.keys(cart) != 0 ? (
              Object.keys(cart).map((k) => {
                return (
                  <div className="py-5 sm:py-8" key={k}>
                    <div className="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6">
                      <div className="sm:-my-2.5">
                        <div className="group relative block h-40 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-56 sm:w-40">
                          <img
                            src={cart[k].img}
                            loading="lazy"
                            alt="Photo by Thái An"
                            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="mb-1 inline-block text-lg font-bold text-gray-800 dark:text-dark-primaryText transition duration-100 lg:text-xl">
                            {cart[k].name}
                          </div>

                          <span className="block text-gray-500 dark:text-dark-primaryText">
                            Size: {cart[k].size}
                          </span>
                          <span className="block text-gray-500 dark:text-dark-primaryText">
                            Color: {cart[k].variant}
                          </span>
                        </div>

                        <div>
                          <span className="mb-1 block font-bold text-gray-800 md:text-lg dark:text-dark-primaryText">
                            Rs. {cart[k].price}
                          </span>
                        </div>
                      </div>

                      <div className="flex w-full justify-between border-t pt-4 sm:w-auto sm:border-none sm:pt-0">
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex h-12 w-20 overflow-hidden rounded border">
                            <div className="w-full px-4 py-2 outline-none transition duration-100">
                              {cart[k].qty}
                            </div>

                            <div className="flex flex-col divide-y border-l">
                              <button
                                onClick={() => {
                                  addQuantity(k);
                                }}
                                className="flex w-6 flex-1 select-none items-center justify-center bg-white dark:bg-dark-secondaryBackground leading-none transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground"
                              >
                                +
                              </button>
                              <button
                                onClick={() => {
                                  subtractQuantity(k);
                                }}
                                className="flex w-6 flex-1 select-none items-center justify-center bg-white dark:bg-dark-secondaryBackground leading-none transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground"
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(k)}
                            className="select-none text-sm font-semibold text-[#ed1c24] transition duration-100"
                          >
                            Delete
                          </button>
                        </div>

                        <div className="ml-4 pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                          <span className="block font-bold text-gray-800 dark:text-dark-primaryText md:text-lg">
                            Rs. {cart[k].price * cart[k].qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="my-4">There Are No Items In Cart</div>
            )}

            {/* <!-- product - end --> */}
          </div>

          {/* <!-- totals - start --> */}
          <div className="flex flex-col items-end gap-4">
            <div className="w-full rounded-lg bg-gray-100 dark:bg-dark-secondaryBackground p-4 sm:max-w-xs">
              <div className="space-y-1">
                <div className="flex justify-between gap-4 text-gray-500 dark:text-dark-primaryText">
                  <span>Subtotal</span>
                  <span>{subtotal}</span>
                </div>

                <div className="flex justify-between gap-4 text-gray-500 dark:text-dark-primaryText">
                  <span>Shipping</span>
                  <span>{shippingFee}</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-start justify-between gap-4 text-gray-800 dark:text-dark-primaryText">
                  <span className="text-lg font-bold">Total</span>

                  <span className="flex flex-col items-end">
                    <span className="text-lg font-bold">
                      Rs. {subtotal + shippingFee}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-dark-secondaryText">
                      including VAT
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {subtotal >= 1 && (
              <Link
                href="/checkout"
                className="inline-block rounded-lg bg-[#ed1c24] px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 focus-visible:ring md:text-base"
              >
                Check out
              </Link>
            )}
          </div>
          {/* <!-- totals - end --> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
