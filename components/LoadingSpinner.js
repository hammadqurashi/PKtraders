import React from "react";

const LoadingSpinner = ({ color, size, thickness }) => {
  return (
    <div
      className={`animate-[spin_0.5s_ease-in-out_infinite] rounded-full border-${thickness} border-${color} border-t-transparent m-auto`}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};

export default LoadingSpinner;
