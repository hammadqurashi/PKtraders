import HomeCategories from "@/components/HomeCategories";
import HomeHero from "@/components/HomeHero";
import HomeProductGrid from "@/components/HomeProductGrid";
import NewsLetter from "@/components/NewsLetter";

const getCollection = async (category, page, items) => {
  const res = await fetch(
    `${process.env.HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
};

const getCategories = async () => {
  const res = await fetch(`${process.env.HOST}/api/getcategories`);
  return await res.json();
};

export default async function Home() {
  const res = await getCollection("all", 1, 10);
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
