import { useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "@/public/ArrowIcon.svg";
import SwitchIcon from "@/public/SwitchIcon.svg";
import Eur from "@/public/Eur.svg";
import Jpy from "@/public/Jpy.svg";

const SorterCurrency = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-[100px] bg-black rounded-xl text-white text-xs font-light p-2 flex items-center justify-center gap-3"
      >
        <SwitchIcon />
        USD
        <ArrowIcon />
      </button>

      {showDropdown && (
        <motion.div
          initial={{ y: 15 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-full left-0 backdrop-filter bg-black bg-opacity-40 backdrop-blur overflow-hidden z-30 mt-2 flex flex-col gap-2 w-[100px] text-left rounded-xl p-3 text-white"
        >
          <button
            className={`p-1 flex gap-2 items-center rounded-xl cursor-pointer bg-transparent text-white border-none text-xs transition duration-200 ease-in-out text-left ${
              isHovered ? "bg-white text-black" : ""
            }`}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "white";
            }}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            <span className="text-white text-sm">£</span>
            GBP
          </button>
          <button
            className={`flex gap-2 items-center p-1 rounded-xl cursor-pointer bg-transparent text-white border-none text-xs transition duration-200 ease-in-out text-left ${
              isHovered ? "bg-white text-black" : ""
            }`}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "white";
            }}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            <span className="text-white text-sm">€</span>
            {/* <Eur /> */}
            EUR
          </button>
          <button
            className={`p-1 flex gap-2 items-center rounded-xl cursor-pointer bg-transparent text-white border-none text-xs transition duration-200 ease-in-out text-left ${
              isHovered ? "bg-white text-black" : ""
            }`}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "white";
            }}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            {/* <Jpy /> */}
            <span className="text-white text-sm">¥</span>
            JPY
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SorterCurrency;
