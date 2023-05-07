import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import HomeCategories from "@/components/HomeCategories";
import HomeHero from "@/components/HomeHero";
import HomeProductGrid from "@/components/HomeProductGrid";
import NewsLetter from "@/components/NewsLetter";
const roboto400 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

const getCollection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function Home() {
  let collection = await getCollection();
  let latestCollection = collection.reverse().slice(0, 6);

  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomeProductGrid
        title="Our Latest Collections"
        description="Get Our Latest Collections Before They Are Stocked Out!"
        collection={latestCollection}
      />
      <NewsLetter />
    </>
  );
}
