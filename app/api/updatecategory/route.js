import connectDb from "../../../dbconnection/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    // connecting database
    await connectDb();

    // getting request body
    const body = await request.json();

    // destructuring name,slug,metadesc from body
    const { _id, name, slug, metaDesc } = body;

    // finding category by its id and updating it category
    await Category.findByIdAndUpdate(_id, {
      name: name,
      slug: slug,
      metaDesc: metaDesc,
    });

    // if category is updated giving response true with status 200
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
