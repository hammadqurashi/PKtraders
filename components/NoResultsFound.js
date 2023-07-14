import React from "react";
import Image from "next/image";
import noResultsImg from "@/assets/noresults.jpg";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center font-bold text-2xl gap-4">
      <Image
        src={noResultsImg}
        width={200}
        height={200}
        alt="no results found"
      />
      <div>
        <h1 className="text-gray-800 dark:text-dark-primaryText text-3xl">
          Sorry! No results found:(
        </h1>
        <p className="text-gray-600 dark:text-dark-secondaryText text-sm text-center my-2">
          Try searching other keywords!
        </p>
      </div>
    </div>
  );
};

export default NoResultsFound;
