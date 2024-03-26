import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import ArrowIcon from "@/public/ArrowIcon.svg";
import SwitchIcon from "@/public/SwitchIcon.svg";
import { changeCurr } from "@/redux/features/currencySlice";

interface CurrencySelectorItem {
  value: string;
  symbol: string;
}

const currencySelector: CurrencySelectorItem[] = [
  {
    value: "usd",
    symbol: "$",
  },
  {
    value: "gbp",
    symbol: "£",
  },
  {
    value: "eur",
    symbol: "€",
  },
  {
    value: "jpy",
    symbol: "¥",
  },
];

const SorterCurrency = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const dispatch: AppDispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCurrency = (selectedCurrency: string) => {
    dispatch(changeCurr(selectedCurrency));
    setCurrency(selectedCurrency);
    setShowDropDown(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowDropDown(!showDropdown)}
        className={`w-[120px] bg-gradient-to-r from-black to-gray-900 p-2 rounded-xl text-xs text-white font-light flex gap-3 items-center  justify-center ${
          showDropdown ? "rounded-bl-none rounded-br-none" : ""
        }`}
      >
        <SwitchIcon />
        {currencySelector.find((item) => item.value === currency)?.symbol}{" "}
        {currency.toUpperCase()}
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
              {currencyItem.symbol} {currencyItem.value.toUpperCase()}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SorterCurrency;
