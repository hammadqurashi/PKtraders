const getProducts = async (category, page, items) => {
  // const res = await fetch(
  //   `${process.env.HOST}/api/getproducts?category=${category}&page=${page}&items=${items}`,
  //   { cache: "no-store" }
  // );
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
    { cache: "no-store" }
  );
  return await res.json();
};

export default getProducts;
