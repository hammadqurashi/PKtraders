import React, { Suspense } from "react";
import TopNavbar from "./NavbarComponents/TopNavbar";
import FloatingNavBar from "./NavbarComponents/FloatingNavBar";
import getCategories from "@/functions/getCategories";

const categories = await getCategories();

const Navbar = async () => {
  return (
    <>
      <Suspense fallback={<span>Loading...</span>}>
        <TopNavbar categories={categories} />
      </Suspense>
      <FloatingNavBar />
    </>
  );
};

export default Navbar;
