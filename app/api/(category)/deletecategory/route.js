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

    // destructuring id from body
    const { token, _id } = body;

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails.name == verifyDetails.admin &&
      adminDetails.email == verifyDetails.email
    ) {
      // finding category by its id and deleting it
      await Category.findByIdAndDelete(_id);

      // if category is deleted giving response true with status 200
      return NextResponse.json(
        { success: true, message: "Category Deleted Successfully" },
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
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
