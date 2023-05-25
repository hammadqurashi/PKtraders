import connectDb from "@/dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    const body = await request.json();

    const {
      token,
      title,
      slug,
      desc,
      img,
      otherimgs,
      category,
      size,
      color,
      price,
      availableQty,
    } = body;

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails.name == verifyDetails.admin &&
      adminDetails.email == verifyDetails.email
    ) {
      let products = new Product({
        title: title,
        slug: slug,
        desc: desc,
        img: img,
        otherimgs: otherimgs,
        category: category,
        size: size,
        color: color,
        price: price,
        availableQty: availableQty,
      });
      await products.save();
      return NextResponse.json(
        { success: true, message: "Product Added Successfully" },
        { status: 200 }
      );
    } else {
      // if admin email and name in database DOESN'T matches with the jwt email and name(admin) then
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
