"use client";

import React, { useContext, useState } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";
import AccountBtn from "./AccountBtn";
import ThemeSwitch from "../ThemeSwitch";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

const FloatingNavBar = () => {
  // useContext hook
  const context = useContext(cartContext);

  // desturcturing context
  const { user } = context;

  const pathName = usePathname();

  // state for search bar
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="fixed bottom-0 z-[50] w-screen pt-12 sm:pt-16 lg:pt-24">
      <nav className="sticky bottom-0 mx-auto w-full bg-white dark:bg-dark-secondaryBackground sm:max-w-md">
        {/* Cart Btn */}
        <Link
          href="/cart"
          className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-3xl bg-[#ed1c24] text-white shadow-lg transition duration-100 hover:bg-indigo-600 sm:-top-8 sm:h-16 sm:w-16"
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
        <div className="flex justify-between gap-8 border-t px-10 py-4 text-xs sm:rounded-t-xl sm:border-transparent sm:text-sm sm:shadow-2xl">
          {/* Home Btn */}
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

          {/* Theme Btn */}
          <div className="mr-4 flex flex-col items-center gap-1 text-gray-400 dark:text-dark-secondaryText transition duration-100 hover:text-gray-500 active:text-gray-600 sm:mr-8">
            <ThemeSwitch />

            <span>Theme</span>
          </div>

          {/* Search Btn */}
          <button
            className="ml-4 flex flex-col items-center gap-1 text-gray-400 dark:text-dark-secondaryText transition duration-100 hover:text-gray-500 active:text-gray-600 sm:ml-8"
            onClick={() => setSearchOpen(!searchOpen)}
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
          </button>

          {/* If User Logged In then Account btn else Login btn */}
          {user.value ? (
            <div className="mr-4 flex flex-col items-center gap-1 text-gray-400 dark:text-dark-secondaryText transition duration-100 hover:text-gray-500 active:text-gray-600 sm:mr-8">
              <AccountBtn />
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
          <SearchBar searchOpen={searchOpen} />
        </div>
      </nav>
    </div>
  );
};

export default FloatingNavBar;
