"use client";

import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MarketTableHeading from "../MarketTableHeading";
import CoinsTableSpinner from "../Spinner";
import RowCoinItem from "@/components/RowCoinItem/";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { Coin } from "@/interfaces/coin.interface";
import SearchIcon from "@/public/SearchIcon.svg";
import SpinnerIcon from "@/public/SpinnerIcon.svg";
import { useInView } from "react-intersection-observer";

const CoinMarketTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const [coinSearch, setCoinSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const { coinMarketData, isLoading, currentPage, currency, hasError } =
    useAppSelector((state) => state.coinMarketData);
  const hasCoins: boolean = coinMarketData.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const [spinnerRef, inView] = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      dispatch(getCoinData({ currency, page: currentPage }));
    }
  }, [inView]);

  console.log(coinMarketData);

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

  const showSpinner: boolean =
    coinMarketData.length === 0 && isLoading && !hasError;

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <h1 className="dark:text-white text-black text-light p-4">
          Market Overview
        </h1>
        <div className="relative flex items-center overflow-hidden">
          <label
            className={`dark:bg-black p-3 border-3 border-black bg-white cursor-pointer ${
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
              className={`dark:bg-black bg-white  rounded-xl dark:placeholder-white text-xs font-light p-3 border-none outline-none ${
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
      <div
        ref={spinnerRef}
        className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        {isLoading && !hasError && (
          <SpinnerIcon className="h-10 w-10 animate-spin dark:fill-white text-gray-200 dark:text-gray-600" />
        )}
      </div>
      {showSpinner && <CoinsTableSpinner />}
    </div>
  );
};

export default CoinMarketTable;
