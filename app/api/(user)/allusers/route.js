import { NextResponse } from "next/server";
import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
import Admin from "@/models/Admin";
const jwt = require("jsonwebtoken");

export async function GET(request) {
  await connectDb();
  try {
    // getting token from searchParams
    const token = await request.nextUrl.searchParams.get("token");

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails._id == verifyDetails.id &&
      adminDetails.email == verifyDetails.email
    ) {
      // finding all users
      const users = await User.find();

      // reversing array to get latest users first
      const allUsers = users.reverse();

      return NextResponse.json({ success: true, allUsers }, { status: 200 });
    } else {
      // if admin email and name in database DOESN'T matches with the jwt email and name(admin) then
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
