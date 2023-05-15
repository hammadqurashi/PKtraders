import React, { cache } from "react";
import "./globals.css";
import CartState from "./context/cart/cartState";
import TopLoadingBar from "@/components/TopLoadingBar";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Roboto } from "next/font/google";
import AdminAuth from "./AdminAuth";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
export const metadata = {
  title: "PKTraders - Trade With Pakistan",
  description:
    "An Online Platform to trade around the World with Pakistani Traders.",
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    maximumScale: 1,
  },
};

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeWrapper>
          <CartState>
            <TopLoadingBar />
            {/* If user navigates to admin side the defalt navbar, footer and scroll to top will be hidden by admin auth  */}
            <AdminAuth>
              <Navbar />
              <ScrollToTop />
            </AdminAuth>
            <main className="min-h-[100vh]">{children}</main>
          </CartState>
          <AdminAuth>
            <Footer />
          </AdminAuth>
        </ThemeWrapper>
      </body>
    </html>
  );
}
