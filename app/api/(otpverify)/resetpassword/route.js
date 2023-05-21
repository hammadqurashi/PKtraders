import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request) {
  await connectDb();

  try {
    // getting request body
    const body = await request.json();

    const { newPassword } = body;

    // destructuring userId and otp from request body
    // have given uI_V (userId) to provide security that anyone can't know its a id of user in our data base
    const userId = request.nextUrl.searchParams.get("uI_V");

    // finding user by the id saved in the database
    const user = await User.findById(userId);

    // user is in the database then
    if (user) {
      // finding user by id and updating its new password by encrypting it with cryptojs
      await User.findByIdAndUpdate(userId, {
        password: CryptoJS.AES.encrypt(
          newPassword,
          process.env.AES_SECRET
        ).toString(),
      });
      return NextResponse.json(
        { success: true, message: "Password Changed SuccessFully" },
        { status: 200 }
      );
    } else {
      // else user doesn't exists in the database then
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!", error },
      { status: 500 }
    );
  }
}
