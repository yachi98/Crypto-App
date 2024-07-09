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
      className={`rounded-xl pl-2 border-white bg-white ${
        isSelected
          ? "bg-gradient-to-r from-purple-400 to-orange-300 text-sm"
          : "dark:bg-[#0d121d] dark:hover:bg-[#161f32] hover:bg-[#efefef]"
      } w-[190px] h-[60px] flex items-center flex-shrink-0`}
    >
      <div className="flex gap-3 items-center">
        <div className="ml-2">
          <div className="w-[25px] h-[25px] relative">
            <Image src={coin.image} alt={coin.name} width={25} height={25} />
          </div>
        </div>
        <div className="flex flex-col">
          <span
            className={`px-1 text-xs  flex gap-1 ${
              isSelected ? "text-white" : "dark:text-[#c2c2c2] text-grey "
            } flex`}
          >
            <span className="truncate max-w-[4rem]">
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
          <div className="flex gap-14">
            <span
              className={` w-[6%] px-1 text-xs ${
                isSelected ? "text-white" : "dark:text-[#c2c2c2] text-grey"
              } flex`}
            >
              {symbol}
              {formatNumber(coin.current_price)}
            </span>
            <PriceChange price={priceChange1h} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default PriceCoinItem;
