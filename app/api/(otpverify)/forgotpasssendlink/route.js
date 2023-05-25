import connectDb from "@/dbconnection/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const fs = require("fs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    const body = await request.json(); // getting the body of request

    const { email } = body; // destructuring email and password from request

    let user = await User.findOne({ email: email }); // finding user with email from request

    if (user) {
      // signing userid with jwt and will send in reset password link
      const userId = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.elasticemail.com",
          port: 587,
          // secure: false, // true for 465, false for other ports
          auth: {
            user: "digicorpoofficial@gmail.com", // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
          },
        });

        const emailTemplate = await fs.promises
          .readFile("components/EmailTemplate.html", "utf8")
          .then((data) => {
            data = data.replace("{userID}", userId);
            return data;
          });

        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: "digicorpoofficial@gmail.com", // sender address
          to: user.email, // list of receivers ( We are sending to body request user's email)
          subject: "Reset Password | PKTraders", // Subject line
          html: emailTemplate, // html body
        });

        return NextResponse.json(
          { success: true, message: "Email Sent Successfully", info },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "An Unexpected Error Occurs", error },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error, message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
