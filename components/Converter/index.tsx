import { ChangeEvent, useState, useEffect } from "react";
import SwitchIcon from "@/public/ConvertIcon.svg";
import { motion } from "framer-motion";
import { Coin } from "@/interfaces/coin.interface";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const Converter = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useAppSelector((state) => state.currencySlice);
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
    <div className="flex gap-5 mt-5 relative">
      <div className="w-1/2 dark:bg-gray-900 bg-[#eee] h-[350px] rounded-3xl p-8 text-xl">
        <h3>You Buy</h3>
        <input
          onChange={handleInputChange}
          className="outline-none p-3 dark:bg-gray-950 mt-10"
          value={coinSearch}
        />

        {showDropDown && hasCoins && (
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 dark:bg-gray-900 dark:bg-opacity-90 bg-white backdrop-blur overflow-hidden z-30 flex flex-col gap-2 w-full text-left rounded-b-xl p-3 text-white text-xs font-light"
          >
            {filteredCoins.map((coin: Coin) => (
              <div
                key={coin.id}
                className="dark:text-[#CECECE] text-black cursor-pointer"
              >
                {coin.name}
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <div className="w-[70px] h-[70px] dark:bg-gray-800  bg-white dark:text-white text-black flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl rotate-90 cursor-pointer">
        <SwitchIcon width={40} height={40} />
      </div>
      <div className="w-1/2 dark:bg-gray-900 bg-[#eee] h-[350px] rounded-3xl p-8 text-xl">
        <h2>You Sell</h2>
        <input className="outline-none p-3 dark:bg-gray-950 mt-10" />
      </div>
    </div>
  );
};

export default Converter;
