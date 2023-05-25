import { notFound } from "next/navigation";
import React from "react";
import ForgotResetPass from "../ForgotResetPass";
const jwt = require("jsonwebtoken");
import User from "@/models/User";
import connectDb from "@/dbconnection/mongoose";

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

const ResetPassword = async ({ searchParams }) => {
  const userId = searchParams["uI_V"];

  if (!userId) {
    return notFound();
  }

  return <ForgotResetPass resetPass={resetPass} />;
};

export default ResetPassword;
