"use client";
import React, { useRef } from "react";
import { BiSave } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
const ConfirmationPopup = (props) => {
  const { functionality, NoFunc, YesFunc, msg, showConfirmation, loading } =
    props;

  // modal ref
  const modalRef = useRef();

  // When user click on NO button the prop.NoFunc will run
  const NoFunction = () => {
    NoFunc();
  };

  // When user click on YES button the prop.YesFunc will run
  const YesFunction = () => {
    YesFunc();
  };

  return (
    <div
      ref={modalRef}
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !showConfirmation && "hidden" // if show confirmation prop is false then hidden else show
      } overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto top-[30%] md:-right-[32%]">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            onClick={NoFunction}
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {functionality == "delete" && (
            <RiDeleteBin6Fill className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
          )}
          {functionality == "save" && (
            <BiSave className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
          )}
          <p className="mb-4 text-gray-500 dark:text-gray-300">{msg}</p>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={NoFunction}
            >
              No, cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={YesFunction}
            >
              {!loading ? (
                "Yes, I'm sure"
              ) : (
                <span className="animate-spin block w-[17px] h-[17px] rounded-full border-2 border-white border-t-transparent"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
