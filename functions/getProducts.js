const getProducts = async (category, page, items) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return json;
};

export default getProducts;
