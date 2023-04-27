import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

// export function connectDb

export async function POST(request) {
  await connectDb();
  try {
    const req = await request.json(); // getting the body of request

    const { email, password } = req; // destructuring email and password from request

    let user = await User.findOne({ email: email }); // finding user with email from request

    if (user) {
      var bytes = CryptoJS.AES.decrypt(user.password, "secret123"); // decrypting the user.password with the secret key used in encryption
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8); // getting the decrypted password

      // matching the decryptedPassword with password input in request
      if (user.email === email && decryptedPassword === password) {
        // If correct / Matched
        var token = jwt.sign(
          { user: user.name, email: user.email },
          "mysecret"
        );
        return NextResponse.json(
          { message: "Success", token },
          { status: 200 }
        );
      } else if (user.email !== email || decryptedPassword !== password) {
        // If Incorrect / Not Matched
        return NextResponse.json(
          { message: "Email Or Password Incorrect" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Email Or Password Incorrect" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occurred" }, { status: 500 });
  }
}
