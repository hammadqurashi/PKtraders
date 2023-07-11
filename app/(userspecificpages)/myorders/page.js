import React from "react";
import MyOrdersClient from "./MyOrdersClient";
import { cookies } from "next/headers";
import fetchMyOrders from "@/functions/fetchMyOrders";

const MyOrders = async () => {
  const cookieStore = cookies();

  // fetching token from cookies
  const token = cookieStore.get("token").value;

  // fetching orders and then passing it through props
  const orders = await fetchMyOrders(token);

  return orders && orders.length > 0 ? (
    <MyOrdersClient myOrders={orders} />
  ) : (
    <div className="my-6 text-lg container text-center">
      You haven't Placed Any Order Yet!
    </div>
  );
};

export default MyOrders;
