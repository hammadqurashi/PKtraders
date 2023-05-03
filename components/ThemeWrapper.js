"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
