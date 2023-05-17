import { NextResponse } from "next/server";
import connectDb from "@/dbconnection/mongoose";
import Order from "@/models/Order";
export async function GET(request) {
  await connectDb();
  try {
    let id = request.nextUrl.searchParams.get("id");

    let orderDetails = await Order.findOne({
      _id: id,
    });

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
