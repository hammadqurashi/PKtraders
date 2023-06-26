import connectDb from "@/dbconnection/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  try {
    // connecting database
    await connectDb();

    // getting request body
    const body = await request.json();

    // destructuring name,slug,metadesc and token of admin so anyone cant access api from body
    const { token, name, slug, pic, metaDesc } = body;

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails._id == verifyDetails.id &&
      adminDetails.email == verifyDetails.email
    ) {
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
      return NextResponse.json(
        { success: true, message: "Category Added Successfully" },
        { status: 200 }
      );
    } else {
      // if admin email and name in database DOESN'T matches with the jwt email and name(admin) then
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    // if any error occurred giving response false with error and status 500
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
