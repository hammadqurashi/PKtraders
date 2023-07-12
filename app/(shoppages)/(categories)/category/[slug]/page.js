import ShopPage from "../../ShopPage";
import soldoutImg from "@/assets/soldout.jpg";
import Image from "next/image";
import { notFound } from "next/navigation";
import getCategoryDetails from "@/functions/getCategoryDetails";
import getProducts from "@/functions/getProducts";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export async function generateMetadata({ params }) {
  try {
    // fetch data
    const category = await getCategoryDetails(params.slug);

    return {
      title: category.category.name.toUpperCase(),
      description: category.category.metaDesc,
      images: [
        {
          url: category.category.pic,
          width: 800,
          height: 600,
        },
      ],
      keyword: category.category.name,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Error in the page",
      description: "The page you are looking for does not exist.",
    };
  }
}

const Category = async ({ params }) => {
  const categoryDetails = await getCategoryDetails(params.slug);

  if (categoryDetails.success == false) {
    return notFound();
  }

  const fetchedProducts = async (page) => {
    "use server";

    return await getProducts(params.slug, page, 10);
  };

  const products = await getProducts(params.slug, 1, 10);

  return (
    <>
      {products.products.length > 0 ? (
        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopPage
            getProducts={fetchedProducts}
            firstPageProducts={products.products}
            totalPages={products.totalPages}
            categoryDetails={categoryDetails.category}
          />
        </Suspense>
      ) : (
        <div className="flex justify-center items-center font-bold text-2xl">
          <Image src={soldoutImg} width={500} height={500} />
        </div>
      )}
    </>
  );
};

export default Category;
