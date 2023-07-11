import React from "react";
import TopNavbar from "./NavbarComponents/TopNavbar";
import FloatingNavBar from "./NavbarComponents/FloatingNavBar";
import getCategories from "@/functions/getCategories";

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
