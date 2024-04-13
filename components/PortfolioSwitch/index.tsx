"use client";

import HomeIcon from "@/public/HomeIcon.svg";
import PortfolioIcon from "@/public/PortfolioIcon.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const PortfolioSwitch = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsClicked(value);
  };
  return (
    <div className="w-[180px] items-center backdrop-filter dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-xl text-white text-xs font-light flex justify-center">
      <Link href="/">
        <motion.button
          onClick={() => handleToggle(false)}
          className={`${
            isClicked
              ? "dark:text-white text-black"
              : "bg-gradient-to-r from-purple-400 to-orange-300"
          } p-2 rounded-xl w-[100px] flex gap-1`}
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
              ? "bg-gradient-to-r from-purple-400 to-orange-300"
              : "dark:text-white text-black"
          } p-2 rounded-xl w-[100px] flex gap-1`}
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
