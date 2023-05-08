import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-[50%] right-[50%] z-[99999] ">
      <div className=" animate-[spin_0.5s_ease-in-out_infinite] w-10 h-10 rounded-full border-4 border-[#ed1c24] border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
