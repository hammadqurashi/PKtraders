import connectDb from "@/dbconnection/mongoose.js";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export const dynamic = "force-dynamic";

export async function GET(request) {
  await connectDb();

  try {
    // getting token from search params
    const token = await request.nextUrl.searchParams.get("token");

    // verifying details from token
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // getting admin from json web token email
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails._id == verifyDetails.id &&
      adminDetails.email == verifyDetails.email
    ) {
      return NextResponse.json(
        {
          success: true,
          message: "Welcome Admin!",
        },
        { status: 200 }
      );
    } else {
      // if admin email and name in database DOESN'T matches with the jwt email and name(admin) then
      return NextResponse.json(
        {
          success: false,
          message: "UnAuthorized Access!",
        },
        { status: 403 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something Went Wrong!",
      },
      { status: 500 }
    );
  }
}
