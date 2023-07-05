import React from "react";
import ShopPage from "../../ShopPage";
import soldoutImg from "@/assets/soldout.jpg";
import Image from "next/image";

const getProducts = async (category, page, items) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return json;
};

const getCategoryDetails = async (slug) => {
  const res = await fetch(
    `${process.env.HOST}/api/getcategorydetails?slug=${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (data.success == true) {
    return data.category;
  } else {
    return;
  }
};

const Category = async ({ params, searchParams }) => {
  const categoryDetails = await getCategoryDetails(params.slug);

  const fetchedProducts = async (category, page) => {
    "use server";

    return await getProducts(category, page, 10);
  };

  const products = await getProducts(params.slug, 1, 10);

  return (
    <>
      {products.products.length > 0 ? (
        <ShopPage
          getProducts={fetchedProducts}
          firstPageProducts={products.products}
          totalPages={products.totalPages}
          category={params.slug}
          categoryDetails={categoryDetails}
        />
      ) : (
        <div className="flex justify-center items-center font-bold text-2xl">
          <Image src={soldoutImg} width={500} height={500} />
        </div>
      )}
    </>
  );
};

export default Category;
