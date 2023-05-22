"use client";
import React, { useState, useContext } from "react";
import cartContext from "@/app/context/cart/cartContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientComponent = (props) => {
  const router = useRouter();
  const { params, title, category, img, otherimgs, price, desc, color, size } =
    props;

  const context = useContext(cartContext);

  const [colorVariant, setcolorVariant] = useState("");
  const [sizeVariant, setsizeVariant] = useState("");

  const onClickSetVariant = (e) => {
    if (e.target.name === "size") {
      setsizeVariant(e.target.value);
    }
    if (e.target.name === "color") {
      setcolorVariant(e.target.value);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-primaryBackground py-6 sm:py-8 lg:py-12">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* <!-- images - start --> */}
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="order-last flex gap-4 lg:order-none lg:flex-col">
              {otherimgs.map((key) => {
                return (
                  <div key={key} className="overflow-hidden rounded-lg">
                    <img
                      src={key}
                      loading="lazy"
                      alt={title + "img1"}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-lg lg:col-span-4">
              <img
                src={img}
                loading="lazy"
                alt="Photo by Himanshu Dewangan"
                className="h-full w-full object-cover object-center"
              />

              <a
                href="#"
                className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* <!-- images - end --> */}

          {/* <!-- content - start --> */}
          <div className="md:py-8">
            {/* <!-- name - start --> */}
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500 dark:text-dark-secondaryText">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-primaryText lg:text-3xl">
                {title}
              </h2>
            </div>
            {/* <!-- name - end --> */}

            {/* <!-- rating - start --> */}
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <div className="flex h-7 items-center gap-1 rounded-full bg-[#ed1c24] px-2 text-white">
                <span className="text-sm">4.2</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            {/* <!-- rating - end --> */}

            {/* <!-- color - start --> */}
            <div className="mb-4 md:mb-6">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 dark:text-dark-secondaryText md:text-base">
                Color
              </span>

              <div className="flex flex-wrap gap-2">
                {color.map((key) => {
                  return (
                    <button
                      value={key}
                      onClick={onClickSetVariant}
                      name="color"
                      key={key}
                      type="button"
                      className={`h-8 w-8 rounded-full border bg-gray-500 ${
                        colorVariant === key
                          ? "ring-gray-800 dark:ring-dark-primaryText ring-2"
                          : "ring-transparent hover:ring-gray-200 dark:hover:bg-dark-tertiaryBackground"
                      } ring-offset-1 transition duration-100`}
                      style={{ backgroundColor: key }}
                    ></button>
                  );
                })}
              </div>
            </div>
            {/* <!-- color - end --> */}

            {/* <!-- size - start --> */}
            <div className="mb-8 md:mb-10">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 dark:text-dark-secondaryText md:text-base">
                Size
              </span>

              <div className="flex flex-wrap gap-3">
                {size.map((key) => {
                  return (
                    <button
                      onClick={onClickSetVariant}
                      name="size"
                      key={key}
                      value={key}
                      type="button"
                      className={`flex h-8 w-12 items-center justify-center rounded-md border dark:border-none ${
                        sizeVariant === key
                          ? "bg-[#ed1c24] text-white"
                          : "bg-white dark:bg-dark-fourthBackground dark:hover:bg-white hover:bg-gray-100 text-gray-800"
                      } text-center text-sm font-semibold transition duration-100 active:bg-gray-200`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* <!-- size - end --> */}

            {/* <!-- price - start --> */}
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 dark:text-dark-primaryText md:text-2xl">
                  Rs. {price}
                </span>
              </div>

              <span className="text-sm text-gray-500 dark:text-dark-primaryText">
                incl. VAT plus shipping
              </span>
            </div>
            {/* <!-- price - end --> */}

            {/* <!-- shipping notice - start --> */}
            <div className="mb-6 flex items-center gap-2 text-gray-500 dark:text-dark-secondaryText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>

              <span className="text-sm">2-4 day shipping</span>
            </div>
            {/* <!-- shipping notice - end --> */}

            {/* <!-- buttons - start --> */}
            <div className="flex flex-col-reverse md:flex-row gap-2.5">
              <button
                onClick={() => {
                  sizeVariant && colorVariant !== "" // If User have selected size & color of product
                    ? context.addToCart(
                        params + sizeVariant + colorVariant, //Itemcode in order to differentiate variants of same product
                        1, // qty
                        price, // price
                        title, // name of product
                        sizeVariant, // size of product
                        colorVariant, // color of product
                        img // image of product
                      )
                    : toast.error("Please Select Size and Color"); // If User didnot select size & color of product
                }}
                className="inline-block flex-1 rounded-lg bg-[#ed1c24] px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 focus-visible:ring sm:flex-none md:text-base"
              >
                Add to cart
              </button>

              <button
                onClick={() => {
                  // If User have selected size & color of product
                  if (sizeVariant && colorVariant !== "") {
                    context.buyNow(
                      price, // price of product
                      title, // name of product
                      sizeVariant, // size of product
                      colorVariant, // color of product
                      img // image of product
                    );
                    router.push("/checkout"); // then immediately navigate to checkout as it is Buy Now
                  } else {
                    // If User didnot select size & color of product
                    toast.error("Please Select Size and Color");
                  }
                }}
                className="inline-block rounded-lg bg-gray-200 dark:bg-dark-fourthBackground dark:hover:bg-white px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Buy now
              </button>
            </div>
            {/* <!-- buttons - end --> */}
          </div>
          {/* <!-- content - end --> */}
        </div>
        {/* <!-- description - start --> */}
        <div className="mt-10 md:mt-16 lg:mt-20">
          <div className="mb-3 text-lg font-bold text-gray-800 dark:text-dark-primaryText">
            Description :
          </div>

          <p className="text-gray-500 dark:text-dark-primaryText">{desc}</p>
        </div>
        {/* <!-- description - end --> */}
      </div>
    </div>
  );
};

export default ClientComponent;
