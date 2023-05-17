import connectDb from "@/dbconnection/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
export async function GET() {
  await connectDb();
  try {
    const allOrders = await Order.find();
    return NextResponse.json(allOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
