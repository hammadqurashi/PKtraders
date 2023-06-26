"use client";
import React, { useContext, useState, useEffect } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Link from "next/link";
import Image from "next/image";
import AccountBtn from "./AccountBtn";
import ThemeSwitch from "../ThemeSwitch";
import { usePathname } from "next/navigation";
import CartBtn from "./CartBtn";
import LoginBtn from "./LoginBtn";

const TopNavbar = ({ categories }) => {
  const pathName = usePathname();

  // useContext hook
  const context = useContext(cartContext);

  // desturcturing context
  const { user } = context;

  // Mobile NavBar Toggle

  const [mobileNavOpen, setmobileNavOpen] = useState(false);

  const togglemobileNavOpen = () => {
    setmobileNavOpen(!mobileNavOpen);
  };

  useEffect(() => {
    // scrolling window to top on path change and closing mobile nav
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setmobileNavOpen(false);
  }, [pathName]);

  return (
    <header className="sticky top-0 w-full bg-white z-50 mb-8 border-b dark:bg-dark-secondaryBackground">
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
          } fixed flex flex-col top-16 lg:flex-row lg:static py-3 lg:py-0 items-center w-full h-full lg:w-max lg:h-max transition-all duration-500 ease-in-out bg-white dark:bg-dark-secondaryBackground lg:bg-transparent lg:dark:bg-transparent z-20 gap-12 lg:flex 2xl:ml-16`}
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
          {categories &&
            categories.map((category) => {
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={`capitalize text-lg font-semibold ${
                    pathName == `/category/${category.slug}`
                      ? "text-[#ed1c24]"
                      : " text-gray-600 dark:text-dark-primaryText "
                  } transition duration-100`}
                >
                  {category.name}
                </Link>
              );
            })}

          <Link
            href="/category/all"
            className={`text-lg font-semibold ${
              pathName == "/category/all"
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
          <ThemeSwitch smallDeviceVisiblity={false} />
          {/* Cart Button */}
          <CartBtn />

          {/* Account btn will display Account Btn If User Is Logged In Else Login Button*/}
          {user.value ? (
            <AccountBtn smallDeviceVisiblity={false} />
          ) : (
            <LoginBtn />
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
  );
};

export default TopNavbar;
