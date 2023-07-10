const orderDetails = async (id) => {
  const res = await fetch(`${process.env.HOST}/api/orderdetails?id=${id}`, {
    cache: "no-store",
  });
  return res.json();
};

export default orderDetails;
