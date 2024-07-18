import { NextResponse } from "next/server";
import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    let body = await request.json();
    const { subscription_tier, email, status } = body;

    const user = new User({
      name: subscription_tier,
      email: email,
      password: status, // Taking user input as a string and then saving it as integer because leading zeros in json can cause error
    });

    await user.save();

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
