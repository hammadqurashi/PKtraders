import { NextResponse } from "next/server";
import connectDb from "../../../middleware/mongoose";
import Order from "@/models/Order";

export async function GET(request) {
  await connectDb();
  try {
    let orders = await Order.findOne({});
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
