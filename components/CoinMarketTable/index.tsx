"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import MarketTableHeading from "../MarketTableHeading";
import RowCoinItem from "@/components/RowCoinItem/";
import { useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";
import SearchIcon from "@/public/SearchIcon.svg";
import { motion } from "framer-motion";

const CoinMarketTable = () => {
  const [coinSearch, setCoinSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  const hasCoins: boolean = coinMarketData.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinSearch(searchValue);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowDropDown(false);
      setCoinSearch("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displaySide = () => {
    setShowDropDown(!showDropDown);
  };

  const filteredCoins = coinMarketData.filter((coin: Coin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-light p-4">Market Overview</h1>
        <div className="relative flex items-center">
          <button
            className={`bg-gray-900 rounded-xl p-3 border-1 border-gray-900  ${
              showDropDown ? "rounded-r-none" : ""
            }`}
            onClick={displaySide}
          >
            <SearchIcon />
          </button>
          {showDropDown && hasCoins && (
            <motion.input
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              ref={inputRef}
              type="text"
              className={`bg-gray-900  rounded-xl  placeholder-white text-xs font-light w-full p-3 border-none ${
                showDropDown ? "rounded-l-none" : ""
              }`}
              placeholder="Search tokens..."
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>
      <MarketTableHeading />
      {hasCoins &&
        filteredCoins.map((coin: Coin) => (
          <RowCoinItem key={coin.id} coin={coin} />
        ))}
    </div>
  );
};

export default CoinMarketTable;
