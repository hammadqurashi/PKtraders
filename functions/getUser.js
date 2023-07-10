const getUser = async (token) => {
  const res = await fetch(`${process.env.HOST}/api/getuser`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ token: token }),
    cache: "no-store",
  });
  return await res.json();
};

export default getUser;
