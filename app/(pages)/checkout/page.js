"use client";
import React, { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import cartContext from "@/app/context/cart/cartContext";
import CheckoutForm from "./CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const context = useContext(cartContext);

  const {
    cart,
    subtotal,
    addToCart,
    removeFromCart,
    clearCart,
    addQuantity,
    subtractQuantity,
  } = context;

  const [clientSecret, setClientSecret] = useState("");

  const getCartItems = () => {
    let cookie = document.cookie.split(`; cart=`).pop().split(";").shift();
    let cart = JSON.parse(cookie);
    return cart;
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: getCartItems() }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#ed1c24",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  const shippingFee = subtotal != 0 ? 100 : 0;

  return (
    <>
      <div className="flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a
          href="#"
          className="text-2xl font-bold text-gray-800 dark:text-dark-primaryText"
        >
          Checkout
        </a>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Order Summary */}
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400 dark:text-dark-secondaryText">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white dark:bg-dark-primaryBackground px-2 py-4 sm:px-6">
            {Object.keys(cart).length != 0 &&
              Object.keys(cart).map((k) => {
                return (
                  <div className="flex flex-col rounded-lg sm:flex-row" key={k}>
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={cart[k].img}
                      alt={cart[k].name}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{cart[k].name}</span>
                      <span className="float-right text-gray-400 dark:text-dark-secondaryText">
                        {cart[k].size} - {cart[k].variant}
                      </span>
                      <span className="float-right text-gray-400 dark:text-dark-secondaryText">
                        {cart[k].qty}
                      </span>
                      <p className="text-lg font-bold">Rs. {cart[k].price}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mt-10 bg-gray-50 dark:bg-dark-secondaryBackground px-4 pt-8 lg:mt-0">
          {/* Shipping Methods */}
          <p className="text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="peer-checked:border-gray-700 dark:peer-checked:border-white absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-secondaryBackground"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-white peer-checked:bg-gray-50 dark:peer-checked:bg-black flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-700 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/en/3/33/TCS_Pakistan_logo.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">TCS Delivery</span>
                  <p className="text-slate-500 dark:text-dark-secondaryText text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="peer-checked:border-gray-700 dark:peer-checked:border-white absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-primaryBackground"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-white peer-checked:bg-gray-50 dark:peer-checked:bg-black flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-700 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="https://www.leopardscourier.com/logos/LCS-Main-Logo-300x128.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    Leopard Courier Delivery
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>

          {/* Payment Details */}

          <p className="mt-8 text-xl font-medium">Payment Details</p>
          <p className="text-gray-400 dark:text-dark-secondaryText">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            {/* Stripe Checkout Starts */}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
            {/* Stripe Checkout Ends */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
