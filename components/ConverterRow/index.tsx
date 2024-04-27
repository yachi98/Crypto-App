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
    <div className="w-1/2 dark:bg-gradient-to-r from-black to-gray-900 bg-white px-6 pt-6 pb-5 rounded-2xl relative h-[150px]">
      <div className="flex">
        <div className="w-[60%] relative">
          {currentCoin && (
            <Image
              src={currentCoin.image}
              alt={currentCoin.name}
              width={25}
              height={25}
              className="top-1/2 -translate-y-1/2 left-2 absolute"
            />
          )}
          <input
            className="bg-transparent placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 focus:outline-none rounded-md w-full"
            onChange={handleSearchChange}
            value={coinSearch}
            onFocus={() => setShowDropdown(true)}
          />
        </div>
        <input
          className="bg-transparent placeholder:text-indigo dark:placeholder:text-white py-3 px-3 focus:outline-none w-[40%] text-right"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      {showDropdown && (
        <div className="max-h-[300px] inline-flex flex-col overflow-y-scroll dark:bg-blackberry dark:bg-gray-950 bg-white absolute z-10 left-5 top-[72px] rounded-xl">
          {coinResults.map((coin) => (
            <button
              key={coin.id}
              className="px-4 py-2 flex gap-2"
              onClick={() => onCoinSelect(coin)}
            >
              <Image src={coin.image} alt={coin.name} width={30} height={30} />
              {coin.name}
            </button>
          ))}
        </div>
      )}
      <hr className="dark:border-white border-black mt-3 mb-3" />
      {currentCoin !== null && (
        <p className="flex items-center gap-2 px-3 dark:text-white text-black text-sm">
          <span>1 {currentCoin.symbol.toUpperCase()}</span>
          {symbol}
          {currentCoin.current_price}
        </p>
      )}
    </div>
  );
};

export default CoinRow;
