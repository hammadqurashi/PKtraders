import Link from "next/link";
import React from "react";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";

const HomeProductGrid = (props) => {
  const { title, description, collection } = props;

  return (
    <>
      {/* <!-- product-grid - start --> */}
      <div className="bg-white dark:bg-dark-primaryBackground py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* <!-- text - start --> */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-dark-primaryText md:mb-6 lg:text-3xl">
              {title}
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 dark:text-dark-secondaryText md:text-lg">
              {description}
            </p>
          </div>
          {/* <!-- text - end --> */}

          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {/* <!-- product - start --> */}
            {/* {collection.map((item) => {
              return (
                <Link
                  key={item._id}
                  href={`/product/${item.slug}`}
                  className="mx-auto group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white dark:bg-dark-secondaryBackground shadow-md"
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
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-[#ed1c24] px-2 text-center text-sm font-medium text-white">
                      NEW
                    </span>{" "}
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <div>
                      <h5 className="text-xl tracking-tight text-slate-900 dark:text-dark-primaryText">
                        {item.title}
                      </h5>
                    </div>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-lg font-bold text-slate-900 dark:text-dark-primaryText">
                          Rs. {item.price}
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 mb-5 items-center justify-between grid gap-x-4 gap-y-8 grid-cols-7">
                      {item.size.map((s) => {
                        return (
                          <span
                            key={s}
                            className="text-sm text-white dark:text-black bg-gray-400 dark:bg-dark-fourthBackground text-center min-w-max"
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
                            className="text-sm text-center rounded-full w-[20px] h-[20px] border-gray-500 dark:bg-dark-fourthBackground border-2"
                          ></span>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })} */}
            {collection.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/product/${item.title}`}
                  className="mx-auto group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white dark:bg-dark-secondaryBackground shadow-md"
                >
                  <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                    <img
                      className="peer absolute top-0 right-0 h-full w-full object-cover"
                      src={item.image}
                      alt="product image"
                    />
                    {/* <img
                      className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                      src={item.otherimgs[0]}
                      alt="product image"
                    /> */}
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-[#ed1c24] px-2 text-center text-sm font-medium text-white">
                      NEW
                    </span>{" "}
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <div>
                      <h5 className="text-xl tracking-tight text-slate-900 dark:text-dark-primaryText">
                        {item.title}
                      </h5>
                    </div>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-lg font-bold text-slate-900 dark:text-dark-primaryText">
                          Rs. {item.price}
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 mb-5 items-center justify-between grid gap-x-4 gap-y-8 grid-cols-7">
                      {item.size &&
                        item.size.map((s) => {
                          return (
                            <span
                              key={s}
                              className="text-sm text-white dark:text-black bg-gray-400 dark:bg-dark-fourthBackground text-center min-w-max"
                            >
                              {s}
                            </span>
                          );
                        })}
                    </div>
                    <div className="mt-2 items-center justify-between grid gap-x-2 gap-y-4 grid-cols-7">
                      {item.color &&
                        item.color.map((c) => {
                          return (
                            <span
                              key={c}
                              style={{ backgroundColor: c }}
                              className="text-sm text-center rounded-full w-[20px] h-[20px] border-gray-500 dark:bg-dark-fourthBackground border-2"
                            ></span>
                          );
                        })}
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* <!-- product - end --> */}
          </div>
        </div>
      </div>
      {/* <!-- product-grid - end --> */}
    </>
  );
};

export default HomeProductGrid;
