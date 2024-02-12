import { Coin } from "@/interfaces/coin.interface";
import formatNumber from "@/utils/formatNumber";
import PriceChange from "@/components/PriceChange";
import getFormattedPrice from "@/utils/getFormattedDate";
import CoinMarketBar from "../CoinMarketBar";
import getPercentage from "@/utils/getPercentage";
import PriceCoinGraph from "../PriceCoinGraph";
import Image from "next/image";
import Link from "next/link";

const RowCoinItem = ({ coin }: { coin: Coin }) => {
  const priceChange1h: number = getFormattedPrice(
    coin.price_change_percentage_1h_in_currency
  );
  const priceChange24h: number = getFormattedPrice(
    coin.price_change_percentage_24h_in_currency
  );
  const priceChange7d: number = getFormattedPrice(
    coin.price_change_percentage_7d_in_currency
  );

  const graphLine: number[] = coin.sparkline_in_7d.price;

  return (
    <div className="bg-black w-full text-[#DEDEDE] text-sm font-light p-5 flex gap-3 items-center border-b border-zinc-800">
      <span>{coin.market_cap_rank}</span>
      <Image src={coin.image} alt={coin.name} width={30} height={30} />
      <span className="w-[14%] px-1">
        {coin.name.charAt(0).toUpperCase() + coin.name.slice(1).toLowerCase()} (
        {coin.symbol.toUpperCase()})
      </span>
      <span className="w-[6%] px-1">{formatNumber(coin.current_price)}</span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange1h} />
      </span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange24h} />
      </span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange7d} />
      </span>
      <span className="w-full max-w-[20%] px-1">
        <div className="flex justify-between text-xs">
          <span
            className={priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"}
          >
            {formatNumber(coin.total_volume)}
          </span>
          <span
            className={priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"}
          >
            {formatNumber(coin.market_cap)}
          </span>
        </div>
        <CoinMarketBar
          fill={priceChange24h > 0 ? "bg-[#00B1A7]" : "bg-[#FE2264]"}
          percentage={getPercentage(coin.total_volume, coin.market_cap)}
        />
      </span>
      <span className="w-full max-w-[20%] px-1">
        <div className="flex justify-between text-xs">
          <span
            className={priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"}
          >
            {formatNumber(coin.total_volume)}
          </span>
          <span
            className={priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"}
          >
            {formatNumber(coin.market_cap)}
          </span>
        </div>
        <CoinMarketBar
          fill={priceChange24h > 0 ? "bg-[#00B1A7]" : "bg-[#FE2264]"}
          percentage={getPercentage(coin.circulating_supply, coin.total_supply)}
        />
      </span>
      <span className="w-[14%] pl-3 h-[50px]">
        <PriceCoinGraph
          prices={graphLine}
          priceChange={priceChange7d}
          reduceBy={6}
        />
      </span>
    </div>
  );
};

export default RowCoinItem;
