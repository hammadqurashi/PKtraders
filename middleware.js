import { NextResponse } from "next/server";
export default middleware = (request) => {
  if (
    request.nextUrl.pathname.startsWith("/login") &&
    request.cookies.has("token")
  ) {
    return NextResponse.redirect(`${process.env.HOST}`);
  }
  if (
    request.nextUrl.pathname.startsWith("/forgotpassword") &&
    request.cookies.has("token")
  ) {
    return NextResponse.redirect(`${process.env.HOST}`);
  }
  if (
    request.nextUrl.pathname.startsWith("/myaccount") &&
    !request.cookies.has("token")
  ) {
    return NextResponse.redirect(`${process.env.HOST}`);
  }
  if (
    request.nextUrl.pathname.startsWith("/orders") &&
    !request.cookies.has("token")
  ) {
    return NextResponse.redirect(`${process.env.HOST}`);
  }
};
