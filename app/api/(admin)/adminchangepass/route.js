import connectDb from "@/dbconnection/mongoose.js";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import CryptoJS from "crypto-js";
export async function POST(request) {
  await connectDb();

  try {
    // getting body from request
    const body = await request.json();

    // destructuring body
    const { token, newPassword } = body;

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin with jwttoken email exists then
    if (adminDetails) {
      // checking if token name and email both are same with our database email and name then
      if (
        adminDetails._id == verifyDetails.id &&
        adminDetails.email == verifyDetails.email
      ) {
        // then finding Admin with email and changing password by hashing it
        await Admin.findOneAndUpdate(
          { email: adminDetails.email },
          {
            password: CryptoJS.AES.encrypt(
              newPassword,
              process.env.ADMIN_AES_SECRET
            ).toString(),
          }
        );
        // giving response true by changing password
        return NextResponse.json(
          { success: true, message: "Password Changed Successfully" },
          { status: 200 }
        );
      } else {
        //  if token name and email both are not same with our database email and name then
        return NextResponse.json(
          { success: false, message: "Forbidden" },
          { status: 403 }
        );
      }
    } else {
      // if admin with jwttoken email not exists then
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
