import connectDb from "../../../dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDb();
  try {
    const res = await request.json();
    await Product.findByIdAndUpdate(res._id, res);
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
