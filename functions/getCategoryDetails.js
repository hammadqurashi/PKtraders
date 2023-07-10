const getCategoryDetails = async (slug) => {
  const res = await fetch(
    `${process.env.HOST}/api/getcategorydetails?slug=${slug}`,
    { cache: "no-store" }
  );
  return await res.json();
};

export default getCategoryDetails;
