"use client";
import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
const ScrollToTop = () => {
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      var position = window.scrollY;
      setisVisible(position > 500);
    });
  }, []);

  const ScrollFunc = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed z-50 bottom-3 right-3 bg-[#ed1c24] p-2 rounded ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={ScrollFunc}
    >
      <AiOutlineArrowUp className="text-xl text-white" />
    </button>
  );
};

export default ScrollToTop;
