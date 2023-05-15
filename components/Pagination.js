"use client";
import React from "react";

const Pagination = (props) => {
  const { currentPage, totalPages, nextPage, prevPage } = props;

  return (
    <nav
      aria-label="Page Navigation"
      className="mx-auto my-10 flex max-w-md justify-between space-x-2 rounded-md bg-white py-2 text-gray-700"
    >
      <span
        className={`${
          currentPage == 1
            ? "pointer-events-none text-gray-400"
            : " cursor-pointer text-gray-800"
        }  flex items-center space-x-1 font-medium`}
        aria-label="Previous Page"
        tabIndex="-1"
        onClick={() => prevPage()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <ul className="flex">
        {totalPages != 1 && (
          <li className="cursor-pointer px-2 text-lg font-medium sm:px-3 hover:text-blue-600">
            {totalPages - (totalPages - 1)}
          </li>
        )}
        {/* <li>
          <a
            href="#"
            className="px-2 text-lg font-medium sm:px-3 hover:text-blue-600"
          >
            2
          </a>
        </li>
        <li>
          <span className="text-gray-400" aria-hidden="true">
            ...
          </span>
          <span className="sr-only">Skipping Pages</span>
        </li>
        <li>
          <a
            href="#"
            className="px-2 text-lg font-medium sm:px-3 hover:text-blue-600"
          >
            22
          </a>
        </li> */}
        <li className="cursor-pointer px-2 text-lg font-medium sm:px-3 hover:text-blue-600">
          {totalPages}
        </li>
      </ul>
      <span
        className={`${
          currentPage == totalPages
            ? "pointer-events-none text-gray-400"
            : " cursor-pointer text-gray-800"
        }  flex items-center space-x-1 font-medium`}
        aria-label="Next Page"
        onClick={() => nextPage()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </nav>
  );
};

export default Pagination;
