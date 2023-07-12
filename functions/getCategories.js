const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getcategories`, {
    cache: "no-store",
  });
  return await res.json();
};

export default getCategories;
