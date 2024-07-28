"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "@/public/SunIcon.svg";
import MoonIcon from "@/public/MoonIcon.svg";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeChange = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="dark:bg-black bg-white rounded-xl dark:text-white flex items-center justify-center cursor-pointer p-2"
      onClick={handleThemeChange}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-4" />
      ) : (
        <MoonIcon className="h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
