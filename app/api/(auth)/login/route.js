import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

// todo admin login using

export async function POST(request) {
  await connectDb();
  try {
    const req = await request.json(); // getting the body of request

    const { email, password } = req; // destructuring email and password from request

    let user = await User.findOne({ email: email }); // finding user with email from request

    const admin = await Admin.findOne({ email: email }); // finding admin with email from request

    // if user with requested email occurs in database if not then check admin
    if (user) {
      // decrypting user password
      var bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET); // decrypting the user.password with the secret key used in encryption
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8); // getting the decrypted password

      // matching the decryptedPassword with password input in request
      if (user.email == email && decryptedPassword == password) {
        // If correct / Matched
        var token = jwt.sign(
          { user: user.name, email: user.email },
          process.env.JWT_SECRET
        );
        return NextResponse.json(
          { success: true, message: "Log In Successfully", token },
          { status: 200 }
        );
      } else if (user.email != email || decryptedPassword != password) {
        // If Incorrect / Not Matched
        return NextResponse.json(
          { success: false, message: "Email Or Password Incorrect" },
          { status: 403 }
        );
      }
    } else if (admin) {
      // if admin with the request email occurs in the database
      // Decrypting Admin Password
      var adminBytes = CryptoJS.AES.decrypt(
        admin.password,
        process.env.ADMIN_AES_SECRET
      );
      const decryptedAdminPassword = adminBytes.toString(CryptoJS.enc.Utf8);

      // checking if decrypted password of admin matches with the one entered in request body
      if (email == admin.email && password == decryptedAdminPassword) {
        const adminToken = jwt.sign(
          {
            admin: admin.name,
            email: admin.email,
          },
          process.env.ADMIN_JWT_SECRET
        );

        // giving success true with redirect url
        return NextResponse.json(
          {
            adminSuccess: true,
            message: "Admin Logged In Successfully",
            redirectUrl: `${process.env.ADMIN_DASHBOARD_URL}/redirect/${adminToken}`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Email Or Password Incorrect" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "An Error Occurred" },
      { status: 500 }
    );
  }
}
