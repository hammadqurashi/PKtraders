"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ searchOpen }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchText != "") {
      router.push(`/search?q=${searchText}`);
    }
  };

  return (
    <div
      className={`${
        searchOpen ? "left-0" : "-left-full"
      } transition-all duration-300 flex w-full justify-center absolute bottom-full md:top-full`}
    >
      <form
        onSubmit={handleSearch}
        className="border-b-[#ed1c24] p-3 md:p-6 flex items-center justify-start border-b-2 w-full md:w-[80%] bg-white dark:bg-dark-primaryBackground"
      >
        <input
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={` ml-2 flex-grow bg-transparent text-lg outline-none text-gray-600 dark:text-dark-primaryText placeholder:dark:text-dark-fourthBackground placeholder:text-gray-400`}
        />
        <button
          type="submit"
          className="mr-2 z-20 cursor-pointer text-[#ed1c24] outline-none duration-150 hover:scale-125"
        >
          <svg className="h-6 w-6 stroke-2" viewBox="0 0 32 32" fill="none">
            <circle
              cx="15"
              cy="14"
              r="8"
              stroke="currentColor"
              fill="transparent"
            ></circle>
            <line
              x1="21.1514"
              y1="19.7929"
              x2="26.707"
              y2="25.3484"
              stroke="currentColor"
              fill="transparent"
            ></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
