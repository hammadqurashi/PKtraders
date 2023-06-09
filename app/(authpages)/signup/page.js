import React from "react";
import ClientSignUp from "./ClientSignUp";

const Signup = async () => {
  const createAccount = async (userDetails) => {
    "use server";
    // SigningUp User Based On Details
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
      cache: "no-store",
    });
    return await res.json();
  };

  return <ClientSignUp userSignup={createAccount} />;
};

export default Signup;
