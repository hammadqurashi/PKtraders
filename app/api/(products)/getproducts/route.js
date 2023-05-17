import connectDb from "@/dbconnection/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// api url eg: http://localhost:3000/api/getproducts?category=${category}&page=${page}&items=${items}
// category is mandatory if want to get all products set category to all
// page and items are optional but there default value will be then set to page=1 and items=10
export async function GET(request) {
  await connectDb();
  let products = await Product.find();

  const category = request.nextUrl.searchParams.get("category");
  const page = request.nextUrl.searchParams.get("page")
    ? request.nextUrl.searchParams.get("page")
    : 1;
  const itemsLimitPerPage = request.nextUrl.searchParams.get("items")
    ? request.nextUrl.searchParams.get("items")
    : 10;

  let allItems = {};

  // filtering the products and returning those only with available qty greater than 1
  // and matches the category with the given category in query
  // reversing the array to show the recent products first
  allItems = products.reverse().filter((item) => {
    return (item =
      item.availableQty !== 0 && category == "all"
        ? item
        : item.category == category);
  });

  // calculating total products on behalf after above filteration
  const totalProducts = allItems.length;

  // calculating total pages on behalf after above filteration
  const totalPages = Math.ceil(
    totalProducts / Number.parseInt(itemsLimitPerPage)
  );

  // calculating the start and end index based on page and itemsLimitPerPage
  const startIndex = (page - 1) * itemsLimitPerPage;
  const endIndex = page * itemsLimitPerPage;

  // slicing the products with calculated startIndex and endIndex
  const fetchedProducts = allItems.slice(startIndex, endIndex);

  return NextResponse.json({
    products: fetchedProducts,
    totalProducts,
    totalPages,
  });
}
