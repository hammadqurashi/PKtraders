import React from "react";
import MyAccountClient from "./MyAccountClient";
import { cookies } from "next/headers";

const getUserDetails = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ token: token }),
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const MyAccount = async () => {
  const updateUserDetails = async (
    name,
    phone,
    address,
    city,
    country,
    zip,
    profilepic
  ) => {
    "use server";
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            token: token.value,
            name,
            address,
            city,
            country,
            phone: phone.toString(),
            zip: zip.toString(),
            profilepic,
          }),
          cache: "no-cache",
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (currentpassword, newpassword) => {
    "use server";
    try {
      // Getting Token From Cookies
      const cookieStore = cookies();
      const token = cookieStore.get("token");

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/changepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token.value,
            currentpassword,
            newpassword,
          }),
          cache: "no-cache",
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  // Getting Token From Cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // Getting UserDetails and passing it through props to client
  const userDetails = await getUserDetails(token.value);
  return (
    <>
      <MyAccountClient
        userDetails={userDetails}
        updateUserDetails={updateUserDetails}
        changePassword={changePassword}
      />
    </>
  );
};
export default MyAccount;
