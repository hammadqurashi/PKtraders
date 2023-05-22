"use client";
import React, { useState } from "react";
import Link from "next/link";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SecurityDetails = (props) => {
  // state for showing confirmation popup
  const [showConfirmation, setshowConfirmation] = useState(false);
  // state for loading of confirmation popup
  const [loading, setLoading] = useState(false);

  const [securityDetails, setsecurityDetails] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if both fields new password and current password matches then show confirmation popup
    // and if both fields length are greater then zero
    if (
      securityDetails.newpassword == securityDetails.confirmpassword &&
      (securityDetails.newpassword.length > 0 ||
        securityDetails.confirmpassword.length > 0)
    ) {
      return setshowConfirmation(true);
    } else {
      return;
    }
  };

  // this runs when user confirms yes from confirmation popup and then form will submit
  const submitChangePassword = async () => {
    setLoading(true);

    await props
      .changePassword(
        securityDetails.currentpassword,
        securityDetails.newpassword
      )
      .then((data) => {
        setshowConfirmation(false);
        setLoading(false);
        if (data.success) {
          toast.success(data.message, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (!data.success) {
          toast.error(data.message, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // handle change function when input of the input fields change
  const handleChange = (e) => {
    setsecurityDetails({ ...securityDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <ConfirmationPopup
        functionality="save"
        NoFunc={() => setshowConfirmation(false)}
        YesFunc={submitChangePassword}
        msg="Change Password"
        showConfirmation={showConfirmation}
        loading={loading}
      />
      <form
        onSubmit={handleFormSubmit}
        className="container mx-auto bg-white dark:bg-dark-primaryBackground mt-10 rounded px-4"
      >
        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
          <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
            <p className="text-lg text-gray-800 dark:text-dark-primaryText font-bold">
              Security Details
            </p>
            <div className="group relative ml-2 cursor-pointer text-gray-600 dark:text-dark-secondaryText">
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
              <div className="group-hover:flex absolute top-0 left-full z-10 hidden h-full items-center justify-center pl-4">
                <div
                  className="shrink-0 inline-block w-36 rounded-md bg-gray-700 px-1 py-1 font-normal shadow"
                  role="tooltip"
                >
                  <p className="text-xs text-gray-100">Change your Password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto pt-4">
          <div className="flex flex-wrap container mx-auto">
            <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
              <div className="flex justify-between">
                <label
                  htmlFor="currentpassword"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
                >
                  Current Password
                </label>
              </div>
              <input
                type="password"
                id="currentpassword"
                name="currentpassword"
                required
                value={securityDetails.currentpassword}
                onChange={handleChange}
                className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
                placeholder="Your Current Password"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
              <label
                htmlFor="newpassword"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
              >
                New Password
              </label>
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                required
                value={securityDetails.newpassword}
                onChange={handleChange}
                className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
                placeholder="Your New Password"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
              <label
                htmlFor="confirmpassword"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                required
                value={securityDetails.confirmpassword}
                onChange={handleChange}
                className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
                placeholder="Confirm Entered Password"
              />
              {/* Showing this when new password field input does't matches with confirmpassword input */}
              <span
                className={`${
                  securityDetails.confirmpassword == securityDetails.newpassword
                    ? "hidden"
                    : " "
                } text-[11px] text-red-500 mt-[1px]`}
              >
                Password Doesn't Match With New Password!
              </span>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-11/12 xl:w-full">
          <div className="w-full py-4 sm:px-0 bg-white dark:bg-dark-primaryBackground flex justify-end">
            <button
              className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-[#ed1c24] px-6 py-2 text-xs mr-4"
              type="reset"
            >
              Cancel
            </button>
            <button
              className={`${
                securityDetails.newpassword.length <= 0 ||
                securityDetails.confirmpassword <= 0 ||
                securityDetails.newpassword != securityDetails.confirmpassword
                  ? "pointer-events-none opacity-70 "
                  : " "
              } bg-[#ed1c24] focus:outline-none transition duration-150 ease-in-out rounded text-white px-8 py-2 text-sm`}
              type="submit"
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SecurityDetails;
