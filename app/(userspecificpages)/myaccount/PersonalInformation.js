"use client";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalInformation = (props) => {
  // state for confirmation popup
  const [showConfirmation, setshowConfirmation] = useState(false);
  // state for confirmation popup loading
  const [loading, setLoading] = useState(false);

  // State for countries list and countriesdropdown show
  const [countriesList, setcountriesList] = useState();
  const [countryListDropDown, setcountryListDropDown] = useState(false);

  // destructuring props
  const { name, email, phone, address, city, country, zip, profilepic } =
    props.userDetails;

  const [userDetails, setUserDetails] = useState({
    name: name,
    phone: phone,
    address: address,
    city: city,
    country: country,
    zip: zip,
    profilepic: profilepic,
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // ref for profile pic upload div
  const uploadProfilePicRef = useRef();

  // ref for profile pic input
  const inputProfilePicRef = useRef();

  // states for profile pic details
  const [picName, setPicName] = useState("");
  const [profilepicLoading, setprofilepicLoading] = useState(false); // Div Of Loading Progress is initially set to false("hidden") and will set to true when progress starts of file uploading
  const [profilepicLoadingStatus, setprofilepicLoadingStatus] =
    useState("Uploading");
  const [profilepicLoadingProgress, setprofilepicLoadingProgress] =
    useState("");

  // upload Profile Picture Function
  const uploadImageFunc = (e) => {
    let file = inputProfilePicRef.current.files[0];
    if (file) {
      // if file type is equals to jpeg or png then:
      if (
        (file.type == "image/jpeg" || file.type == "image/png") &&
        file.size < 3000001
      ) {
        // showing the name of file to user
        setPicName(file.name);

        // showing the profile pic loading to user
        setprofilepicLoading(true);

        const reader = new FileReader();

        // reading profile pic as data url
        reader.readAsDataURL(file);

        reader.onprogress = (e) => {
          // On progress start setting the loading status to "Uploading"
          setprofilepicLoadingStatus("Uploading");

          // If the event length is computable then
          if (e.lengthComputable) {
            setprofilepicLoadingProgress(
              ((e.total / e.loaded) * 100).toString() // setting the loading progress how much the image is loaded
            );
          }

          // On progress complete setting the loading status to "Completed"
          (e.total / e.loaded) * 100 == 100 &&
            setprofilepicLoadingStatus("Completed");
        };

        // setting the profile pic url on load
        reader.onload = () => {
          let img = document.createElement("img");
          img.src = reader.result;
          // waiting for image to load
          img.onload = () => {
            // creating canvas element
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            // setting canvas width and height
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            //finally creating url by compressing image size with canvas.toDataURL
            let url = canvas.toDataURL(file.type, 0.5);

            //setting profile pic in userdetails
            setUserDetails({
              ...userDetails,
              profilepic: url,
            });
          };

          // hiding profile pic upload modal when image is loaded
          uploadProfilePicRef.current.classList.add("hidden"); // hiding the upload form modal on image uploaded
        };
      } else {
        // if file types are not equal to jpeg or png then show this error:
        file.type != "image/jpeg" &&
          file.type != "image/png" &&
          toast.error("Only Jpeg And Png files are allowed", {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        // if file size is greater than 3mb then show this error:
        file.size > 3000000 &&
          toast.error("Max Upload Size is 3MB", {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
    } else {
      // if user hasn't selected any file then
      return;
    }
  };

  // Show Country List Function
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

  // On submit form function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setshowConfirmation(true);
  };

  // Will run when user click on "yes" in Confirm Changes Popup
  const confirmChangesTrue = async () => {
    try {
      setLoading(true);

      //updating changes
      await props.updateUserDetails(
        userDetails.name,
        userDetails.phone,
        userDetails.address,
        userDetails.city,
        userDetails.country,
        userDetails.zip,
        userDetails.profilepic
      );

      setLoading(false);

      //hiding confirmation popup
      setshowConfirmation(false);

      //showing success toast on success
      toast.success("Changes Saved Successfully", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      //showing error toast on error
      toast.error("Some Error Occurred", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ConfirmationPopup
        functionality="save"
        NoFunc={() => {
          setshowConfirmation(false); //hiding confirmation popup when clicks on No Button
        }}
        YesFunc={confirmChangesTrue}
        msg="Save Changes?"
        showConfirmation={showConfirmation}
        loading={loading}
      />
      <form
        className="container mx-auto bg-white dark:bg-dark-primaryBackground mt-10 rounded px-4"
        onSubmit={handleFormSubmit}
      >
        <div className="container mx-auto bg-white dark:bg-dark-primaryBackground rounded">
          <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-dark-primaryBackground">
            <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
              <p className="text-lg text-gray-800 dark:text-dark-primaryText font-bold">
                Profile
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
                    className="shrink-0 inline-block w-32 rounded-md bg-gray-700 px-1 py-1 font-normal shadow"
                    role="tooltip"
                  >
                    <p className="text-xs text-gray-100">
                      Update your Personal information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="w-11/12 md:w-full mx-auto xl:mx-0">
              <div className="rounded relative mt-8 h-48">
                <img
                  src={"/home.png"}
                  alt="abc"
                  className="h-full w-full object-cover rounded absolute shadow"
                />
                <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                {/* Profile Pic Portion Starts*/}
                <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                  <img
                    src={
                      !userDetails.profilepic
                        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
                        : userDetails.profilepic
                    }
                    alt="abc"
                    className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                  />
                  <div className="relative flex flex-col w-full h-full z-10">
                    <div className="bg-gray-500 cursor-pointer p-1 rounded-full absolute right-0 bottom-0">
                      <svg
                        onClick={
                          () =>
                            uploadProfilePicRef.current.classList.toggle(
                              "hidden"
                            ) // showing upload modal on edit btn click
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit text-white"
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
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Profile Pic Upload Form Starts */}
                <div
                  ref={uploadProfilePicRef}
                  className="hidden fixed top-[10%] z-[50] right-0 left-0 bottom-0 w-[100vw] h-[100vh]"
                >
                  <div className="sm:w-[32rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white dark:bg-dark-primaryBackground sm:max-w-lg">
                    <div className="relative bg-[#ed1c24] py-6 pl-8 text-xl font-semibold uppercase tracking-wider text-white">
                      Upload Files
                      <svg
                        onClick={
                          () =>
                            uploadProfilePicRef.current.classList.add("hidden") // hiding modal on cross click
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 right-0 m-5 h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="space-y-4 px-8 py-10">
                      {profilepicLoading && (
                        <div className="">
                          <span className="text-gray-600 dark:text-dark-primaryText">
                            {picName}
                          </span>
                          <div className="h-2 overflow-hidden rounded-full bg-gray-300">
                            <div
                              className={`h-full w-${
                                profilepicLoadingProgress + "%"
                              } bg-[#ed1c24]`}
                            ></div>
                          </div>
                          <p className="text-sm text-[#ed1c24]">
                            {profilepicLoadingStatus}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10">
                        <p className="mt-4 text-center text-xl font-medium text-gray-800 dark:text-dark-primaryText">
                          Drop Files here or
                          <label className="cursor-pointer shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-[#ed1c24] shadow">
                            <input
                              ref={inputProfilePicRef}
                              onChange={uploadImageFunc}
                              className="hidden"
                              type="file"
                              accept="image/*"
                              name="file"
                              id=""
                            />
                            Upload Image
                          </label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Profile Pic Upload Form Ends */}
                {/* Profile Pic Portion Ends*/}
              </div>
            </div>
          </div>
        </div>
        {/* Personal Info Starts */}
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
                className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
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
                className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
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
                className="border border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
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
                className="border bg-transparent border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
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
                className="border bg-transparent border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
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
                id="ZIP"
                className="border bg-transparent border-gray-300 dark:border-dark-secondaryText pl-3 py-3 shadow-sm rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-dark-primaryText"
                placeholder={86745}
                value={userDetails.zip}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Personal Info Ends */}
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
    </>
  );
};

export default PersonalInformation;
