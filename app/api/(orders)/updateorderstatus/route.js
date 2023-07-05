import connectDb from "@/dbconnection/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();

  try {
    // getting request body
    const body = await request.json();

    // destructuring id and status from body
    const { token, _id, status } = body;

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails._id == verifyDetails.id &&
      adminDetails.email == verifyDetails.email
    ) {
      // updating order status by finding it by its id provided by body
      await Order.findByIdAndUpdate(_id, {
        status: status,
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // if admin email and name in database DOESN'T matches with the jwt email and name(admin) then
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!", error },
      { status: 500 }
    );
  }
}
