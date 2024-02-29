import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";

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
        className={`w-full bg-gradient-to-r from-black to-gray-900 p-2 rounded-xl outline-none placeholder-white text-xs pl-7 text-white font-light ${
          showDropDown ? "rounded-bl-none rounded-br-none" : ""
        }`}
        placeholder="Search..."
      />
      {showDropDown && hasCoins && (
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 backdrop-filter bg-gradient-to-r from-black to-gray-900 bg-opacity-40 backdrop-blur overflow-hidden z-30 flex flex-col gap-2 w-full text-left rounded-b-xl p-3 text-white text-xs font-light"
        >
          {filteredCoins.map((coin: Coin) => (
            <div key={coin.id}>{coin.name}</div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
