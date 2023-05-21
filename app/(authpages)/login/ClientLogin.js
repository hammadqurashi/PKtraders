"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "@/components/LoadingSpinner";

const ClientLogin = (props) => {
  // Initializing useRouter hook
  const router = useRouter();

  // state for loading shown when user submits sign in form

  const [loading, setLoading] = useState(false);

  // State for passwordshow button On/Off
  const [showPassword, setshowPassword] = useState(false);

  // State for login form details
  const [loginDetails, setloginDetails] = useState({
    email: "",
    password: "",
  });

  // Show password button function for password field
  const showPasswordFunc = () => {
    setshowPassword(showPassword === false ? true : false);
  };

  // Handle change function for email and password field
  const handleChange = (e) => {
    setloginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  // handleFormSubmit function for Submission of Form
  const handleFormSubmit = async (e) => {
    // Preventing From Reload
    e.preventDefault();

    // setting loading state true on form submit
    setLoading(true);

    try {
      // Logging In On Server Side and Passing Func As a Prop To CLient Side
      // Fetching User Details Based On Login
      const data = await props.userLogin(
        loginDetails.email,
        loginDetails.password
      );

      // setting loading state false on when promise resolve
      setLoading(false);

      // Setting Login Details of Form to initial
      setloginDetails({
        email: "",
        password: "",
      });

      // If SUCCESS then showing success toast
      if (data.success == true) {
        localStorage.setItem("token", data.token); // If success set token in LOCAL STORAGE

        document.cookie = `token=${data.token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;`; // Set Cookie

        toast.success("Login Successfully", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // if user successfully login then push to following link after 1 second in order to also show success toast
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}`);
        }, 1000);
      } else if (data.success == false) {
        toast.error(data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // Handling ERROR
      setloginDetails({
        email: "",
        password: "",
      });
      toast.error("Some Error Occurred", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-screen flex-wrap text-slate-800 dark:text-dark-primaryText">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
              Welcome back <br />
              to <span className="text-[#ed1c24]">PkTraders</span>
            </p>
            <p className="mt-6 text-center font-medium md:text-left">
              Sign in to your account below.
            </p>

            <form
              className="flex flex-col items-stretch pt-3 md:pt-8"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    name="email"
                    type="email"
                    id="login-email"
                    required
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white dark:bg-dark-primaryBackground py-2 px-4 text-base text-gray-700 dark:text-dark-primaryText placeholder-gray-400 dark:placeholder-dark-secondaryText focus:outline-none"
                    placeholder="Email"
                    value={loginDetails.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    required
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white dark:bg-dark-primaryBackground py-2 px-4 text-base text-gray-700 dark:text-dark-primaryText placeholder-gray-400 dark:placeholder-dark-secondaryText focus:outline-none"
                    placeholder="Password"
                    value={loginDetails.password}
                    onChange={handleChange}
                  />
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
              </div>
              <Link
                href="/forgotpassword"
                className="mb-6 inline-flex w-max text-center text-sm font-medium text-gray-600 dark:text-dark-secondaryText md:text-left"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-[#ed1c24] px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-offset-2 transition  focus:ring-2 md:w-32"
              >
                {loading ? (
                  <LoadingSpinner color="white" size={20} thickness="2" />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <div className="py-12 text-center">
              <p className="text-gray-600 dark:text-dark-secondaryText">
                Don't have an account?
                <Link
                  href="/signup"
                  className="ml-1 whitespace-nowrap font-semibold text-[#ed1c24] underline underline-offset-4"
                >
                  Sign up for free.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10">
              We work 10x faster than our compeititors and stay consistant.
              While they're bogged won with techincal debt, we're realeasing new
              features.
            </p>
            <p className="mb-4 text-3xl font-semibold">Hammad Qurashi</p>
            <p className="">Founder, PKTraders</p>
            <p className="mb-7 text-sm opacity-70">Trading WorldWide</p>
          </div>
          <img
            className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
            src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/05/14190804/e-commerce-.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
