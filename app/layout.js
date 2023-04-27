import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CartState from "./context/cart/cartState";
import TopLoadingBar from "@/components/TopLoadingBar";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartState>
          <TopLoadingBar />
          <Navbar />
          <ScrollToTop />
          {children}
          <Footer />
        </CartState>
      </body>
    </html>
  );
}
