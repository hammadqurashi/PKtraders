const getProductDetails = async (slugParameter) => {
  const res = await fetch(
    `${process.env.HOST}/api/product?product=${slugParameter}`,
    { cache: "no-store" }
  );
  return await res.json();
};

export default getProductDetails;
