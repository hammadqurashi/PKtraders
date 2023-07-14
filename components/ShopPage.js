"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import Hero from "@/components/Hero";
import ProductsGrid from "@/components/ProductsGrid";

const ShopPage = (props) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("q");

  // destructuring props
  const { getProducts, categoryDetails, firstPageProducts, totalPages } = props;

  // states for products, totalpages and current page of user
  const [products, setProducts] = useState(firstPageProducts);
  const [currentPage, setCurrentPage] = useState(1);

  // function of for moving to next page which is passed as a prop to pagination
  const fetchnextPage = () => {
    setCurrentPage(currentPage + 1);

    // scrolling windows to top after fetching new products on page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // function of for moving to previous page which is passed as a prop to pagination
  const fetchprevPage = () => {
    setCurrentPage(currentPage - 1);

    // scrolling windows to top after fetching new products on page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // function of for moving to specific page which is passed as a prop to pagination
  const specificPage = (page) => {
    setCurrentPage(page);

    // scrolling windows to top after fetching new products on page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // useeffect runs the function which we get as a prop
  useEffect(() => {
    if (search) {
      getProducts(currentPage, search).then((res) => {
        const fetchedProducts = res.products;
        setProducts(fetchedProducts); // setting products state from res
      });
    } else {
      getProducts(currentPage).then((res) => {
        const fetchedProducts = res.products;
        setProducts(fetchedProducts); // setting products state from res
      });
    }
  }, [currentPage, search]);

  return (
    <>
      <section className=" text-gray-600 dark:text-dark-primaryText body-font my-5">
        {categoryDetails && (
          <Hero
            text={categoryDetails.name.toUpperCase()}
            imageSrc={categoryDetails.pic}
            imageAlt={categoryDetails.name}
          />
        )}
        <ProductsGrid products={products} />
        <Pagination
          totalPages={totalPages}
          nextPage={fetchnextPage}
          prevPage={fetchprevPage}
          currentPage={currentPage}
          specificPage={specificPage}
        />
      </section>
    </>
  );
};

export default ShopPage;
