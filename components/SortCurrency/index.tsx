import ArrowIcon from "@/public/ArrowIcon.svg";
import SwitchIcon from "@/public/SwitchIcon.svg";
import { changeCurr } from "@/redux/features/currencySlice";
import { AppDispatch } from "@/redux/store";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface CurrencySelectorItem {
  value: string;
  symbol: string;
}

const currencySelector: CurrencySelectorItem[] = [
  {
    value: "gbp",
    symbol: "£",
  },
  {
    value: "usd",
    symbol: "$",
  },
  {
    value: "eur",
    symbol: "€",
  },
  {
    value: "jpy",
    symbol: "¥",
  },
  {
    value: "chf",
    symbol: "₣",
  },
  {
    value: "rub",
    symbol: "₽",
  },
];

const SorterCurrency = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [currency, setCurrency] = useState("gbp");
  const dispatch: AppDispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCurrency = (selectedCurrency: string) => {
    dispatch(changeCurr(selectedCurrency));
    setCurrency(selectedCurrency);
    setShowDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowDropDown(!showDropdown)}
        className={`w-[120px] dark:bg-gray-900 bg-white p-2 rounded-xl text-xs dark:text-white text-black font-light flex gap-3 items-center  justify-center ${
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
          className="absolute left-0 backdrop-filter dark:bg-[#0d121d] bg-white backdrop-blur overflow-hidden z-30 gap-3 w-full flex flex-col justify-left rounded-b-xl p-3 dark:text-white text-black text-xs font-light"
        >
          {currencySelector.map((currencyItem) => (
            <button
              onClick={() => handleCurrency(currencyItem.value)}
              className="text-xs text-left dark:text-[#a7a7a7] text-black dark:hover:text-white"
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
