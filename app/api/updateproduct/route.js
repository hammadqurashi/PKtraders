import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// export function connectDb

export async function POST(request) {
  await connectDb();
  const res = await request.json();
  await Product.findByIdAndUpdate(res._id, res);
  return NextResponse.json("Success", { status: 200 });
}
