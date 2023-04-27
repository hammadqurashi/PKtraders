import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// export function connectDb

export async function GET(request) {
  await connectDb();
  let parameter = request.nextUrl.searchParams.get("product");
  let product = await Product.findOne({ slug: parameter });

  return NextResponse.json(product);
}
