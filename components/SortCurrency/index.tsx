import ArrowIcon from "@/public/ArrowIcon.svg";
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
        className={`dark:bg-black bg-white p-2 rounded-xl text-xs dark:text-white text-black font-light flex gap-2 items-center  justify-center ${
          showDropdown ? "rounded-bl-none rounded-br-none" : ""
        }`}
      >
        {currencySelector.find((item) => item.value === currency)?.symbol}{" "}
        <span className="hidden sm:block">{currency.toUpperCase()}</span>
        <ArrowIcon
          className={`w-4 h-4 transition-transform duration-150 ${
            showDropdown ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {showDropdown && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 backdrop-filter dark:bg-black bg-white backdrop-blur sm:w-full overflow-hidden z-30 gap-2 flex flex-col text-left rounded-b-xl px-2 pb-2 pt-1 dark:text-white text-black text-xs font-light w-fit rounded-tl-xl sm:rounded-tl-none"
        >
          {currencySelector.map((currencyItem) => (
            <button
              onClick={() => handleCurrency(currencyItem.value)}
              className="dark:text-[#a7a7a7] text-black dark:hover:text-white text-left text-nowrap"
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
