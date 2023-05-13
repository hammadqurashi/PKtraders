import { NextResponse } from "next/server";
import connectDb from "../../../dbconnection/mongoose";
import Order from "@/models/Order";

export async function POST(request) {
  await connectDb();
  try {
    const res = await request.json(); //Math.floor(Math.random() * Date.now())
    const { name, email, phone, payMethod, products, address, amount, city } =
      res;
    let order = new Order({
      name: name,
      email: email,
      phone: phone,
      orderId: Math.floor(Math.random() * Date.now()).toString(),
      payMethod: payMethod,
      paymentInfo: "Todo",
      products: products,
      address: address,
      city: city,
      amount: amount,
      status: "Pending",
    });
    await order.save();
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
