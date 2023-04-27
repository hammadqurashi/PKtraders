import Link from "next/link";

const getSweatShirts = async () => {
  const sweatshirts = await fetch(`${process.env.HOST}/api/getproducts`, {
    cache: "no-store",
  });
  const json = await sweatshirts.json();

  const res = Object.values(json).filter((e) => {
    return e.category === "sweatshirt";
  });

  return res;
};

const SweatShirts = async () => {
  const sweatshirts = await getSweatShirts();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap md:flex-nowrap -m-4">
            {sweatshirts.length === 0 ? (
              <p>
                All SweatShirts Sold Out. New Stock Coming Soon! Stay Tuned...
              </p>
            ) : (
              sweatshirts.map((item) => {
                return (
                  <Link
                    key={item._id}
                    href={`/product/${item.slug}`}
                    className="lg:w-1/5 md:w-1/2 p-4 w-full mx-1 shadow-md hover:transition-shadow hover:shadow-lg"
                  >
                    <>
                      <div className="block relative rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="m-auto h-[233px] block"
                          src={item.img}
                        />
                      </div>
                      <div className="mt-3 text-start">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-[2px]">
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {item.title}
                        </h2>
                        <p className="mt-[2px]">Rs. {item.price}</p>
                        <div className="mt-1">
                          {item.size.map((size) => {
                            return (
                              <span
                                key={size}
                                className="border px-1 py-[2px] text-xs mr-[1px] text-white bg-slate-400"
                              >
                                {size}
                              </span>
                            );
                          })}
                        </div>
                        <div className="mt-1">
                          {item.color.map((color) => {
                            return (
                              <button
                                key={color}
                                style={{ backgroundColor: `${color}` }}
                                className={`mr-1 rounded-full w-[14px] h-[14px] border-slate-400 border focus:outline-none`}
                              ></button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SweatShirts;
