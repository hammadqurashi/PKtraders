"use client";
import React, { useState, useContext, useEffect } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { usePathname } from "next/navigation";
const Navbar = () => {
  // useContext hook
  const context = useContext(cartContext);

  // desturcturing context
  const { user, logout, cart } = context;

  const [toggleDropDown, settoggleDropDown] = useState(false);
  const [collectionDropDown, setcollectionDropDown] = useState(false);

  // Mobile NavBar Toggle

  const [mobileNavOpen, setmobileNavOpen] = useState(false);

  const togglemobileNavOpen = () => {
    setmobileNavOpen(!mobileNavOpen);
  };

  const toggleDropDownfunc = () => {
    settoggleDropDown(!toggleDropDown);
  };

  const pathName = usePathname();

  // closing mobile nav on Path Change
  useEffect(() => {
    setmobileNavOpen(false);
  }, [pathName]);

  return (
    <>
      {/* Top Navbar Starts */}

      <header className="mb-8 border-b dark:bg-dark-secondaryBackground">
        <div className="mx-auto flex max-w-screen-2xl items-center py-2 justify-between md:px-8">
          {/* <!-- logo - start --> */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl px-2 md:px-0"
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
          <nav
            className={`${
              mobileNavOpen ? "left-0" : "-left-full"
            } flex flex-col top-16 lg:flex-row absolute lg:static py-3 lg:py-0 items-center w-full h-full lg:w-max lg:h-max transition-all duration-500 ease-in-out bg-white dark:bg-dark-secondaryBackground lg:bg-transparent lg:dark:bg-transparent z-20 gap-12 lg:flex 2xl:ml-16`}
          >
            <Link
              href="/"
              className={`${
                pathName == "/"
                  ? "text-[#ed1c24]"
                  : "text-gray-600 dark:text-dark-primaryText"
              } text-lg font-semibold`}
            >
              Home
            </Link>
            <Link
              href="/tshirts"
              className={`text-lg font-semibold ${
                pathName == "/tshirts"
                  ? "text-[#ed1c24]"
                  : " text-gray-600 dark:text-dark-primaryText "
              } transition duration-100`}
            >
              Tshirts
            </Link>
            <Link
              href="/hoodies"
              className={`text-lg font-semibold ${
                pathName == "/hoodies"
                  ? "text-[#ed1c24]"
                  : " text-gray-600 dark:text-dark-primaryText "
              } transition duration-100`}
            >
              Hoodies
            </Link>
            <Link
              href="/sweatshirts"
              className={`text-lg font-semibold ${
                pathName == "/sweatshirts"
                  ? "text-[#ed1c24]"
                  : " text-gray-600 dark:text-dark-primaryText "
              } transition duration-100`}
            >
              Sweatshirts
            </Link>
            <Link
              href="/caps"
              className={`text-lg font-semibold ${
                pathName == "/caps"
                  ? "text-[#ed1c24]"
                  : " text-gray-600 dark:text-dark-primaryText "
              } transition duration-100`}
            >
              Caps
            </Link>
            <Link
              href="/allcollections"
              className={`text-lg font-semibold ${
                pathName == "/allcollections"
                  ? "text-[#ed1c24]"
                  : " text-gray-600 dark:text-dark-primaryText "
              } transition duration-100`}
            >
              All Collections
            </Link>
          </nav>
          {/* <!-- nav - end --> */}

          {/* <!-- buttons - start --> */}
          <div className="flex">
            {/* Theme Toggle Button */}
            <ThemeSwitch smallDevice="hidden" />
            {/* Cart Button */}
            <Link
              href="/cart"
              className="hidden md:flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground active:bg-gray-200 md:h-24 md:w-24"
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
                className="hidden md:flex cursor-pointer h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 dark:hover:bg-dark-primaryBackground active:bg-gray-200 md:h-24 md:w-24"
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
              <div className="hidden md:flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 md:h-24 md:w-24">
                <Link
                  href="/login"
                  className={`text-lg mr-1 bg-[#ed1c24] text-white py-1 font-semibold px-4 rounded-lg`}
                >
                  Log In
                </Link>
              </div>
            )}

            {/* Hamburger Starts */}

            <button
              onClick={togglemobileNavOpen}
              type="button"
              className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 dark:hover:bg-dark-primaryBackground sm:h-20 sm:w-20 md:h-24 md:w-24 lg:hidden"
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
            {/* Hamburger Ends */}
          </div>
          {/* <!-- buttons - end --> */}
        </div>
      </header>
      {/* Top Navbar Ends */}

      {/* <!-- Mobile Floating Nav - start --> */}

      <div className="fixed bottom-0 z-[9999] bg-white dark:bg-dark-secondaryBackground pt-12 sm:pt-16 lg:hidden md:hidden">
        <nav className="fixed bottom-0 mx-auto w-[100%]">
          <Link
            href="/cart"
            className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-3xl bg-[#ed1c24] text-white shadow-lg transition duration-100 sm:-top-8 sm:h-16 sm:w-16"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <div className="flex justify-between gap-8 border-t bg-white dark:bg-dark-secondaryBackground px-10 py-4 text-xs sm:rounded-t-xl sm:border-transparent sm:text-sm sm:shadow-2xl">
            <Link
              href={"/"}
              className={`flex flex-col items-center gap-1 ${
                pathName == "/"
                  ? "text-[#ed1c24]"
                  : "text-gray-400 dark:text-dark-secondaryText"
              }`}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <span>Home</span>
            </Link>

            <div className="mr-4 flex flex-col items-center gap-1 text-gray-400 dark:text-dark-secondaryText transition duration-100 hover:text-gray-500 active:text-gray-600 sm:mr-8">
              <ThemeSwitch />

              <span>Theme</span>
            </div>

            <a
              href="#"
              className="ml-4 flex flex-col items-center gap-1 text-gray-400 dark:text-dark-secondaryText transition duration-100 hover:text-gray-500 active:text-gray-600 sm:ml-8"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <span>Search</span>
            </a>
            {user.value ? (
              <div
                onClick={toggleDropDownfunc}
                className="relative flex flex-col items-center gap-1 text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
              >
                {/* Account SVG */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                {toggleDropDown && (
                  <div
                    className="absolute bottom-14 left-[50%] -ml-[70px] z-50 w-56 origin-top-right rounded-md bg-white dark:bg-dark-secondaryBackground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                <span>Account</span>
              </div>
            ) : (
              <Link
                href="/login"
                className={`flex flex-col items-center gap-1 transition duration-100 ${
                  pathName == "/login"
                    ? "text-[#ed1c24]"
                    : "text-gray-400 dark:text-dark-secondaryText"
                }`}
              >
                {/* Login SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-log-in"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>

                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
      {/* <!-- Mobile Floating Nav - end --> */}
    </>
  );
};

export default Navbar;
