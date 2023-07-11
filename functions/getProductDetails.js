const getProductDetails = async (slugParameter) => {
  // const res = await fetch(
  //   `${process.env.HOST}/api/product?product=${slugParameter}`,
  //   { cache: "no-store" }
  // );
  const res = await fetch(
    `https://fakestoreapi.com/products/${slugParameter}`,
    { cache: "no-store" }
  );
  return await res.json();
};

export default getProductDetails;
