import connectDb from "@/dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  await connectDb();
  let parameter = request.nextUrl.searchParams.get("product");
  let product = await Product.findOne({ slug: parameter });

  return NextResponse.json(product);
}
