import connectDb from "@/dbconnection/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();

  try {
    const body = await request.json();

    const { name, email, password } = body;

    const admin = new Admin({
      name: name,
      email: email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.ADMIN_AES_SECRET
      ).toString(),
    });

    await admin.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 500 });
  }
}
