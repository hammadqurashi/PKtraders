"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import getCategories from "@/functions/getCategories";

const Footer = () => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <footer
      className={`text-gray-600 mt-20 dark:text-dark-secondaryText body-font dark:border-t-black`}
    >
      <div className="dark:bg-dark-primaryBackground container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          {/* <!-- logo - start --> */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl dark:text-dark-primaryText text-black"
            aria-label="logo"
          >
            <Image
              src={"/brandlogo.png"}
              width={50}
              height={50}
              priority
              alt="brandlogo"
            />
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </Link>
          {/* <!-- logo - end --> */}
          <p className="mt-2 px-4 text-sm dark:text-dark-primaryText">
            Trade around the World Safely With Pakistani Traders.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 dark:text-dark-primaryText tracking-widest text-sm mb-3">
              SHOP
            </h2>
            <nav className="list-none mb-10">
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <li key={category._id}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="hover:text-gray-800 dark:hover:text-dark-primaryText capitalize"
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 dark:text-dark-primaryText tracking-widest text-sm mb-3">
              GET TO KNOW US
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Careers
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  About {process.env.NEXT_PUBLIC_SITE_TITLE}
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Blogs
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Investor Relations
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 dark:text-dark-primaryText tracking-widest text-sm mb-3">
              MAKE MONEY WITH US
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Sell products on Amazon
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Self-Publish with Us
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 dark:text-dark-primaryText tracking-widest text-sm mb-3">
              OTHER USEFUL LINKS
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Customer Care
                </a>
              </li>
              <li>
                <a className="dark:hover:text-dark-primaryText hover:text-gray-800">
                  Help
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-dark-secondaryBackground ">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_TITLE}
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
