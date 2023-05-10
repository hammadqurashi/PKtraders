import { NextResponse } from "next/server";
import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    let body = await request.json();
    const { token, name, phone, address, city, country, zip } = await body;
    let data = jwt.verify(token, process.env.JWT_SECRET);
    await User.findOneAndUpdate(
      { email: data.email },
      {
        name: name,
        phone: Number.parseInt(phone), // Taking user input as a string and then saving it as integer because leading zeros in json can cause error
        address: address,
        city: city,
        country: country,
        zip: Number.parseInt(zip), // Taking user input as a string and then saving it as integer because leading zeros in json can cause error
      }
    );

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
