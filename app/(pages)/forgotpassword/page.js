"use client";
import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  // Initializing useRouter hook
  const router = useRouter();

  return (
    <>
      <div className="mx-auto max-w-md mt-5">
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
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-dark-secondaryText">
                Don't worry we'll send you reset instructions.
              </p>
            </div>

            <div className="mt-6">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-600 dark:text-dark-primaryText"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="peer block w-full rounded-md border dark:text-black border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:bg-white"
                        required
                        aria-describedby="email-error"
                      />
                      <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                        <svg
                          className="h-5 w-5 text-rose-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                      <p
                        className="mt-2 hidden text-xs text-rose-600 peer-invalid:block"
                        id="email-error"
                      >
                        Valid email address required for the account recovery
                        process
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-[#ed1c24] py-3 px-4 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#ed1c24] focus:ring-offset-2"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
          <span className="inline pl-1 pr-3 text-sm text-gray-600 dark:text-dark-secondaryText">
            Remember your password?
            <Link
              className="font-medium text-[#ed1c24] decoration-2 hover:underline"
              href="/login"
            >
              {" "}
              Sign in here{" "}
            </Link>
          </span>
          <a
            className="pl-3 text-sm text-gray-600 dark:text-dark-secondaryText decoration-2 hover:underline"
            href="#"
            target="_blank"
          >
            {" "}
            Contact Support{" "}
          </a>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
