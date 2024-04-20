import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";

const SearchBar = () => {
  const [coinSearch, setCoinSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  const hasCoins: boolean = coinMarketData.length > 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinSearch(searchValue);
    setShowDropDown(searchValue.trim().length > 0);
  };

  const filteredCoins = coinMarketData.filter((coin: Coin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  return (
    <div className="w-full relative">
      <input
        onChange={handleInputChange}
        type="text"
        className={`w-full dark:bg-gray-900 bg-white backdrop-blur  p-2 rounded-xl outline-none dark:placeholder-white placeholder-black text-xs pl-7 dark:text-white text-black font-light ${
          showDropDown
            ? "rounded-bl-none rounded-br-none dark:bg-gray-900 dark:bg-opacity-90"
            : ""
        }`}
        placeholder="Search..."
      />
      {showDropDown && hasCoins && (
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 dark:bg-gray-900 dark:bg-opacity-90 bg-white backdrop-blur overflow-hidden z-30 flex flex-col gap-2 w-full text-left rounded-b-xl p-3 text-white text-xs font-light"
        >
          {filteredCoins.map((coin: Coin) => (
            <Link key={coin.id} href={`/coin/${coin.id}`}>
              <div
                className="dark:text-[#CECECE] text-black cursor-pointer"
                key={coin.id}
              >
                {coin.name}
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
