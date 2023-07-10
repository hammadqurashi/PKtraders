import React from "react";
import TopNavbar from "./NavbarComponents/TopNavbar";
import FloatingNavBar from "./NavbarComponents/FloatingNavBar";

const getCategories = async () => {
  const res = await fetch(`${process.env.HOST}/api/getcategories`, {
    cache: "no-store",
  });
  return await res.json();
};

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <>
      <TopNavbar categories={categories} />
      <FloatingNavBar />
    </>
  );
};

export default Navbar;
