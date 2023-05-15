import React from "react";
import MyOrdersClient from "./MyOrdersClient";

const fetchOrders = async (t) => {
  "use server";
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
  // const res = await fetchOrders(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSGFtbWFkIFF1cmFzaGkiLCJlbWFpbCI6ImRlbW91c2VyMTJAZ21haWwuY29tIiwiaWF0IjoxNjgzMzgxMDY1fQ.4HT9MYvFaneDuQa3msjrYG_o6UgDDN_7zaGfn_Z3dtg"
  // );
  // console.log(res);
  return <MyOrdersClient fetchOrders={fetchOrders} />; //
};

export default MyOrders;
