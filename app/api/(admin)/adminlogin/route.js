import connectDb from "@/dbconnection/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  try {
    await connectDb();

    // getting body of request
    const body = await request.json();

    // destructuring email and password from body
    const { email, password } = body;
    console.log(password);
    // checking if admin occurs with this email
    const admin = await Admin.findOne({ email: email });

    // if admin with entered email occurs
    if (admin) {
      // then decrypting password
      var bytes = CryptoJS.AES.decrypt(
        admin.password,
        process.env.ADMIN_AES_SECRET
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      // and then matching decrypted password of admin saved in database with user entered password
      // we have not compared emails because if the user given email matches with taht of admin then this if block statement will open
      if (password == decryptedPassword) {
        // if password matches then
        const token = jwt.sign(
          {
            email: admin.email,
            id: admin._id,
          },
          process.env.ADMIN_JWT_SECRET
        );

        // giving response
        return NextResponse.json(
          { success: true, message: "Login Successfull", token },
          { status: 200 }
        );
      } else {
        // if password does NOT matches then
        return NextResponse.json(
          { success: false, message: "Invalid Credentials" },
          { status: 403 }
        );
      }
    } else {
      // if admin with entered email doesnot occurs
      return NextResponse.json(
        { success: false, message: "Invalid Credentials" },
        { status: 404 }
      );
    }
  } catch (error) {
    // handling error
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
