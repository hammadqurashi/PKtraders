import connectDb from "@/dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
const jwt = require("jsonwebtoken");
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dg9ywz9zc",
  api_key: "154199816871412",
  api_secret: process.env.CDN_SECRET,
});

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
      adminDetails._id == verifyDetails.id &&
      adminDetails.email == verifyDetails.email
    ) {
      const cdnUrl = await cloudinary.v2.uploader.upload(
        img,
        function (error, result) {
          return result;
        }
      );

      let products = new Product({
        title: title,
        slug: slug,
        desc: desc,
        img: cdnUrl.url,
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
      { success: false, message: "Something Went Wrong!", error },
      { status: 500 }
    );
  }
}
