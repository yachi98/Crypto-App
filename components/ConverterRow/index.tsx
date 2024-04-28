"use client";

import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";

interface CoinRowProps {
  data: Coin[];
  currentCoin: Coin | null;
  currency: string;
  amount: number;
  handleCoinSelect: (coin: Coin) => void;
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CoinRow = ({
  currentCoin,
  amount,
  handleCoinSelect,
  handleAmountChange,
}: CoinRowProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [coinSearch, setCoinSearch] = useState("");
  const { symbol } = useAppSelector((state) => state.currencySlice);
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const coinResults = coinMarketData.filter((coin: Coin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinSearch(searchValue);
    setShowDropdown(true);
  };

  const onCoinSelect = (coin: Coin) => {
    handleCoinSelect(coin);
    setShowDropdown(false);
    setCoinSearch(coin.name);
  };

  useEffect(() => {
    if (currentCoin) {
      setCoinSearch(currentCoin.name);
    }
  }, [currentCoin]);

  return (
    <div className="w-full dark:bg-gradient-to-r from-black to-gray-900 bg-white px-6 pt-6 pb-5 rounded-3xl h-[150px]">
      <div className="flex items-center">
        <div className="relative flex items-center flex-grow">
          {currentCoin && (
            <Image
              src={currentCoin.image}
              alt={currentCoin.name}
              width={25}
              height={25}
              className="absolute left-0"
            />
          )}
          <input
            className="bg-transparent placeholder:text-black dark:placeholder:text-white pl-9 focus:outline-none w-full"
            onChange={handleSearchChange}
            value={coinSearch}
            onFocus={() => setShowDropdown(true)}
          />
        </div>
        <input
          className="bg-transparent placeholder:text-black dark:placeholder:text-white py-3 px-3 focus:outline-none text-right"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      {showDropdown && (
        <div className="h-[300px] flex flex-col overflow-y-scroll dark:bg-gray-950 bg-white absolute z-10 rounded-2xl">
          {coinResults.map((coin) => (
            <button
              key={coin.id}
              className="py-2 flex gap-2"
              onClick={() => onCoinSelect(coin)}
            >
              <Image src={coin.image} alt={coin.name} width={25} height={25} />
              {coin.name}
            </button>
          ))}
        </div>
      )}
      <hr className="dark:border-white border-black mt-1 mb-3" />
      {currentCoin && (
        <p className="flex items-center gap-2 dark:text-white text-black text-sm">
          <span>1 {currentCoin.symbol.toUpperCase()}</span>
          {symbol}
          {currentCoin.current_price}
        </p>
      )}
    </div>
  );
};

export default CoinRow;
