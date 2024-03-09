import { useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "@/public/ArrowIcon.svg";
import SwitchIcon from "@/public/SwitchIcon.svg";

interface CurrencySelectorItem {
  value: string;
}

const currencySelector: CurrencySelectorItem[] = [
  {
    value: "£ GBP",
  },
  {
    value: "€ EUR",
  },
  {
    value: "¥ JPY",
  },
];

const SorterCurrency = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const handleCurrency = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`w-[120px] bg-gradient-to-r from-black to-gray-900 p-2 rounded-xl text-xs text-white font-light flex gap-3 items-center  justify-center ${
          showDropdown ? "rounded-bl-none rounded-br-none" : ""
        }`}
      >
        <SwitchIcon />
        {currency}
        <ArrowIcon />
      </button>

      {showDropdown && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 backdrop-filter bg-gradient-to-r from-black to-gray-900 backdrop-blur overflow-hidden z-30 gap-3 w-full flex flex-col justify-left rounded-b-xl p-3 text-[#c7c7c7] text-xs font-light"
        >
          {currencySelector.map((currencyItem) => (
            <button
              onClick={() => handleCurrency(currencyItem.value)}
              className="text-xs text-left hover:text-white"
              key={currencyItem.value}
            >
              {currencyItem.value}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SorterCurrency;
