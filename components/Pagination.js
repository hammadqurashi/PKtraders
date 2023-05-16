"use client";
import React, { useEffect, useState } from "react";

const Pagination = (props) => {
  // destructuting props
  const { currentPage, totalPages, nextPage, prevPage, specificPage } = props;

  // state for pages shown
  const [pages, setpages] = useState([]);

  useEffect(() => {
    // making an array of pages from total pages and setting it to pages state
    let newArray = [];
    for (let i = 1; i <= totalPages; i++) {
      newArray.push(i);
    }
    setpages(newArray);
  }, []);

  return (
    <nav
      aria-label="Page Navigation"
      className="mx-auto my-10 flex max-w-md justify-between space-x-2 rounded-md bg-white dark:bg-dark-primaryBackground py-2 text-gray-700"
    >
      <span
        className={`${
          currentPage == 1
            ? "pointer-events-none text-gray-400"
            : " cursor-pointer text-gray-800 dark:text-dark-primaryText"
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
        {/* Slicing top 3 pages from total pages and then showing it in pagination */}
        {pages.slice(0, 3).map((pageNo) => {
          return (
            <li
              key={pageNo}
              className={`cursor-pointer px-2 text-lg font-medium sm:px-3 hover:text-[#ed1c24] ${
                currentPage == pageNo
                  ? " text-[#ed1c24] "
                  : " text-gray-800 dark:text-dark-primaryText"
              }`}
              onClick={() => specificPage(pageNo)}
            >
              {pageNo}
            </li>
          );
        })}
        {/* Showing ... and last page no in pagination when total pages are greater then 3 because we already showed top 3 pages above */}
        {totalPages > 3 && (
          <>
            <li
              className={`cursor-default px-2 text-lg font-medium sm:px-3 text-gray-800 dark:text-dark-primaryText`}
            >
              ...
            </li>

            <li
              className={`cursor-pointer px-2 text-lg font-medium sm:px-3 hover:text-[#ed1c24] ${
                currentPage == totalPages
                  ? " text-[#ed1c24] "
                  : " text-gray-800 dark:text-dark-primaryText"
              }`}
              onClick={() => specificPage(totalPages)}
            >
              {totalPages}
            </li>
          </>
        )}
      </ul>
      <span
        className={`${
          currentPage == totalPages
            ? "pointer-events-none text-gray-400"
            : " cursor-pointer text-gray-800 dark:text-dark-primaryText "
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
