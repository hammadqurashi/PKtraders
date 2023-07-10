import connectDb from "@/dbconnection/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDb();

    let id = request.nextUrl.searchParams.get("id");
    let slug = request.nextUrl.searchParams.get("slug");

    if (id) {
      const category = await Category.findById(id);
      if (category) {
        return NextResponse.json({ success: true, category }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, message: "NOT FOUND" },
          { status: 404 }
        );
      }
    }
    if (slug) {
      const category = await Category.findOne({ slug: slug });
      if (category) {
        return NextResponse.json({ success: true, category }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, message: "NOT FOUND" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
