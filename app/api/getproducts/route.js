import connectDb from "../../../middleware/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// export function connectDb

export async function GET(request) {
  await connectDb();
  let products = await Product.find();
  let allItems = {};
  // for (let item of products) {
  //   if (item.title in allItems) {
  //     if (
  //       !allItems[item.title].color.includes(item.color) &&
  //       item.availableQty > 0
  //     ) {
  //       allItems[item.title].color.push(item.color);
  //     }
  //     if (
  //       !allItems[item.title].size.includes(item.size) &&
  //       item.availableQty > 0
  //     ) {
  //       allItems[item.title].size.push(item.size);
  //     }
  //   } else {
  //     allItems[item.title] = JSON.parse(JSON.stringify(item));
  //     if (item.availableQty > 0) {
  //       allItems[item.title].color = [item.color];
  //       allItems[item.title].size = [item.size];
  //     }
  //   }
  // }
  allItems = products.filter((item) => {
    return (item = item.availableQty !== 0);
  });

  return NextResponse.json(allItems);
}
