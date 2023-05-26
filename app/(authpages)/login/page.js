import React from "react";
import ClientLogin from "./ClientLogin";

const LoginPage = async () => {
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

  return <ClientLogin userLogin={loginFunc} />;
};

export default LoginPage;
