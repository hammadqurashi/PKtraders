import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");

// export function connectDb

export async function POST(request) {
  await connectDb();
  const res = await request.json();
  const { name, email, password } = res;
  let user = new User({
    name: name,
    email: email,
    password: CryptoJS.AES.encrypt(password, "secret123").toString(),
  });
  await user.save();
  return NextResponse.json("Success", { status: 200 });
}
