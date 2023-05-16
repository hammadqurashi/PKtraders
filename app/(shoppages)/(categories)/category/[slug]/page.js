import React from "react";
import ShopPage from "../../ShopPage";
import Pagination from "@/components/Pagination";

const getProducts = async (category, page, items) => {
  // "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return json;
};

const Category = async ({ params }) => {
  const fetchedProducts = async (category, page) => {
    "use server";
    return await getProducts(category, page, 10);
  };

  const products = await getProducts(params.slug, 1, 10);

  return (
    <>
      {products.products.length > 0 ? (
        <ShopPage getProducts={fetchedProducts} category={params.slug} />
      ) : (
        <div className="container text-center font-bold text-2xl">
          We are Sold Out! Stay Tuned For More Products...
        </div>
      )}
    </>
  );
};

export default Category;
