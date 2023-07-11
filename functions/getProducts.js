const getProducts = async (category, page, items) => {
  const res = await fetch(
    `${process.env.HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
    { cache: "no-store" }
  );

  return await res.json();
};

export default getProducts;
