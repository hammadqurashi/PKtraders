"use client";
import React, { useRef, useContext, useEffect, useState } from "react";
import cartContext from "@/app/context/cart/cartContext";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from "react-icons/ai";
import { BsFillCartCheckFill, BsSun, BsFillMoonFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { Roboto_Condensed } from "next/font/google";
import ThemeSwitch from "./ThemeSwitch";

const roboto400 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
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

  const sideCartref = useRef();

  // Show / hide cart on click
  const toggleCart = () => {
    sideCartref.current.classList.toggle("translate-x-full");
  };

  const [toggleDropDown, settoggleDropDown] = useState(false);

  const toggleDropDownfunc = () => {
    settoggleDropDown(!toggleDropDown);
  };

  // const getCookie = (name) => {
  //   const cookies = document.cookie;
  //   let cookie = cookies.split(`; ${name}=`);
  //   return cookie[1];
  // };

  // const [theme, setTheme] = useState("");
  // const toggleTheme = () => {
  //   setTheme(theme == "" ? "dark" : "");
  //   document.cookie = `theme=${theme};`;
  // };

  return (
    <>
      <nav
        className={`${roboto400.className} dark:bg-dark-background dark:text-dark-text font-medium p-4 flex flex-col md:flex-row justify-center md:justify-between items-center shadow-md`}
      >
        <Link href="/" className="logo ">
          <Image
            src="/logo.png"
            alt="logo"
            width={250}
            height={50}
            priority
            className="w-auto h-auto"
          />
        </Link>
        <div className={`nav md:text-lg`}>
          <ul className="flex md:space-x-5 space-x-2 justify-center mt-3 md:mt-0">
            <Link href="/tshirts">
              <li>Tshirts</li>
            </Link>
            <Link href="/hoodies">
              <li>Hoodies</li>
            </Link>
            <Link href="/sweatshirts">
              <li>SweatShirts</li>
            </Link>
            <Link href="/caps">
              <li>Caps</li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center mt-3 md:mt-0">
          {/* Dark Mode Toggle Button */}
          <ThemeSwitch />
          {/* Dark Mode Toggle Button End*/}
          {user.value ? (
            <div
              onMouseEnter={toggleDropDownfunc}
              onMouseLeave={toggleDropDownfunc}
              onClick={toggleDropDownfunc}
              className="relative inline-block text-left"
            >
              <MdAccountCircle
                title="Account"
                className={`text-4xl md-full rounded-full mr-1 cursor-pointer`}
              />

              {/* DropDown Menu Of Account */}

              {toggleDropDown && (
                <div
                  onMouseLeave={toggleDropDownfunc}
                  className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      href="/myaccount"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/myorders"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/support"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      Support
                    </Link>
                    <button
                      onClick={logout}
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
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
          ) : (
            <Link href="/login">
              <button
                className={`text-lg mr-1 bg-[#ed1c24] text-white py-1 font-semibold px-4 rounded-lg`}
              >
                Log In
              </button>
            </Link>
          )}
          <div
            className="bg-[#ED1C24] hover:bg-[#ed262d] rounded-sm p-2 cart cursor-pointer"
            title="Cart"
            onClick={toggleCart}
          >
            <AiOutlineShoppingCart className={`md:text-2xl text-white`} />
          </div>
        </div>
        <div
          className="sidecart fixed top-0 overflow-y-scroll h-[100vh] right-0 bg-white border-l-2  border-[#ed1c24] md:w-[20vw] w-[50vw] z-40 p-4 transition-transform translate-x-full"
          ref={sideCartref}
        >
          <div className="flex justify-between my-1">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <span className="cursor-pointer">
              <AiFillCloseCircle
                className="text-xl text-[#ed1c24]"
                onClick={toggleCart}
              />
            </span>
          </div>
          <ul>
            {Object.keys(cart) != 0 ? (
              Object.keys(cart).map((k) => {
                return (
                  <li className="list-decimal list-inside my-2" key={k}>
                    <div className="item flex items-center">
                      <div className="w-2/3 font-semibold ">{cart[k].name}</div>
                      <div className="w-1/3 flex items-center justify-center">
                        <AiOutlineMinusSquare
                          onClick={() => {
                            subtractQuantity(k);
                          }}
                          className="cursor-pointer text-xl"
                        />
                        <div className="mx-1 ">{cart[k].qty}</div>
                        <AiOutlinePlusSquare
                          onClick={() => {
                            addQuantity(k);
                          }}
                          className="cursor-pointer text-xl"
                        />
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="my-4">There Are No Items In Cart</div>
            )}
          </ul>
          {cart.length !== 0 && (
            <div className="flex mt-10">
              <Link
                href="/checkout"
                className="sm:w-1/2 mr-1 flex items-center sm:px-2 sm:py-1 md:px-4 md:py-2 text-sm bg-[#ed1c24] text-white rounded"
              >
                <BsFillCartCheckFill className="mx-1" />
                Checkout
              </Link>
              <button
                className="sm:w-1/2 flex items-center sm:px-2 sm:py-1 md:px-4 md:py-2 sm:text-sm bg-[#ed1c24] text-white rounded"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
