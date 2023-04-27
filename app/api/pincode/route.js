import { NextResponse } from "next/server";

export async function GET(request) {
  let arr = [5400, 74600];
  return NextResponse.json(arr);
}
