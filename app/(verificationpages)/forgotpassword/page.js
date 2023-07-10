import React from "react";
import ForgotPassForm from "../ForgotPassForm";

const ForgotPassword = async () => {
  const sendResetLink = async (email) => {
    "use server";
    const res = await fetch(`${process.env.HOST}/api/forgotpasssendlink`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
      cache: "no-store",
    });
    return await res.json();
  };

  return (
    <>
      <ForgotPassForm sendResetLink={sendResetLink} />
    </>
  );
};

export default ForgotPassword;
