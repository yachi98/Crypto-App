import HomeIcon from "@/public/HomeIcon.svg";
import PortfolioIcon from "@/public/PortfolioIcon.svg";
import { motion } from "framer-motion";
import { useState } from "react";

const PortfolioSwitch = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-[180px] items-center backdrop-filter dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-xl text-white text-xs font-light flex justify-center">
      <motion.button
        className={`${
          isClicked
            ? "dark:text-white"
            : "bg-gradient-to-r from-purple-400 to-orange-300"
        } p-2 rounded-xl w-[100px] flex gap-1`}
        onClick={handleToggle}
        whileTap={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <HomeIcon />
        Home
      </motion.button>
      <motion.button
        className={`${
          isClicked
            ? "bg-gradient-to-r from-purple-400 to-orange-300"
            : "dark:text-white"
        } p-2 rounded-xl w-[100px] flex gap-1`}
        onClick={handleToggle}
        whileTap={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <PortfolioIcon />
        Portfolio
      </motion.button>
    </div>
  );
};

export default PortfolioSwitch;
