"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

const ClientSignUp = (props) => {
  // use Router function from next
  const router = useRouter();

  // state for loading
  const [loading, setLoading] = useState();

  // State for passwordshow button On/Off
  const [showPassword, setshowPassword] = useState(false);

  // State for Signup form details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Show password button function for password field
  const showPasswordFunc = () => {
    setshowPassword(showPassword === false ? true : false);
  };

  // Handle change function for name, email and password field
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // handleFormSubmit function for Submission of Form
  const handleFormSubmit = async (e) => {
    // Preventing From Reload
    e.preventDefault();
    setLoading(true);
    try {
      const res = await props.userSignup(userDetails);

      // Setting Signup Details of Form to initial
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });

      // If SUCCESS then showing success toast
      if (res.success == true) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
      // if api doesnt hit correctly then catching error
    } catch (error) {
      // Setting Signup Details of Form to initial
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });

      // If ERROR then showing ERROR toast
      toast.error("Try Again Later!");
    }
    setLoading(false);
  };

  return (
    <>
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
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-dark-primaryBackground">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-dark-secondaryBackground shadow-lg sm:flex">
          <div
            className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
            style={{
              backgroundImage: `url(https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2022/04/E-commerce-App-JPG-File-scaled.jpg)`,
            }}
          ></div>
          <div className="w-full sm:w-3/5">
            <div className="p-8">
              <h1 className="text-3xl font-black text-slate-700 dark:text-dark-primaryText">
                Sign up
              </h1>
              <p className="mt-2 mb-5 text-base leading-tight text-gray-600 dark:text-dark-primaryText">
                Create an account and Trade World Wide
              </p>
              <form className="mt-8" onSubmit={handleFormSubmit} method="POST">
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 dark:text-dark-primaryText focus:border-[#ed1c24] focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={userDetails.name}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white dark:bg-dark-secondaryBackground px-2 text-sm text-gray-500 dark:text-dark-primaryText duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#ed1c24]"
                  >
                    {" "}
                    Enter Your Name{" "}
                  </label>
                </div>
                <div className="relative mt-2 w-full">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    required
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 dark:text-dark-primaryText focus:border-[#ed1c24] focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white dark:bg-dark-secondaryBackground px-2 text-sm text-gray-500 dark:text-dark-primaryText duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#ed1c24]"
                  >
                    {" "}
                    Enter Your Email{" "}
                  </label>
                </div>
                <div className="relative mt-2 w-full">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 dark:text-dark-primaryText focus:border-[#ed1c24] focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={userDetails.password}
                    onChange={handleChange}
                  />

                  <label
                    htmlFor="password"
                    className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white dark:bg-dark-secondaryBackground px-2 text-sm  text-gray-500 dark:text-dark-primaryText duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#ed1c24] "
                  >
                    {" "}
                    Enter Your Password
                  </label>
                  {!showPassword ? (
                    <AiFillEye
                      onClick={showPasswordFunc}
                      className="absolute right-2 top-[32%] cursor-pointer text-xl"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={showPasswordFunc}
                      className="absolute right-2 top-[32%] cursor-pointer text-xl"
                    />
                  )}
                </div>

                <button
                  className="mt-4 w-full cursor-pointer rounded-lg bg-[#ed1c24] pt-3 pb-3 text-white shadow-lg"
                  type="submit"
                >
                  {!loading ? (
                    "Create account"
                  ) : (
                    <LoadingSpinner size={15} thickness="2" color="white" />
                  )}
                </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-dark-secondaryText">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-[#ed1c24] no-underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSignUp;
