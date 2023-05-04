import { NextResponse } from "next/server";
// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const res = await request.json();

  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let subt = 0;
    let keys = Object.keys(items);
    for (let i = 0; i < keys.length; i++) {
      subt += items[keys[i]].price * items[keys[i]].qty; // setting subtotal of cart items
    }
    return subt;
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(res.items), //calculateOrderAmount(items)
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  // res.send({
  //   clientSecret: paymentIntent.client_secret,
  // });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
