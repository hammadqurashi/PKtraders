import React from "react";
import ClientLogin from "./ClientLogin";

const loginFunc = async (loginDetails) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  return res.json();
};

const userLogin = async (loginDetails) => {
  "use server";
  let user = await loginFunc(loginDetails);
  return user;
};

const LoginPage = () => {
  return <ClientLogin userLogin={userLogin} />;
};

export default LoginPage;
