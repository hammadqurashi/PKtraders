import React from "react";

const LoadingSpinner = ({ color, size = 10, thickness = 4 }) => {
  return (
    <div
      className={`animate-[spin_0.5s_ease-in-out_infinite] w-${size} h-${size} rounded-full border-${thickness} border-${color} border-t-transparent m-auto`}
    ></div>
  );
};

export default LoadingSpinner;
