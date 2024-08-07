"use client";

import React from "react";

const addContact = async (e) => {
  try {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY":
          "6602e4a93f3f6e12812c5dd4-YX2wk70sdmfq5CeJqFU1G97zr6QwmSM0tP2Gi57YWV4230eiPa",
      },
      body: JSON.stringify({
        identifiers: [
          {
            type: "email",
            channels: {
              email: { status: "subscribed" },
            },
            id: "hammad@gmail.com",
          },
          {
            type: "phone",
            channels: {
              sms: { status: "subscribed" },
            },
            id: "02100000",
          },
        ],
        firstName: "hammad",
      }),
    };

    fetch("https://api.omnisend.com/v3/contacts", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  } catch (error) {
    console.log(error);
  }
};

const NewsLetter = () => {
  return (
    <div className="bg-white dark:bg-dark-primaryBackground py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center rounded-lg bg-gray-100 dark:bg-dark-secondaryBackground p-4 sm:p-8 lg:flex-row lg:justify-between">
          <div className="mb-4 sm:mb-8 lg:mb-0">
            <h2 className="text-center text-xl font-bold text-[#ed1c24] sm:text-2xl lg:text-left lg:text-3xl">
              Get the latest updates
            </h2>
            <p className="text-center text-gray-500 dark:text-dark-secondaryText lg:text-left">
              Sign up for our newsletter
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <form className="mb-3 flex w-full max-w-md gap-2">
              <input
                placeholder="Email"
                className="bg-gray-white w-full flex-1 rounded border border-gray-300 dark:border-dark-primaryBackground px-3 py-2 text-gray-800 dark:text-dark-primaryText placeholder-gray-400 dark:placeholder-dark-secondaryText outline-none transition duration-100"
              />

              <button
                onClick={addContact}
                className="inline-block rounded bg-[#ed1c24] px-8 py-2 text-center text-sm font-semibold text-white outline-none transition duration-100 focus-visible:ring md:text-base"
              >
                Send
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 dark:text-dark-secondaryText lg:text-right">
              By signing up to our newsletter you agree to our{" "}
              <a href="#" className="underline transition duration-100">
                Term of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline transition duration-100 ">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
