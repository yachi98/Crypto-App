"use client";

import { Coin } from "@/interfaces/coin.interface";
import Image from "next/image";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import PriceChange from "@/components/PriceChange";
import { changeCoin } from "@/redux/features/selectedCoins";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { motion } from "framer-motion";

const PriceCoinItem = ({ coin }: { coin: Coin }) => {
  const [isSelected, setSelected] = useState(false);
  const { coinId } = useAppSelector((state) => state.selectedCoinData);
  const dispatch: AppDispatch = useDispatch();
  const { symbol } = useAppSelector((state) => state.currencySlice);

  useEffect(() => {
    coin.id === coinId ? setSelected(true) : setSelected(false);
  }, [coinId]);

  const coinSelector = (coin: Coin) => {
    if (coin.id !== coinId) {
      dispatch(changeCoin(coin.id));
    }
  };

  const priceChange1h: number = getFormattedPrice(
    coin.price_change_percentage_1h_in_currency
  );
  return (
    <motion.button
      onClick={() => coinSelector(coin)}
      className={`rounded-3xl pl-2 border-white transition bg-white ${
        isSelected
          ? "bg-gradient-to-r from-purple-400 to-orange-300 text-white"
          : "dark:bg-gradient-to-r from-black to-gray-900"
      } w-[250px] h-[75px] flex items-center flex-shrink-0`}
      whileTap={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <div className="flex gap-3 items-center">
        <div className="ml-2">
          <Image src={coin.image} alt={coin.name} width={30} height={30} />
        </div>
        <div className="flex flex-col">
          <span className="px-1 dark:text-white text-grey flex text-sm">
            {coin.name.charAt(0).toUpperCase() +
              coin.name.slice(1).toLowerCase()}{" "}
            ({coin.symbol.toUpperCase()})
          </span>
          <div className="flex gap-14">
            <span className="w-[6%] px-1 dark:text-white text-grey text-sm">
              {symbol}
              {formatNumber(coin.current_price)}
            </span>
            <PriceChange price={priceChange1h} />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default PriceCoinItem;
