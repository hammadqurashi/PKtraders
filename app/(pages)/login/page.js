import React from "react";
import ClientLogin from "./ClientLogin";

const loginFunc = async (e, p) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: e, password: p }),
    cache: "no-cache",
  });
  return await res.json();
};

const LoginPage = async () => {
  return <ClientLogin userLogin={loginFunc} />;
};

export default LoginPage;
