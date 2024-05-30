"use client";

import { Coin } from "@/interfaces/coin.interface";
import Image from "next/image";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import PriceChange from "@/components/PriceChange";
import {
  removeCoin,
  getSelectedCoinData,
} from "@/redux/features/selectedCoins";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const PriceCoinItem = ({ coin }: { coin: Coin }) => {
  const { selectedCoins, timeDay, currency } = useAppSelector(
    (state) => state.selectedCoinData
  );
  const dispatch: AppDispatch = useDispatch();
  const { symbol } = useAppSelector((state) => state.currencySlice);
  const isSelected = selectedCoins.some((item) => item.id === coin.id);

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
      className={`rounded-2xl pl-2 border-white bg-white ${
        isSelected
          ? "bg-gradient-to-r from-purple-400 to-orange-300 text-sm"
          : "dark:bg-gray-900 dark:hover:bg-[#161f32] hover:bg-[#eaeaea]"
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
            className={`px-1 text-xs ${
              isSelected ? "text-white" : "dark:text-[#c2c2c2] text-grey"
            } flex`}
          >
            {coin.name.charAt(0).toUpperCase() +
              coin.name.slice(1).toLowerCase()}{" "}
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
