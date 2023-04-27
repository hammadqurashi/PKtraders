import React from "react";
import ClientComponent from "./ClientComponent";

const getProduct = async (slugParameter) => {
  const res = await fetch(
    `${process.env.HOST}/api/product?product=${slugParameter}`,
    { cache: "no-store" }
  );
  return await res.json();
};

export async function generateMetadata({ params }) {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProduct(slug);

  return {
    title: `${product.title} | PKTraders`,
    description: `${product.desc.slice(0, 155)}...`,
    keyword: product.title,
  };
}

const Product = async ({ params }) => {
  const product = await getProduct(params.slug);

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
