import React from "react";
import ClientComponent from "./ClientComponent";
import { notFound } from "next/navigation";
import getProductDetails from "@/functions/getProductDetails";

export async function generateMetadata({ params }) {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductDetails(slug);

  if (!product) {
    return notFound();
  }

  return {
    title: `${product.title} | PKTraders`,
    description: `${product.desc.slice(0, 155)}...`,
    keyword: product.title,
  };
}

const Product = async ({ params }) => {
  const product = await getProductDetails(params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <ClientComponent
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
  );
};

export default Product;
