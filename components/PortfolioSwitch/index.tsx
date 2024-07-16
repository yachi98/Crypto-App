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
    <div className="w-[180px] items-center dark:bg-black bg-white dark:text-white text-black rounded-xl text-xs font-light flex justify-center">
      <Link href="/">
        <button
          onClick={() => handleToggle(false)}
          className={`${
            isClicked
              ? "dark:text-white text-black"
              : "dark:bg-[#ffffff0f]  bg-[#efefef] rounded-xl"
          } p-2 rounded-xl w-[90px] flex gap-1`}
        >
          <HomeIcon />
          Home
        </button>
      </Link>
      <Link href="/portfolio">
        <button
          onClick={() => handleToggle(true)}
          className={`${
            isClicked
              ? "dark:bg-[#ffffff0f]  bg-[#efefef] rounded-xl"
              : "dark:text-white text-black"
          } p-2 rounded-xl w-[90px] flex gap-1`}
        >
          <PortfolioIcon />
          Portfolio
        </button>
      </Link>
    </div>
  );
};

export default PortfolioSwitch;
