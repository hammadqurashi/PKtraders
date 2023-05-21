"use client";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
const ForgotResetPass = ({ resetPass }) => {
  // next router function
  const router = useRouter();

  // state for loading
  const [loading, setLoading] = useState(false);

  // states for showing New Password And confirm password fields
  const [showNewPass, setshowNewPass] = useState(false);
  const [showConfirPass, setshowConfirPass] = useState(false);

  // states for saving New Password And confirm password
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  // next function for getting searchParams
  const searchParams = useSearchParams();

  const handleFormSubmit = async (e) => {
    // preventing form to reload window
    e.preventDefault();

    // setting loading to true to show the loading spinner until any response is fetched
    setLoading(true);

    // getting id from search params
    const userId = searchParams.get("uI_V");

    if (NewPassword == ConfirmPassword) {
      // on form submit running the function which we have passed as a prop
      await resetPass(userId, NewPassword).then((value) => {
        // showing responses based on response we get from api
        if (value.success == true) {
          toast.success(value.message);

          // instead of router.push() we use router.replace() just because it doesnt enters history in browser
          router.replace("/login");
        } else {
          toast.error(value.message);
        }
      });
    } else {
      toast.success("Password Doesn't Matches");
    }
    // setting loading to false to hide the loading spinner when response is fetched
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md mt-5">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="rounded-xl border border-gray-200 bg-white dark:bg-dark-secondaryBackground dark:border-none shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-[#ed1c24] p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-dark-primaryText">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-dark-secondaryText">
              Enter the New Password
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="newpassword"
                    className="mb-2 block text-sm text-gray-600 dark:text-dark-primaryText"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={!showNewPass ? "password" : "text"}
                      id="newpassword"
                      name="newpassword"
                      value={NewPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="peer block w-full rounded-md border dark:text-black border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:bg-white"
                      required
                    />
                    <div
                      onClick={() => setshowNewPass(!showNewPass)}
                      className="cursor-pointer absolute right-2 top-[33%] text-black text-lg"
                    >
                      {showNewPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="mb-2 block text-sm text-gray-600 dark:text-dark-primaryText"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={!showConfirPass ? "password" : "text"}
                      id="confirmpassword"
                      name="confirmpassword"
                      value={ConfirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="peer block w-full rounded-md border dark:text-black border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:bg-white"
                      required
                    />
                    <div
                      onClick={() => setshowConfirPass(!showConfirPass)}
                      className="cursor-pointer absolute right-2 top-[33%] text-black text-lg"
                    >
                      {showConfirPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                  {NewPassword !== ConfirmPassword && (
                    <p className="text-xs text-red-500">
                      Password Doesn't Matches!
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${
                    NewPassword !== ConfirmPassword &&
                    "pointer-events-none opacity-70"
                  } inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-[#ed1c24] py-3 px-4 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#ed1c24] focus:ring-offset-2`}
                >
                  {!loading ? (
                    "Change Password"
                  ) : (
                    <LoadingSpinner color="white" size={15} thickness="2" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotResetPass;
