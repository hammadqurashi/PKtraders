import connectDb from "@/dbconnection/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
const jwt = require("jsonwebtoken");
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dg9ywz9zc",
  api_key: "154199816871412",
  api_secret: process.env.CDN_SECRET,
});

export async function PUT(request) {
  try {
    // connecting database
    await connectDb();

    // getting request body
    const body = await request.json();

    // destructuring name,slug,metadesc from body
    const { token, _id, name, slug, pic, metaDesc } = body;

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
        pic,
        function (error, result) {
          return result;
        }
      );

      // finding category by its id and updating it category
      await Category.findByIdAndUpdate(_id, {
        name: name,
        slug: slug,
        pic: cdnUrl.url,
        metaDesc: metaDesc,
      });

      // if category is updated giving response true with status 200
      return NextResponse.json(
        {
          success: true,
          message: "Changes Saved Successfully!",
        },
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
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
