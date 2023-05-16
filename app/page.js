import HomeCategories from "@/components/HomeCategories";
import HomeHero from "@/components/HomeHero";
import HomeProductGrid from "@/components/HomeProductGrid";
import NewsLetter from "@/components/NewsLetter";

const getCollection = async (category, page, items) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
};

export default async function Home() {
  const res = await getCollection("all", 1, 10);
  const latestCollection = res.products;

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
