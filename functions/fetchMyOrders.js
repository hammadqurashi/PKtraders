const fetchMyOrders = async (token) => {
  const res = await fetch(`${process.env.HOST}/api/myorders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
    cache: "no-store",
  });
  return await res.json();
};

export default fetchMyOrders;
