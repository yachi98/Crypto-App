import PriceChange from "@/components/PriceChange";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import getPercentage from "@/utils/getPercentage";
import Image from "next/image";
import Link from "next/link";
import CoinMarketBar from "../CoinMarketBar";
import PriceCoinGraph from "../PriceCoinGraph";

const RowCoinItem = ({ coin }: { coin: Coin }) => {
  const { symbol } = useAppSelector((state) => state.currencySlice);

  const priceChange1h: number = getFormattedPrice(
    coin.price_change_percentage_1h_in_currency
  );
  const priceChange24h: number = getFormattedPrice(
    coin.price_change_percentage_24h_in_currency
  );
  const priceChange7d: number = getFormattedPrice(
    coin.price_change_percentage_7d_in_currency
  );

  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="dark:bg-black bg-white dark:hover:bg-[#ffffff0f] hover:bg-[#efefef] w-full dark:text-[#DEDEDE] text-black text-sm font-light rounded-3xl p-4 mb-2 flex gap-3 items-center">
        <span>{coin.market_cap_rank}</span>
        <Image src={coin.image} alt={coin.name} width={30} height={30} />
        <span className="w-[14%] px-1">
          {coin.name.charAt(0).toUpperCase() + coin.name.slice(1).toLowerCase()}{" "}
          ({coin.symbol.toUpperCase()})
        </span>
        <span className="w-[6%] px-1">
          {symbol}
          {formatNumber(coin.current_price)}
        </span>
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
          <div className="justify-between text-xs hidden md:inline">
            <span
              className={
                priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"
              }
            >
              {formatNumber(coin.total_volume)}
            </span>
            <span
              className={
                priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"
              }
            >
              {formatNumber(coin.market_cap)}
            </span>
          </div>
          <div className="hidden md:inline">
            <CoinMarketBar
              fill={priceChange24h > 0 ? "bg-[#00B1A7]" : "bg-[#FE2264]"}
              percentage={getPercentage(coin.total_volume, coin.market_cap)}
            />
          </div>
        </span>
        <span className="w-full max-w-[20%] px-1">
          <div className="justify-between text-xs hidden xl:inline">
            <span
              className={
                priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"
              }
            >
              {formatNumber(coin.total_volume)}
            </span>
            <span
              className={
                priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"
              }
            >
              {formatNumber(coin.market_cap)}
            </span>
          </div>
          <div className="hidden xl:inline">
            <CoinMarketBar
              fill={priceChange24h > 0 ? "bg-[#00B1A7]" : "bg-[#FE2264]"}
              percentage={getPercentage(
                coin.circulating_supply,
                coin.total_supply
              )}
            />
          </div>
        </span>
        <span className="w-[14%] pl-3 h-[50px]">
          <PriceCoinGraph
            prices={coin.sparkline_in_7d.price}
            priceChange={priceChange7d}
            reduceBy={6}
          />
        </span>
      </div>
    </Link>
  );
};

export default RowCoinItem;
