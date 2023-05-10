"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeSwitch = (props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`mr-1 ${props.smallDevice == "hidden" && "hidden md:block"}`}
    >
      {theme == "dark" ||
      (theme == "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
        <BsFillSunFill
          className="text-3xl text-yellow-400"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BsFillMoonFill
          className="text-2xl text-slate-800"
          onClick={() => setTheme("dark")}
        />
      )}
    </button>
  );
};

export default ThemeSwitch;
