const getCategories = async () => {
  // const res = await fetch(`${process.env.HOST}/api/getcategories`);
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return await res.json();
};

export default getCategories;
