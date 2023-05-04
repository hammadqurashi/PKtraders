"use client";
import React, { useState, useContext } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
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

  const [toggleDropDown, settoggleDropDown] = useState(false);
  const [collectionDropDown, setcollectionDropDown] = useState(false);

  const toggleDropDownfunc = () => {
    settoggleDropDown(!toggleDropDown);
  };
  return (
    <>
      <header className="mb-8 border-b dark:bg-dark-secondaryBackground">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8">
          {/* <!-- logo - start --> */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
            aria-label="logo"
          >
            <Image
              src={"/brandlogo.png"}
              width={50}
              height={50}
              priority
              alt="brandlogo"
            />
            PKTraders
          </Link>
          {/* <!-- logo - end --> */}

          {/* <!-- nav - start --> */}
          <nav className="hidden gap-12 lg:flex 2xl:ml-16">
            <Link href="/" className="text-lg font-semibold text-[#ed1c24]">
              Home
            </Link>
            <div
              onMouseEnter={() => setcollectionDropDown(!collectionDropDown)}
              onMouseLeave={() => setcollectionDropDown(!collectionDropDown)}
              onClick={() => setcollectionDropDown(!collectionDropDown)}
              className="cursor-pointer relative flex items-center text-lg font-semibold text-gray-600 dark:text-dark-primaryText transition duration-100 active:text-[#ed1c24]"
            >
              Collections
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800 dark:text-dark-primaryText"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {collectionDropDown && (
                <div
                  onMouseLeave={() =>
                    setcollectionDropDown(!collectionDropDown)
                  }
                  className="absolute top-[100%] left-[50%] -ml-[50px] z-50 w-56 origin-top-right rounded-md bg-white dark:bg-dark-secondaryBackground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      href="/tshirts"
                      className="text-gray-700 dark:text-dark-primaryText block px-4 py-2 text-base hover:bg-gray-100 dark:hover:bg-dark-primaryBackground"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Tshirts
                    </Link>
                    <Link
                      href="/hoodies"
                      className="text-gray-700 dark:text-dark-primaryText block px-4 py-2 text-base hover:bg-gray-100 dark:hover:bg-dark-primaryBackground"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Hoodies
                    </Link>
                    <Link
                      href="/sweatshirts"
                      className="text-gray-700 dark:text-dark-primaryText block px-4 py-2 text-base hover:bg-gray-100 dark:hover:bg-dark-primaryBackground"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      SweatShirts
                    </Link>
                    <Link
                      href="/caps"
                      className="text-gray-700 dark:text-dark-primaryText block w-full px-4 py-2 text-left text-base hover:bg-gray-100 dark:hover:bg-dark-primaryBackground"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                    >
                      Caps
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#"
              className="text-lg font-semibold text-gray-600 dark:text-dark-primaryText transition duration-100 active:text-[#ed1c24]"
            >
              Sale
            </a>
            <Link
              href="/about"
              className="text-lg font-semibold text-gray-600 dark:text-dark-primaryText transition duration-100 active:text-[#ed1c24]"
            >
              About
            </Link>
          </nav>
          {/* <!-- nav - end --> */}

          {/* <!-- buttons - start --> */}
          <div className="flex">
            {/* Theme Toggle Button */}
            <ThemeSwitch />
            {/* Cart Button */}
            <Link
              href="/cart"
              className=" flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24"
            >
              {/* Showing Cart Length */}
              {Object.keys(cart).length > 0 && (
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
            {/* Displaying Account If User Is Logged In Else Login Button*/}
            {user.value ? (
              <div
                onMouseEnter={toggleDropDownfunc}
                onMouseLeave={toggleDropDownfunc}
                onClick={toggleDropDownfunc}
                className="cursor-pointer flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 dark:hover:bg-dark-primaryBackground active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24"
              >
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span className="text-xs font-semibold text-gray-500 dark:text-dark-primaryText sm:block">
                  Account
                </span>
                <div className="relative">
                  {toggleDropDown && (
                    <div
                      onMouseLeave={toggleDropDownfunc}
                      className="absolute top-0 right-2 z-50 w-56 origin-top-right rounded-md bg-white dark:bg-dark-secondaryBackground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <Link
                          href="/myaccount"
                          className="text-gray-700 dark:text-dark-primaryText block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/myorders"
                          className="text-gray-700 dark:text-dark-primaryText block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                        >
                          Orders
                        </Link>
                        <Link
                          href="/support"
                          className="text-gray-700 dark:text-dark-primaryText block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-2"
                        >
                          Support
                        </Link>
                        <button
                          onClick={logout}
                          className="text-gray-700 dark:text-dark-primaryText block w-full px-4 py-2 text-left text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-3"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Link
                  href="/login"
                  className={`text-lg mr-1 bg-[#ed1c24] text-white py-1 font-semibold px-4 rounded-lg`}
                >
                  Log In
                </Link>
              </div>
            )}

            <button
              type="button"
              className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 dark:text-dark-primaryText"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="hidden text-xs font-semibold text-gray-500 dark:text-dark-primaryText sm:block">
                Menu
              </span>
            </button>
          </div>
          {/* <!-- buttons - end --> */}
        </div>
      </header>
    </>
  );
};

export default Navbar;
