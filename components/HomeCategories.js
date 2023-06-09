import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomeCategories = ({ categories }) => {
  return (
    <div className="bg-white dark:bg-dark-primaryBackground py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-dark-primaryText  md:mb-12 lg:text-3xl">
          Categories
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2">
          {/* <!-- product - start --> */}
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group relative flex h-40 md:h-56 items-end overflow-hidden rounded-lg bg-gray-100 dark:bg-dark-primaryBackground p-4 shadow-lg"
                >
                  <Image
                    src={category.pic}
                    width={500}
                    height={100}
                    alt={category.name}
                    className="absolute inset-0 h-auto w-auto object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="relative flex w-full flex-col rounded-lg bg-white dark:bg-dark-secondaryBackground p-4 text-center">
                    <span className="capitalize text-lg font-bold text-gray-800 dark:text-dark-primaryText lg:text-xl">
                      {category.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          {/* <!-- product - end --> */}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
