"use client";

import PriceChange from "@/components/PriceChange";
import { Coin } from "@/interfaces/coin.interface";
import {
  getSelectedCoinData,
  removeCoin,
} from "@/redux/features/selectedCoins";
import { AppDispatch, useAppSelector } from "@/redux/store";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import Image from "next/image";
import { useDispatch } from "react-redux";

const PriceCoinItem = ({ coin }: { coin: Coin }) => {
  const { selectedCoins, timeDay } = useAppSelector(
    (state) => state.selectedCoinData
  );
  const dispatch: AppDispatch = useDispatch();
  const { symbol, currency } = useAppSelector((state) => state.currencySlice);
  const isSelected = selectedCoins.find((item) => item.id === coin.id);

  const coinSelector = (coin: Coin) => {
    if (isSelected) {
      dispatch(removeCoin(coin.id));
    } else if (selectedCoins.length < 3) {
      dispatch(
        getSelectedCoinData({
          currency: currency,
          timeDay: timeDay,
          coinId: coin.id,
        })
      );
    }
  };

  const priceChange1h: number = getFormattedPrice(
    coin.price_change_percentage_1h_in_currency
  );
  return (
    <button
      onClick={() => coinSelector(coin)}
      className={`rounded-xl border-white bg-white ${
        isSelected
          ? "bg-gradient-to-r from-[#007aff] to-[#007aff]"
          : "dark:bg-black dark:hover:bg-[#ffffff0f] hover:bg-[#efefef]"
      } w-44 flex items-center p-2 flex-shrink`}
    >
      <div className="flex gap-3 items-center">
        <Image src={coin.image} alt={coin.name} width={24} height={24} />
        <div className="flex flex-col">
          <span
            className={`px-1 text-xs flex gap-1 ${
              isSelected ? "text-white" : "dark:text-[#c2c2c2]"
            } flex`}
          >
            <span className="truncate max-w-16">
              {coin.name
                .split(" ")
                .map(
                  (word) =>
                    word[0].toUpperCase() +
                    word.slice(1, word.length).toLowerCase()
                )
                .join(" ")}{" "}
            </span>
            ({coin.symbol.toUpperCase()})
          </span>
          <div
            className={`flex gap-4 text-xs pl-1 ${
              isSelected ? "text-white" : "dark:text-[#c2c2c2]"
            }`}
          >
            <div>
              <span className="w-2 h-2">{symbol}</span>
              {formatNumber(coin.current_price)}
            </div>
            <PriceChange price={priceChange1h} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default PriceCoinItem;
