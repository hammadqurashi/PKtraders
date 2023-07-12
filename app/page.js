import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import getProducts from "@/functions/getProducts";
import Skeleton from "@/components/Skeleton";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import getCategories from "@/functions/getCategories";

const HomeCategories = dynamic(() => import("@/components/HomeCategories"));
const HomeHero = dynamic(() => import("@/components/HomeHero"));
const HomeProductGrid = dynamic(() => import("@/components/HomeProductGrid"));
const NewsLetter = dynamic(() => import("@/components/NewsLetter"));

const categories = await getCategories();

const res = await getProducts("all", 1, 10);
const latestCollection = res && res.products;

export default async function Home() {
  return (
    <>
      <HomeHero />
      <Suspense fallback={<Skeleton />}>
        <HomeCategories categories={categories} />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeProductGrid
          title="Our Latest Collections"
          description="Get Our Latest Collections Before They Are Stocked Out!"
          collection={latestCollection}
        />
      </Suspense>
      <NewsLetter />
    </>
  );
}
