import React from "react";

const LoadingSpinner = ({ color, size, thickness }) => {
  return (
    <div
      className={`animate-[spin_0.5s_ease-in-out_infinite] rounded-full border-${thickness} m-auto`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    ></div>
  );
};

export default LoadingSpinner;
