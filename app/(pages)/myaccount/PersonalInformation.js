"use client";
import React, { useEffect, useState } from "react";
const PersonalInformation = (props) => {
  const [countriesList, setcountriesList] = useState();
  // const [country, setcountry] = useState("");
  const [countryListDropDown, setcountryListDropDown] = useState(false);

  const { name, email, phone, address, city, country, zip } = props.userDetails;

  const [userDetails, setUserDetails] = useState({
    name: name,
    phone: phone,
    address: address,
    city: city,
    country: country,
    zip: zip,
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const showCountryList = (e) => {
    if (userDetails.country && userDetails.country.length >= 2) {
      fetch(`https://restcountries.com/v3.1/name/${userDetails.country}`)
        .then((res) => {
          return res.json();
        })
        .then((value) => {
          if (value.status == 404) {
            setcountryListDropDown(false);
          } else {
            setcountryListDropDown(true);
            setcountriesList(
              userDetails.country &&
                value.map((e) => {
                  return e.name.common;
                })
            );
          }
        })
        .catch((error) => {
          return console.log(error);
        });
    } else {
      setcountryListDropDown(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.updateUserDetails(
        userDetails.name,
        userDetails.phone,
        userDetails.address,
        userDetails.city,
        userDetails.country,
        userDetails.zip
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="container mx-auto bg-white dark:bg-dark-primaryBackground mt-10 rounded px-4"
      onSubmit={handleFormSubmit}
    >
      <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
          <p className="text-lg text-gray-800 dark:text-dark-primaryText font-bold">
            Personal Information
          </p>
          <div className="ml-2 cursor-pointer text-gray-600 dark:text-dark-secondaryText">
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
          <div className="md:w-1/3 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="name"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
              placeholder="Name"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="Email"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
            >
              Email
            </label>
            <div className="border shadow-sm rounded flex">
              <div className="px-4 py-3 dark:text-dark-primaryText flex items-center border-r">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x={3} y={5} width={18} height={14} rx={2} />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </div>
              <input
                type="text"
                id="Email"
                name="email"
                value={email}
                className="pl-3 cursor-not-allowed py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-dark-primaryText"
                placeholder="example@gmail.com"
                readOnly
              />
            </div>
            <div className="flex justify-between items-center pt-1 text-red-400">
              <p className="text-xs">Email cannot be changed!</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x-circle"
              >
                <circle cx={12} cy={12} r={10} />
                <line x1={15} y1={9} x2={9} y2={15} />
                <line x1={9} y1={9} x2={15} y2={15} />
              </svg>
            </div>
          </div>
          <div className="md:w-1/3 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="phone"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
              placeholder="Your Phone Number"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="StreetAddress"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
            >
              Street Address
            </label>
            <input
              type="text"
              id="StreetAddress"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
              placeholder="StreetAddress"
            />
          </div>
          <div className="md:w-1/4 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="City"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
            >
              City
            </label>
            <input
              type="text"
              id="City"
              name="city"
              value={userDetails.city}
              onChange={handleChange}
              className="border bg-transparent border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
              placeholder="Los Angeles"
            />
          </div>

          <div className="md:w-1/4 w-full flex flex-col mx-3 my-5">
            <label
              htmlFor="Country"
              className="pb-2 text-sm font-bold text-gray-800 dark:text-dark-primaryText"
            >
              Country
            </label>
            <input
              type="text"
              id="Country"
              name="country"
              value={userDetails.country}
              onChange={handleChange}
              autoComplete="off"
              className="border bg-transparent border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
              placeholder="Pakistan"
              onKeyDown={showCountryList}
            />
            {/* Country DropDown Starts */}
            <div className="relative">
              {/* If Countries List is present then show dropdown */}
              {countryListDropDown && (
                <div className="absolute top-full flex flex-col p-2 bg-black dark:bg-white text-white dark:text-black w-full">
                  {countriesList &&
                    countriesList.map((c) => {
                      return (
                        <span
                          key={c}
                          value={c}
                          onClick={() => {
                            setUserDetails({ ...userDetails, country: c }); // setting country to value on user click
                            setcountryListDropDown(false); // dropdown to false because user has selected country
                          }}
                          className="my-1 border-b-2 border-white dark:border-black hover:bg-gray-300 cursor-pointer"
                        >
                          {c}
                        </span>
                      );
                    })}
                </div>
              )}
            </div>
            {/* Country DropDown Ends */}
          </div>
          <div className="md:w-1/4 w-full flex flex-col mx-3 my-5">
            <div className="flex items-center pb-2">
              <label
                htmlFor="ZIP"
                className="text-sm font-bold text-gray-800 dark:text-dark-primaryText"
              >
                ZIP/Postal Code
              </label>
              <div className="ml-2 cursor-pointer text-gray-600 dark:text-dark-primaryText">
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
            <input
              type="text"
              name="zip"
              required
              id="ZIP"
              className="border bg-transparent border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
              placeholder={86745}
              value={userDetails.zip}
              onChange={handleChange}
            />
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
            className="bg-[#ed1c24] focus:outline-none transition duration-150 ease-in-out rounded text-white px-8 py-2 text-sm"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
