const getCategories = async () => {
  const res = await fetch(`${process.env.HOST}/api/getcategories`);
  return await res.json();
};

export default getCategories;
