import React from "react";
import Link from "next/link";
const LoginBtn = () => {
  return (
    <div className="hidden md:flex h-12 w-12 md:h-24 md:w-24 flex-col items-center justify-center gap-1.5 transition duration-100 ">
      <Link
        href="/login"
        className={`text-lg mr-1 bg-[#ed1c24] text-white py-1 font-semibold px-4 rounded-lg`}
      >
        Log In
      </Link>
    </div>
  );
};

export default LoginBtn;
