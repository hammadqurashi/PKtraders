"use client";
import React, { useContext, useState } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";
import LoginBtn from "./LoginBtn";

const AccountBtn = ({ smallDeviceVisiblity = true }) => {
  // useContext hook
  const context = useContext(cartContext);

  // desturcturing context
  const { logout } = context;

  // toggle dropdown for account dropdown
  const [toggleDropDown, settoggleDropDown] = useState(false);

  const toggleDropDownfunc = () => {
    settoggleDropDown(!toggleDropDown);
  };
  return (
    <div
      onMouseEnter={toggleDropDownfunc}
      onMouseLeave={toggleDropDownfunc}
      onClick={toggleDropDownfunc}
      className={`${
        !smallDeviceVisiblity && "hidden md:flex"
      } cursor-pointer flex-col items-center justify-center gap-1 md:gap-1.5 transition duration-100 dark:hover:bg-dark-primaryBackground md:h-24 md:w-24`}
    >
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
        />{" "}
      </svg>
      <span className="hidden md:block text-xs font-semibold text-gray-400 dark:text-dark-primaryText">
        Account
      </span>
      <div className="relative">
        {toggleDropDown && (
          <div
            onMouseLeave={toggleDropDownfunc}
            className="absolute bottom-7 md:top-0 right-0 z-50 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div
              className="py-1 bg-white dark:bg-dark-secondaryBackground"
              role="none"
            >
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
  );
};

export default AccountBtn;
