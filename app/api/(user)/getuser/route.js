import { NextResponse } from "next/server";
import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    // getting request body
    let body = await request.json();

    // taking out token from body
    const token = await body.token;

    // verifing token from request body
    let data = jwt.verify(token, process.env.JWT_SECRET);

    // getting user from email we get from data by token and from that data getting user
    const user = await User.findOne({ email: data.email });

    // destructuring data of user
    const { name, email, phone, address, city, country, zip, profilepic } =
      user;

    // giving response
    return NextResponse.json(
      {
        success: true,
        name,
        email,
        phone,
        address,
        city,
        country,
        zip,
        profilepic,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 500 });
  }
}
