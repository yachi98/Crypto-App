"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import MarketTableHeading from "../MarketTableHeading";
import RowCoinItem from "@/components/RowCoinItem/";
import { useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";
import SearchIcon from "@/public/SearchIcon.svg";

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

  const filteredCoins = coinMarketData.filter((coin: Coin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <h1 className="dark:text-white text-black text-light p-4">
          Market Overview
        </h1>
        <div className="relative flex items-center overflow-hidden">
          <label
            className={`bg-black p-3 border-2 border-black cursor-pointer ${
              showDropDown ? "rounded-bl-xl rounded-tl-xl" : "rounded-xl"
            }`}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <SearchIcon />
          </label>
          {showDropDown && hasCoins && (
            <input
              ref={inputRef}
              type="text"
              className={`bg-black rounded-xl placeholder-white text-xs font-light p-3 border-none outline-none ${
                showDropDown
                  ? "w-[160px] rounded-tr-xl rounded-br-xl rounded-bl-none rounded-tl-none"
                  : "rounded-xl"
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
