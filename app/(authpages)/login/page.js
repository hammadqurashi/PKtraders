import React from "react";
import ClientLogin from "./ClientLogin";
import { headers } from "next/headers";

const loginFunc = async (email, password) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
    cache: "no-cache",
  });
  return await res.json();
};

const LoginPage = async () => {
  return <ClientLogin userLogin={loginFunc} />;
};

export default LoginPage;
