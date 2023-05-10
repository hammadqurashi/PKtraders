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
  });
  const data = await res.json();
  return data;
};

const updateUserDetails = async (name, phone, address, city, country, zip) => {
  "use server";
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
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
    }),
  });
  return await res.json();
};

const MyAccount = async () => {
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
      />
    </>
  );
};
export default MyAccount;
