import React from "react";
import ShopPage from "@/components/ShopPage";
import { notFound } from "next/navigation";
import getProducts from "@/functions/getProducts";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import NoResultsFound from "@/components/NoResultsFound";

export async function generateMetadata({ searchParams }) {
  return {
    title: `Search results for ${searchParams.q}`,
  };
}

const Search = async ({ searchParams }) => {
  if (!searchParams.q) {
    notFound();
  }

  const fetchedProducts = async (page, search) => {
    "use server";
    if (search) {
      return await getProducts("all", page, 10, search);
    } else {
      return await getProducts("all", page, 10);
    }
  };

  const products = await getProducts("all", 1, 10, searchParams.q);

  return (
    <section className="container m-auto">
      <h1 className="text-gray-800 dark:text-dark-primaryText text-2xl md:text-3xl font-bold my-4">
        Search Results for {searchParams.q}
      </h1>
      {products.products.length > 0 ? (
        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopPage
            getProducts={fetchedProducts}
            firstPageProducts={products.products}
            totalPages={products.totalPages}
          />
        </Suspense>
      ) : (
        <NoResultsFound />
      )}
    </section>
  );
};

export default Search;
