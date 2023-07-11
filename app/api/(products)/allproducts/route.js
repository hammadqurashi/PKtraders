import connectDb from "@/dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// api url eg: http://localhost:3000/api/allproducts
export async function GET(request) {
  await connectDb();
  try {
    let products = await Product.find();

    const fetchedProducts = products.reverse();

    const totalProducts = fetchedProducts.length;

    return NextResponse.json(
      {
        products: fetchedProducts,
        totalProducts,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        products: fetchedProducts,
        totalProducts,
        success: false,
      },
      { status: 500 }
    );
  }
}
