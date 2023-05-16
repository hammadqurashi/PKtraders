import connectDb from "../../../dbconnection/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // connecting with database
    await connectDb();

    // getting all categories
    const categories = await Category.find();

    // giving categories in response
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
