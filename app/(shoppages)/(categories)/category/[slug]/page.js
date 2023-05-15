import React from "react";
import ShopPage from "../../ShopPage";
import Pagination from "@/components/Pagination";

const getProducts = async (category, page) => {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?category=${category}&page=${page}&items=10`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return json;
};

const Category = async ({ params }) => {
  return (
    <>
      <ShopPage getProducts={getProducts} category={params.slug} />
    </>
  );
};

export default Category;
