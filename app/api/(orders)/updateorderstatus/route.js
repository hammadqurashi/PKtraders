import connectDb from "@/dbconnection/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDb();

  try {
    // getting request body
    const body = await request.json();

    // destructuring id and status from body
    const { _id, status } = body;

    // updating order status by finding it by its id provided by body
    await Order.findByIdAndUpdate(_id, {
      status: status,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
