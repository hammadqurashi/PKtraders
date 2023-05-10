import React from "react";
import Link from "next/link";
const SecurityDetails = () => {
  return (
    <form className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
      <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
          <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
            Security Details
          </p>
          <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={16}
              height={16}
            >
              <path
                className="heroicon-ui"
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mx-auto pt-4">
        <div className="flex flex-wrap container mx-auto">
          <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
            <div className="flex justify-between">
              <label
                htmlFor="currentpassword"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                Current Password
              </label>
              {/* Forgot Password Todo  */}
              <Link href="/forgotpassword" className="text-red-500 text-xs">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="currentpassword"
              name="currentpassword"
              required
              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
              placeholder="Your Current Password"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="newpassword"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
            >
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              required
              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
              placeholder="Your New Password"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="confirmpassword"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              required
              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
              placeholder="Confirm Entered Password"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto w-11/12 xl:w-full">
        <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
          <button
            className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4"
            type="reset"
          >
            Cancel
          </button>
          <button
            className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default SecurityDetails;
