"use client";

import MarketTableHeading from "../MarketTableHeading";
import RowCoinItem from "@/components/RowCoinItem/";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";

const CoinMarketTable = () => {
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const hasCoins: boolean = coinMarketData.length > 0;

  return (
    <div>
      <h1 className="text-white text-light p-4">Market Overview</h1>
      <MarketTableHeading />

      {hasCoins &&
        coinMarketData.map((coin: Coin) => (
          <RowCoinItem key={coin.id} coin={coin} />
        ))}
    </div>
  );
};

export default CoinMarketTable;
