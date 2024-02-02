import CoinIcon from "@/public/CoinIcon.svg";
import PortfolioIcon from "@/public/PortfolioIcon.svg";
import { motion } from "framer-motion";
import { useState } from "react";

const PortfolioSwitch = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-[180px] items-center backdrop-filter bg-black bg-opacity-40 backdrop-blur rounded-xl text-white text-xs font-light flex justify-center">
      <motion.button
        className={`${
          isClicked ? "" : "bg-gradient-to-r from-purple-400 to-orange-300"
        } p-2 rounded-xl w-[100px] flex gap-1`}
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <CoinIcon />
        Coins
      </motion.button>
      <motion.button
        className={`${
          isClicked ? "bg-gradient-to-r from-cyan-400 to-blue-500" : ""
        } p-2 rounded-xl w-[100px] flex gap-1`}
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <PortfolioIcon />
        Portfolio
      </motion.button>
    </div>
  );
};

export default PortfolioSwitch;
