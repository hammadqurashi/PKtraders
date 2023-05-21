import React from "react";
import MyOrdersClient from "./MyOrdersClient";
import { cookies } from "next/headers";

const fetchOrders = async (t) => {
  const res = await fetch(`${process.env.HOST}/api/myorders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: t }),
    cache: "no-store",
  });
  return await res.json();
};

const MyOrders = async () => {
  const cookieStore = cookies();

  // fetching token from cookies
  const token = cookieStore.get("token").value;

  // fetching orders and then passing it through props
  const orders = await fetchOrders(token);

  return <MyOrdersClient myOrders={orders} />;
};

export default MyOrders;