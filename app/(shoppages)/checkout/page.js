"use client";
import React, { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import cartContext from "@/app/context/cart/cartContext";
import CheckoutForm from "./CheckoutForm";
import UserDetailsComponent from "./UserDetailsComponent";
import { useRouter } from "next/navigation";
import codImg from "@/assets/codImg.jpg";
import Image from "next/image";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  // useRouter hook
  const router = useRouter();

  // Context
  const context = useContext(cartContext);

  // destructuring context values
  const {
    cart,
    subtotal,
    addToCart,
    removeFromCart,
    clearCart,
    addQuantity,
    subtractQuantity,
  } = context;

  // payment method described by user

  const [payMethod, setpayMethod] = useState("cod");

  const [clientSecret, setClientSecret] = useState("");

  // state for initial details set by user
  const [userSetInitialDetails, setuserSetInitialDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  // state for user details
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-payment-intent`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: JSON.parse(localStorage.getItem("cart")) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

    // fetching user set details on page load and initially setting it on user details value
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "content-type": "applicaion/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((user) => {
        // if user is logged in then in response success will true
        if (user.success == true) {
          setuserSetInitialDetails({
            name: user.name, // if user has name (not name possibility occurs when guest tries to order) then set initial name to user's name
            email: user.email, // if user has email (not email possibility occurs when guest tries to order) then set initial email to user's email
            phone: user.phone ? user.phone : "", // if user has set phone then set initial phone to user's phone
            address: user.address ? user.address : "", // if user has set address then set initial address to user's address
            city: user.city ? user.city : "", // if user has set city then set initial address to user's city
          });

          // then also setting userDetails to show immediately so user can see it
          setuserDetails({
            name: user.name,
            email: user.email,
            phone: user.phone ? user.phone : "",
            address: user.address ? user.address : "",
            city: user.city ? user.city : "",
          });
        } else {
          // else user is as guest then in response success will false
          setuserSetInitialDetails({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
          });
        }
      });
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

  // handle change functions for input of userdetails
  const handleChange = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const [orderDetailsLock, setorderDetailsLock] = useState(false);

  // state to show the loading
  const [loading, setloading] = useState(false);

  // form submit function of user details

  const initiateOrder = async () => {
    const data = {
      name:
        userSetInitialDetails.name == ""
          ? userDetails.name
          : userSetInitialDetails.name,
      email:
        userSetInitialDetails.email == ""
          ? userDetails.email
          : userSetInitialDetails.email,
      // email: userDetails.email,
      phone: userDetails.phone,
      payMethod: payMethod,
      products: cart,
      address: userDetails.address,
      amount: subtotal + shippingFee,
      city: userDetails.city,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/initiateorder`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await res.json();
  };

  const userDetailsFormSubmit = async (e) => {
    e.preventDefault();

    // loading set to true until order is initiated
    setloading(true);

    if (Object.values(userDetails).every((value) => value !== "")) {
      setorderDetailsLock(true);

      if (payMethod == "cod") {
        const order = await initiateOrder();
        router.push(`${process.env.NEXT_PUBLIC_HOST}/order?id=${order._id}`);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-primaryText">
          Checkout
        </h1>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Left Side */}
        <div className="px-4 pt-8">
          {/* Order Summary */}
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400 dark:text-dark-secondaryText">
            Check your items. And select a suitable Payment method.
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
          {/* Total Amount Calculation */}
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
          {/* Payment Methods */}
          <p className="text-lg font-medium my-5">Payment Methods</p>
          <form
            className="mt-5 grid gap-6"
            onChange={(e) => setpayMethod(e.target.value)}
          >
            <div className="relative">
              <input
                value={"onlinepay"}
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
              />
              <span className="peer-checked:border-gray-700 dark:peer-checked:border-white absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-secondaryBackground"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-white peer-checked:bg-gray-50 dark:peer-checked:bg-black flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-700 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Online Payment</span>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                value={"cod"}
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
                <Image
                  className="w-14 object-contain"
                  src={codImg}
                  width={100}
                  height={100}
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash On Delivery</span>
                </div>
              </label>
            </div>
          </form>
        </div>
        {/* Right Side */}
        <div className="mt-10 bg-gray-50 dark:bg-dark-secondaryBackground px-4 pt-8 lg:mt-0">
          {/* User Details */}
          <UserDetailsComponent
            loading={loading}
            btnText={payMethod === "cod" ? "Place Order" : "Proceed To Pay"} // Displaying Button Text on the basis of users payment method
            userSetInitialDetails={userSetInitialDetails}
            email={userDetails.email}
            name={userDetails.name}
            phone={userDetails.phone}
            address={userDetails.address}
            city={userDetails.city}
            handleChange={handleChange}
            userDetailsFormSubmit={userDetailsFormSubmit}
            orderDetailsLock={orderDetailsLock}
          />
          {/*  Payment Details */}
          {/*Show Payment Details when user clicks on online pay button */}
          {payMethod === "onlinepay" && orderDetailsLock && (
            <>
              <p className="mt-8 text-xl font-medium">Payment Details</p>
              <p className="text-gray-400 dark:text-dark-secondaryText">
                Complete your order by providing your payment details.
              </p>
              <div className="">
                {/* Stripe Checkout Starts */}
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm initiateOrder={initiateOrder} />
                  </Elements>
                )}
                {/* Stripe Checkout Ends */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
