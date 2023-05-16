import Category from "@/models/Category";
import connectDb from "../../../dbconnection/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // connecting database
    await connectDb();

    // getting request body
    const body = await request.json();

    // destructuring name,slug,metadesc from body
    const { name, slug, pic, metaDesc } = body;

    // making new category
    const category = new Category({
      name: name,
      slug: slug,
      pic: pic,
      metaDesc: metaDesc,
    });

    // saving category
    await category.save();

    // if category is saved giving response true with status 200
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // if any error occurred giving response false with error and status 500
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
