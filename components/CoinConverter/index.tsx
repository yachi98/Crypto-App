import { useState } from "react";
import { motion } from "framer-motion";
import GraphIcon from "@/public/GraphIcon.svg";

const CoinConverter = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-[100px] items-center backdrop-filter dark:bg-gray-900 bg-white rounded-xl dark:text-white text-black text-xs font-light flex justify-center">
      <motion.button
        className={`${
          isClicked ? "bg-gradient-to-r from-purple-400 to-orange-300" : ""
        } p-2 rounded-xl w-[100px] flex gap-1`}
        onClick={handleToggle}
        whileTap={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <GraphIcon />
        Converter
      </motion.button>
    </div>
  );
};

export default CoinConverter;
