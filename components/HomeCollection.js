import React from "react";
import Link from "next/link";

const HomeCollection = () => {
  return (
    // <><!-- collections - start -->
    <div className="bg-white dark:bg-dark-primaryBackground py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-dark-primaryText  md:mb-12 lg:text-3xl">
          Collections
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {/* <!-- product - start --> */}
          <div>
            <Link
              href="/tshirts"
              className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 dark:bg-dark-primaryBackground p-4 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                loading="lazy"
                alt="Photo by Austin Wade"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="relative flex w-full flex-col rounded-lg bg-white dark:bg-dark-secondaryBackground p-4 text-center">
                <span className="text-lg font-bold text-gray-800 dark:text-dark-primaryText lg:text-xl">
                  T-Shirts
                </span>
              </div>
            </Link>
          </div>
          {/* <!-- product - end --> */}

          {/* <!-- product - start --> */}
          <div>
            <Link
              href="/hoodies"
              className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/1775/6429/products/YLA10.29.22Johnny-98_800x.jpg?v=1666901743"
                loading="lazy"
                alt="Photo by engin akyurt"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="relative flex w-full flex-col rounded-lg bg-white dark:bg-dark-secondaryBackground p-4 text-center">
                <span className="text-lg font-bold text-gray-800 dark:text-dark-primaryText lg:text-xl">
                  Hoodies
                </span>
              </div>
            </Link>
          </div>
          {/* <!-- product - end --> */}

          {/* <!-- product - start --> */}
          <div>
            <Link
              href="/sweatshirts"
              className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1610222034376-8dd1149e0e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN3ZWF0c2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                loading="lazy"
                alt="Photo by Austin Wade"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="relative flex w-full flex-col rounded-lg bg-white dark:bg-dark-secondaryBackground p-4 text-center">
                <span className="text-lg font-bold text-gray-800 dark:text-dark-primaryText lg:text-xl">
                  Sweat shirts
                </span>
              </div>
            </Link>
          </div>
          {/* <!-- product - end --> */}

          {/* <!-- product - start --> */}
          <div>
            <Link
              href="caps"
              className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1589831377283-33cb1cc6bd5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fwc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                loading="lazy"
                alt="Photo by Austin Wade"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="relative flex w-full flex-col rounded-lg bg-white dark:bg-dark-secondaryBackground p-4 text-center">
                <span className="text-lg font-bold text-gray-800 dark:text-dark-primaryText lg:text-xl">
                  Caps
                </span>
              </div>
            </Link>
          </div>
          {/* <!-- product - end --> */}
        </div>
      </div>
    </div>
    // <!-- collections - end --></>
  );
};

export default HomeCollection;
