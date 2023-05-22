import React from "react";
import ClientSignUp from "./ClientSignUp";

const createAccount = async (userDetails) => {
  "use server";
  // SigningUp User Based On Details
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
    cache: "no-store",
  });
  return await res.json();
};

// const handleSignUp = async (userDetails) => {

//   const userAccount = await createAccount(userDetails);
//   return userAccount;
// };

const Signup = async () => {
  return <ClientSignUp userSignup={createAccount} />;
};

export default Signup;
