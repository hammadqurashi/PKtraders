import connectDb from "@/dbconnection/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDb();

    let id = request.nextUrl.searchParams.get("id");
    let slug = request.nextUrl.searchParams.get("slug");

    if (id) {
      const category = await Category.findById(id);
      return NextResponse.json({ success: true, category }, { status: 200 });
    } else {
      const category = await Category.findOne({ slug: slug });
      return NextResponse.json({ success: true, category }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
