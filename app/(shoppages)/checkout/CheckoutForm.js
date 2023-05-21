"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const CheckoutForm = (props) => {
  // useRouter hook
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  // online payment form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
        },
      })
      .then(async (result) => {
        if (result.error) {
          let error = result.error;
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Otherwise, your customer will be redirected to
          // your `return_url`. For some payment methods like iDEAL, your customer will
          // be redirected to an intermediate site first to authorize the payment, then
          // redirected to the `return_url`.
          if (
            error.type === "card_error" ||
            error.type === "validation_error"
          ) {
            setMessage(error.message);
          } else {
            setMessage("An unexpected error occurred.");
          }
        } else {
          if (!stripe) {
            return;
          }

          const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
          );

          if (!clientSecret) {
            return;
          }

          stripe
            .retrievePaymentIntent(clientSecret)
            .then(async ({ paymentIntent }) => {
              if (paymentIntent.status == "succeeded") {
                const order = await props.initiateOrder();
                router.push(
                  `${process.env.NEXT_PUBLIC_HOST}/order?id=${order._id}`
                );
              }
            });
        }
        setIsLoading(false);
      });
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(value) => setEmail(value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
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
    </>
  );
};

export default CheckoutForm;
