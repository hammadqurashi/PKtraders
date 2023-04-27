import { NextResponse } from "next/server";

const https = require("https");
const PaytmChecksum = require("paytmchecksum");

export async function POST(request) {
  try {
    const body = await request.json(); // Getting request body

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.PAYTM_MID, // Getting merchand id from .env.local
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: body.oid, // Getting orderID from request body
      callbackUrl: `${process.env.HOST}/api/posttransaction`, // Giving callback from api posttransaction
      txnAmount: {
        value: body.subtotal,
        currency: "INR",
      },
      userInfo: {
        custId: body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsnyc = () => {
      return new Promise((resolve, reject) => {
        try {
          var options = {
            /* for Staging */
            hostname: "securegw-stage.paytm.in",
            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${body.oid}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };

          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });

            post_res.on("end", function () {
              console.log("Response: ", response);
              resolve(body);
            });
          });

          post_req.write(post_data);
          post_req.end();
        } catch (error) {
          reject(error);
        }
      });
    };

    let myr = await requestAsnyc();
    console.log(myr);
    return NextResponse.json(myr);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
