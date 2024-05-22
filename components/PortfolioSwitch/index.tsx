"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import HomeIcon from "@/public/HomeIcon.svg";
import PortfolioIcon from "@/public/PortfolioIcon.svg";
import Link from "next/link";

const PortfolioSwitch = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsClicked(value);
  };
  return (
    <div className="w-[180px] border dark:border-[#171717] items-center dark:bg-black bg-white dark:text-white text-black rounded-xl text-xs font-light flex justify-center">
      <Link href="/">
        <motion.button
          onClick={() => handleToggle(false)}
          className={`${
            isClicked
              ? "dark:text-white text-black"
              : "dark:bg-[#121218] bg-gray-300 rounded-xl"
          } p-2 rounded-xl w-[90px] flex gap-1`}
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <HomeIcon />
          Home
        </motion.button>
      </Link>
      <Link href="/portfolio">
        <motion.button
          onClick={() => handleToggle(true)}
          className={`${
            isClicked
              ? "dark:bg-[#121218] bg-gray-300 rounded-xl"
              : "dark:text-white text-black"
          } p-2 rounded-xl w-[90px] flex gap-1`}
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <PortfolioIcon />
          Portfolio
        </motion.button>
      </Link>
    </div>
  );
};

export default PortfolioSwitch;
