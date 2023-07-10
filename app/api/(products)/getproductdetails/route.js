import connectDb from "@/dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  await connectDb();
  let id = request.nextUrl.searchParams.get("id");
  let product = await Product.findOne({ _id: id });

  return NextResponse.json(product);
}
