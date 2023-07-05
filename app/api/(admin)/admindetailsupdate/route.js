import connectDb from "@/dbconnection/mongoose.js";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function PUT(request) {
  await connectDb();

  try {
    // getting request body
    const body = await request.json();

    // getting token from body
    const { token, name, email, profilePic } = body;

    // verifying admin from jwt
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // getting admin details from database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin occurs from jwt email then
    if (adminDetails) {
      // checking if details from jwt is equal to admin details of database
      // we are checking verifyDetails.admin because we have signed admin name as admin when logging in
      if (
        adminDetails._id == verifyDetails.id &&
        adminDetails.email == verifyDetails.email
      ) {
        // if details are verified then update according to request
        await Admin.findOneAndUpdate(
          { email: adminDetails.email },
          {
            name: name,
            email: email,
            profilePic: profilePic,
          }
        );

        const newToken = jwt.sign(
          {
            id: adminDetails._id,
            email: email,
          },
          process.env.ADMIN_JWT_SECRET
        );

        // giving response true when changes saved
        return NextResponse.json(
          {
            success: true,
            message: "Changes Saved Successfully",
            newToken: newToken,
          },
          { status: 200 }
        );
      }
    } else {
      // giving response false if details are not verified
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 401 }
      );
    }
  } catch (error) {
    // catching error
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
