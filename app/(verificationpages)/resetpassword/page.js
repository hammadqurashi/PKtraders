import { notFound } from "next/navigation";
import React from "react";
import ForgotResetPass from "../ForgotResetPass";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";

const ResetPassword = async ({ searchParams }) => {
  const resetPass = async (userId, newPassword) => {
    "use server";
    const res = await fetch(
      `${process.env.HOST}/api/resetpassword?uI_V=${userId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ newPassword: newPassword }),
      }
    );
    return await res.json();
  };

  const userId = searchParams["uI_V"];

  if (!userId) {
    return notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner color="red" size={50} thickness={4} />}>
      <ForgotResetPass resetPass={resetPass} />
    </Suspense>
  );
};

export default ResetPassword;
