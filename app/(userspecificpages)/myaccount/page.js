import React from "react";
import MyAccountClient from "./MyAccountClient";
import { cookies } from "next/headers";
import getUser from "@/functions/getUser";

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
            "content-type": "application/json",
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
            "content-type": "application/json",
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
  const token = cookieStore.get("token").value;

  // Getting UserDetails and passing it through props to client
  const userDetails = await getUser(token);
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
