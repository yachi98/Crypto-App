import { Coin } from "@/interfaces/coin.interface";
import formatNumber from "@/utils/formatNumber";
import PriceChange from "@/components/PriceChange";
import getFormattedPrice from "@/utils/getFormattedDate";
import CoinMarketBar from "../CoinMarketBar";
import getPercentage from "@/utils/getPercentage";
import Image from "next/image";
import Link from "next/link";

const RowCoinItem = ({ coin }: { coin: Coin }) => {
  const priceChange24h: number = getFormattedPrice(
    coin.price_change_percentage_24h
  );

  // const priceChange1h: number = getFormattedPrice(coin.price_change_percentage_1h);

  return (
    <div className="bg-black w-full  text-[#DEDEDE] text-sm font-light p-5 flex gap-3 items-center">
      <span>{coin.market_cap_rank}</span>
      <Image src={coin.image} alt={coin.name} width={30} height={30} />

      <span className="w-[14%] px-1">
        {coin.name.charAt(0).toUpperCase() + coin.name.slice(1).toLowerCase()} (
        {coin.symbol.toUpperCase()})
      </span>
      <span className="w-[6%] px-1">{formatNumber(coin.current_price)}</span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange24h} />
      </span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange24h} />
      </span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange24h} />
      </span>
      <span className="w-full max-w-[18%] px-1">
        <CoinMarketBar
          fill="bg-[#FFFF]"
          percentage={getPercentage(coin.total_volume, coin.market_cap)}
        />
      </span>
      <span className="w-full max-w-[18%] px-1">
        <CoinMarketBar
          fill="bg-[#FFFF]"
          percentage={getPercentage(coin.circulating_supply, coin.total_supply)}
        />
      </span>
      <span className="w-[6%] px-1"></span>
    </div>
  );
};

export default RowCoinItem;
