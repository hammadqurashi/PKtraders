import React, { Suspense } from "react";
import ClientComponent from "./ClientComponent";
import { notFound } from "next/navigation";
import getProductDetails from "@/functions/getProductDetails";
import ProductSkeleton from "@/components/ProductSkeleton";

// export async function generateMetadata(params) {
//   "use server";
//   // read route params
//   // const slug = params.slug;

//   console.log("params");
//   console.log(params);

//   const { product } = params ?? {};

//   // fetch data
//   // const product = await getProductDetails(slug);

//   // if (!product) {
//   //   return notFound();
//   // }

//   return {
//     title: `${product?.title || "Hey"} | PKTraders`,
//     description: `${product?.desc?.slice(0, 155)}...`,
//     keyword: product?.title,
//   };
// }

const Product = async ({ params }) => {
  const product = await getProductDetails(params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ClientComponent
        // generateMetadata={generateMetadata}
        params={params.slug}
        title={product.title}
        category={product.category}
        img={product.img}
        otherimgs={product.otherimgs}
        price={product.price}
        desc={product.desc}
        color={product.color}
        size={product.size}
      />
    </Suspense>
  );
};

export default Product;
