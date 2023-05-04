"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import cartContext from "@/app/context/cart/cartContext";

const CheckoutForm = () => {
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

  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_HOST}/order`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const shippingFee = subtotal != 0 ? 100 : 0;

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(value) => setEmail(value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-dark-primaryText">
            Subtotal
          </p>
          <p className="font-semibold text-gray-900 dark:text-dark-primaryText">
            Rs. {subtotal}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-dark-primaryText">
            Shipping
          </p>
          <p className="font-semibold text-gray-900 dark:text-dark-primaryText">
            Rs {shippingFee}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900 dark:text-dark-primaryText">
          Total
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-dark-primaryText">
          Rs. {subtotal + shippingFee}
        </p>
      </div>
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white dark:bg-[#ed1c24]"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="animate-spin rounded-full w-5 h-5 border-2 border-white border-t-gray-900 dark:border-t-[#ed1c24]"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
