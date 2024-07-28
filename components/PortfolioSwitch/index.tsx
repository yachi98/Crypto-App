"use client";

import HomeIcon from "@/public/HomeIcon.svg";
import PortfolioIcon from "@/public/PortfolioIcon.svg";
import Link from "next/link";
import { useState } from "react";

const PortfolioSwitch = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsClicked(value);
  };
  return (
    <div className="p-1 items-center dark:bg-black bg-white dark:text-white text-black font-light rounded-xl text-xs flex justify-center">
      <Link href="/">
        <button
          onClick={() => handleToggle(false)}
          className={`${
            isClicked
              ? "dark:text-white text-black"
              : "dark:bg-[#ffffff0f] bg-[#efefef]"
          } px-2 py-1.5 rounded-lg flex gap-1 leading-4 text-center align-middle`}
        >
          <HomeIcon className="w-4 h-4" />
          <span className="hidden sm:block">Home</span>
        </button>
      </Link>
      <Link href="/portfolio">
        <button
          onClick={() => handleToggle(true)}
          className={`${
            isClicked
              ? "dark:bg-[#ffffff0f] bg-[#efefef]"
              : "dark:text-white text-black"
          } px-2 py-1.5 rounded-lg flex gap-1 leading-4 text-center align-middle`}
        >
          <PortfolioIcon className="w-4 h-4" />
          <span className="hidden sm:block">Portfolio</span>
        </button>
      </Link>
    </div>
  );
};

export default PortfolioSwitch;
