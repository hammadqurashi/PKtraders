"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
const ShopPage = (props) => {
  // destructuring props
  const { getProducts, category } = props;

  // states for products, totalpages and current page of user
  const [products, setProducts] = useState();
  const [totalPages, setotalPages] = useState("");
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
    getProducts(category, currentPage).then((res) => {
      setotalPages(res.totalPages); //setting total pages state from res
      const fetchedProducts = res.products;
      setProducts(fetchedProducts); // setting products state from res
    });
  }, [currentPage]);

  return (
    <>
      {products ? (
        <section className=" text-gray-600 dark:text-dark-primaryText body-font my-5">
          <div className="container mx-auto min-h-[120vh]">
            <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-5">
              {products &&
                products.map((item) => {
                  return (
                    <Link
                      key={item._id}
                      href={`${process.env.NEXT_PUBLIC_HOST}/product/${item.slug}`}
                      className="mx-auto group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-none bg-white dark:bg-dark-secondaryBackground shadow-md hover:shadow-lg"
                    >
                      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                        <img
                          className="peer absolute top-0 right-0 h-full w-full object-cover"
                          src={item.img}
                          alt="product image"
                        />
                        <img
                          className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                          src={item.otherimgs[0]}
                          alt="product image"
                        />
                      </div>
                      <div className="mt-4 px-5 pb-5">
                        <div>
                          <h5 className="text-lg font-bold tracking-tight text-slate-900 dark:text-dark-primaryText">
                            {item.title}
                          </h5>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>
                            <span className="text-md text-slate-900 dark:text-dark-primaryText">
                              Rs. {item.price}
                            </span>
                          </p>
                        </div>
                        <div className="mt-2 items-center justify-between grid gap-x-4 gap-y-8 grid-cols-5">
                          {item.size.map((s) => {
                            return (
                              <span
                                key={s}
                                className="text-xs text-white dark:text-black bg-gray-400 dark:bg-dark-fourthBackground text-center min-w-max"
                              >
                                {s}
                              </span>
                            );
                          })}
                        </div>
                        <div className="mt-2 items-center justify-between grid gap-x-2 gap-y-4 grid-cols-7">
                          {item.color.map((c) => {
                            return (
                              <span
                                key={c}
                                style={{ backgroundColor: c }}
                                className="text-sm text-center rounded-full w-[16px] h-[16px] border-gray-400 dark:bg-dark-fourthBackground border-2"
                              ></span>
                            );
                          })}
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <Pagination
            totalPages={totalPages}
            nextPage={fetchnextPage}
            prevPage={fetchprevPage}
            currentPage={currentPage}
            specificPage={specificPage}
          />
        </section>
      ) : (
        <LoadingSpinner /> // displaying loading on until products state is set
      )}
    </>
  );
};

export default ShopPage;
