const getProducts = async (category, page, items, searchq) => {
  const res = await fetch(
    `${
      process.env.HOST
    }/api/getproducts?category=${category}&page=${page}&items=${items}${
      searchq ? `&searchq=${searchq}` : ""
    }`,
    { cache: "no-store" }
  );
  return await res.json();
};

export default getProducts;
