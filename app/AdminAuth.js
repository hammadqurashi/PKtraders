"use client";
import React from "react";
import { usePathname } from "next/navigation";
const AdminAuth = ({ children }) => {
  const pathname = usePathname();
  return !pathname.startsWith("/admin") && children;
};

export default AdminAuth;
