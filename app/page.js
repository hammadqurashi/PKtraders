import React from "react";
import HomeCategories from "@/components/HomeCategories";
import HomeHero from "@/components/HomeHero";
import HomeProductGrid from "@/components/HomeProductGrid";
import NewsLetter from "@/components/NewsLetter";
import getCategories from "@/functions/getCategories";
import getProducts from "@/functions/getProducts";

export default async function Home() {
  const res = await getProducts("all", 1, 10);
  const latestCollection = res.products;

  const categories = await getCategories();
  return (
    <>
      <HomeHero />
      <HomeCategories categories={categories} />
      <HomeProductGrid
        title="Our Latest Collections"
        description="Get Our Latest Collections Before They Are Stocked Out!"
        collection={latestCollection}
      />
      <NewsLetter />
    </>
  );
}
