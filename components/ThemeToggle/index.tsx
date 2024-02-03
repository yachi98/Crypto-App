"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "@/public/SunIcon.svg";
import MoonIcon from "@/public/MoonIcon.svg";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounded] = useState(false);

  const handleThemeChange = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setMounded(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="w-[45px] bg-black rounded-xl text-white text-xs flex items-center justify-center cursor-pointer"
      onClick={handleThemeChange}
    >
      {resolvedTheme === "dark" && <SunIcon />}
      {resolvedTheme === "light" && <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
