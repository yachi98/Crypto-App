import { ChangeEvent, useState } from "react";
import { SearchCoin } from "@/interfaces/searchCoin.interface";
import SearchIcon from "../../public/SearchIcon.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";

const SearchBar = () => {
  const [coinSearch, setCoinSearch] = useState("");
  const [searchCoins, setSearchCoins] = useState<SearchCoin[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinSearch(searchValue);
    setShowDropDown(searchValue.trim().length > 0);
  };

  useEffect(() => {
    const searchCoinData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${coinSearch}&x_cg_demo_api_key=CG-duQsjCRoXZm1bJBTrL8sARut`
        );
        setSearchCoins(data.coins);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    searchCoinData();
  }, [coinSearch]);

  const searchCoinResults = searchCoins.filter((coin: SearchCoin) =>
    coin.name.toLowerCase().startsWith(coinSearch)
  );

  const removeDropDown = () => {
    setCoinSearch("");
    setShowDropDown(false);
  };

  return (
    <div className="w-full relative flex-1">
      <div
        className={`dark:bg-[#ffffff0f] bg-white flex items-center gap-1 rounded-xl p-2 ${
          showDropDown && "rounded-bl-none rounded-br-none"
        }`}
      >
        <SearchIcon />
        <input
          onChange={handleInputChange}
          type="text"
          className={
            "w-full bg-transparent backdrop-blur outline-none dark:placeholder-white placeholder-black text-xs dark:text-white text-black font-light"
          }
          placeholder="Search..."
          value={coinSearch}
        />
      </div>
      {showDropDown && (
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 dark:bg-black bg-white overflow-hidden z-[9999] flex flex-col gap-2 w-full text-left rounded-b-xl p-3 text-white text-xs font-light"
        >
          {searchCoinResults.map((coin: SearchCoin) => (
            <Link key={coin.id} href={`/coin/${coin.id}`}>
              <div
                className="dark:text-[#a7a7a7] text-black dark:hover:text-white cursor-pointer"
                onClick={removeDropDown}
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
