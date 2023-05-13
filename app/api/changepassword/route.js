import { NextResponse } from "next/server";
import connectDb from "../../../dbconnection/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    let body = await request.json(); // getting body
    const { token, currentpassword, newpassword } = await body; // getting token, currentpassword, newpassword from body
    const data = jwt.verify(token, process.env.JWT_SECRET); // verifying token from body is valid and getting data from it
    let user = await User.findOne({ email: data.email }); // finding user in database from corresponding email

    // if such user is in the database
    if (user) {
      let bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET); // decrypting user password
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8); // decrypting user password
      // checking if user entered password matches the one password in database
      if (currentpassword == decryptedPassword) {
        await User.findOneAndUpdate(
          // updating new password from entered password
          { email: data.email },
          // saving password in database in encrypted form)
          {
            password: CryptoJS.AES.encrypt(
              newpassword,
              process.env.AES_SECRET
            ).toString(),
          }
        );

        // giving response true on password change
        return NextResponse.json(
          {
            success: true,
            message: "Password Successfully Changed",
          },
          { status: 200 }
        );
      } else {
        // if user entered password does not matches the one password in database
        return NextResponse.json({
          success: false,
          message: "Wrong Password",
        });
      }
    } else {
      // if such user is not in the database
      return NextResponse.json(
        {
          success: false,
          message: "Something Went Wrong",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    // Any other error occurs so
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
