import { NextResponse } from "next/server";
import connectDb from "../../../dbconnection/mongoose";
import Order from "@/models/Order";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    let body = await request.json();
    const token = await body.token;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    let orders = await Order.find({ email: data.email });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
