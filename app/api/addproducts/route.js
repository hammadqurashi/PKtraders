import connectDb from "../../../middleware/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// export function connectDb

export async function POST(request) {
  await connectDb();
  const res = await request.json();
  let products = new Product({
    title: res.title,
    slug: res.slug,
    desc: res.desc,
    img: res.img,
    otherimgs: res.otherimgs,
    category: res.category,
    size: res.size,
    color: res.color,
    price: res.price,
    availableQty: res.availableQty,
  });
  await products.save();
  return NextResponse.json("Success", { status: 200 });
}
