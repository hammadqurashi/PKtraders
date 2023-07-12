import "./globals.css";
import CartState from "./context/cart/cartState";
import TopLoadingBar from "@/components/TopLoadingBar";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PKTraders - Trade With Pakistan",
  description:
    "An Online Platform to trade around the World with Pakistani Traders.",
  keywords: "pktraders",
};

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeWrapper>
          <CartState>
            <TopLoadingBar />
            <Navbar />
            <ScrollToTop />
            <main className="min-h-[100vh]">{children}</main>
          </CartState>
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  );
}
