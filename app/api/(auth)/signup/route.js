import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");

// export function connectDb

export async function POST(request) {
  await connectDb();
  try {
    const res = await request.json();
    const { name, email, password } = res;
    let user = new User({
      name: name,
      email: email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.AES_SECRET
      ).toString(),
    });
    await user.save();
    return NextResponse.json(
      { success: true, message: "Account has been created" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
