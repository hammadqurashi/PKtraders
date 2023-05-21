import { notFound } from "next/navigation";
import React from "react";
import ForgotResetPass from "../ForgotResetPass";

const resetPass = async (userId, newPassword) => {
  "use server";
  const res = await fetch(
    `${process.env.HOST}/api/resetpassword?uI_V=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: newPassword }),
    }
  );
  return await res.json();
};

const ResetPassword = ({ searchParams }) => {
  // this is the verification search param which is sent to user in button link in order to secure the reset password
  const authVerify = searchParams["60g8w324wtmwbzvh1i4s"];

  if (authVerify != "o1nxp2vi0mupm9cko8shvit2ck7rtgi5osaqkd6g") {
    return notFound();
  }

  return <ForgotResetPass resetPass={resetPass} />;
};

export default ResetPassword;
