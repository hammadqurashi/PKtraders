import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import HomeCollection from "@/components/HomeCollection";
import HomeHero from "@/components/HomeHero";
const roboto400 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeCollection />
    </>
  );
}
