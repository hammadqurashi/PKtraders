import { NextResponse } from "next/server";
import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    let body = await request.json();
    const token = await body.token;
    let data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: data.email });

    const { name, email, phone, address, city, country, zip } = user;

    return NextResponse.json(
      { name, email, phone, address, city, country, zip },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
