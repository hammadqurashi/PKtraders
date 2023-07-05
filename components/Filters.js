"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showFilters, setShowfilters] = useState(false);

  const [colors, setColors] = useState({
    white: false,
    blue: false,
    red: false,
    indigo: false,
    black: false,
    purple: false,
    grey: false,
  });

  const [sizes, setSizes] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });

  const [searchText, setSearchText] = useState("");

  const { white, blue, red, indigo, black, purple, grey } = colors;

  const { S, M, L, XL, XXL } = sizes;

  const changeColorHandler = (e) => {
    setColors({
      ...colors,
      [e.target.name]: e.target.checked,
    });
  };

  const changeSizeHandler = (e) => {
    setSizes({
      ...sizes,
      [e.target.name]: e.target.checked,
    });
  };

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const appliedColors = [];
    for (let key in colors) {
      colors[key] == true && appliedColors.push(key);
    }

    const appliedSizes = [];
    for (let key in sizes) {
      sizes[key] == true && appliedSizes.push(key);
    }

    const joinedColors = appliedColors.map((color) => color);
    const joinedSizes = appliedSizes.map((size) => size);

    const searchQuery =
      searchText.length > 0 ? createQueryString("title", searchText) + "&" : "";
    const colorsQuery =
      appliedColors.length > 0
        ? createQueryString("color", joinedColors) + "&"
        : "";
    const sizesQuery =
      appliedSizes.length > 0 ? createQueryString("size", joinedSizes) : "";

    router.push(pathname + "?" + searchQuery + colorsQuery + sizesQuery);
  };

  const resetFilters = () => {
    setSizes({
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
    });

    setColors({
      white: false,
      blue: false,
      red: false,
      indigo: false,
      black: false,
      purple: false,
      grey: false,
    });

    setSearchText("");
    router.push(pathname);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className=" md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className=" flex justify-end mb-4">
          {/*  filters Button (md and plus Screen) */}
          <button
            onClick={() => setShowfilters(!showFilters)}
            className="float-right cursor-pointer hidden hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 md:flex text-base leading-4 font-normal text-white justify-center items-center "
          >
            <svg
              className=" mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4V8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4V14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 4V5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Filters Button (Small Screen)  */}

        <button
          onClick={() => setShowfilters(!showFilters)}
          className="cursor-pointer mt-6 hover:bg-gray-700 md:hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center"
        >
          <svg
            className=" mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 4V8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 12V20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 4V14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18V20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 4V5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 9V20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
        </button>
      </div>

      <form
        id="filterSection"
        className={
          "relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " +
          (showFilters ? "block" : "hidden")
        }
        onSubmit={handleFormSubmit}
      >
        {/* Cross button Code  */}
        <div
          onClick={() => setShowfilters(false)}
          className=" cursor-pointer absolute right-0 top-0 md:py-5 lg:px-10 md:px-3 py-4 px-2"
        >
          <svg
            className=" lg:w-6 lg:h-6 w-4 h-4"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 1L1 25"
              stroke="#1F2937"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L25 25"
              stroke="#27272A"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Search Section */}
        <div>
          <div className="relative my-8 w-full flex items-center justify-between rounded-md">
            <svg
              className="absolute left-2 block h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" className=""></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
            </svg>
            <input
              type="search"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className=" h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* Colors Section */}
        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5H14"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 7L14 5L12 3"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 3L3 5L5 7"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10V21"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 19L19 21L21 19"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12L19 10L17 12"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Color
            </p>
          </div>
          <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="white"
                name="white"
                value="white"
                checked={white}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="white"
                  >
                    White
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="blue"
                name="blue"
                value="blue"
                checked={blue}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="blue"
                  >
                    Blue
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex md:justify-center md:items-center items-center justify-end ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="red"
                name="red"
                value="red"
                checked={red}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="red"
                  >
                    Red
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="indigo"
                name="indigo"
                value="indigo"
                checked={indigo}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="indigo"
                  >
                    Indigo
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="black"
                name="black"
                value="black"
                checked={black}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="black"
                  >
                    Black
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="purple"
                name="purple"
                value="purple"
                checked={purple}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="purple"
                  >
                    Purple
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="grey"
                name="grey"
                value="grey"
                checked={grey}
                onChange={changeColorHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="grey"
                  >
                    Grey
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        {/* Size Section */}
        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5H14"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 7L14 5L12 3"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 3L3 5L5 7"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10V21"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 19L19 21L21 19"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12L19 10L17 12"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Size
            </p>
          </div>
          <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
            <div className=" flex md:justify-center md:items-center items-center justify-end ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="S"
                name="S"
                value="S"
                checked={S}
                onChange={changeSizeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="S"
                  >
                    Small
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="M"
                name="M"
                value="M"
                checked={M}
                onChange={changeSizeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="M"
                  >
                    Medium
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="L"
                name="L"
                value="L"
                checked={L}
                onChange={changeSizeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="L"
                  >
                    Large
                  </label>
                </div>
              </div>
            </div>

            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="XL"
                name="XL"
                value="XL"
                checked={XL}
                onChange={changeSizeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="XL"
                  >
                    Xtra Large
                  </label>
                </div>
              </div>
            </div>

            <div className=" flex md:justify-center md:items-center items-center justify-start ">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="XXL"
                name="XXL"
                value="XXL"
                checked={XXL}
                onChange={changeSizeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="XXL"
                  >
                    Xtra Xtra Large
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div className="flex gap-2 px-0 mt-10 w-full ">
          <button
            type="submit"
            className={`${
              !Object.values(colors).includes(true) &&
              !Object.values(sizes).includes(true) &&
              searchText.length <= 0 &&
              "pointer-events-none opacity-60 "
            } w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800`}
          >
            Apply Filter
          </button>
          <button
            onClick={resetFilters}
            type="submit"
            className="w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
