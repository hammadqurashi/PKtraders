import { NextResponse } from "next/server";
import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";

export async function GET(request) {
  await connectDb();
  try {
    const user = await User.find();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
