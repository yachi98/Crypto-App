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

  const formatCoinName = (name: string) => {
    const nameParts = name.split(" ");
    const truncatedName =
      nameParts.length > 1 ? `${nameParts.slice(0, 1).join(" ")}...` : name;

    return (
      truncatedName.charAt(0).toUpperCase() +
      truncatedName.slice(1).toLowerCase()
    );
  };

  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="dark:bg-black bg-white dark:hover:bg-[#ffffff0f] hover:bg-[#efefef] w-full dark:text-[#DEDEDE] text-black text-sm font-light rounded-3xl p-4 mb-2 flex items-center justify-between">
        <span className="hidden sm:inline w-[2%]">{coin.market_cap_rank}</span>
        <div className="w-1/3 flex items-center md:w-[16%] xl:w-[8%]">
          <Image src={coin.image} alt={coin.name} width={30} height={30} />
          <span className="flex-none w-[15%] px-1 md:w-[12%]">
            {formatCoinName(coin.name)} ({coin.symbol.toUpperCase()})
          </span>
        </div>
        <span className="flex-1 w-1/3 px-1 md:w-[16%] xl:w-[8%]">
          {symbol}
          {formatNumber(coin.current_price)}
        </span>
        <span className="flex-1 hidden md:inline w-[2%] md:w-[16%] xl:w-[8%] px-1">
          <PriceChange price={priceChange1h} />
        </span>
        <span className="flex-1 hidden md:inline w-[2%] md:w-[16%] xl:w-[8%] px-1">
          <PriceChange price={priceChange24h} />
        </span>
        <span className="flex-1 hidden md:inline w-[2%] md:w-[16%] xl:w-[8%] px-1">
          <PriceChange price={priceChange7d} />
        </span>
        <span className="flex-1 hidden xl:inline w-[8%] px-1">
          <div className="text-xs flex items-center justify-between">
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
          <CoinMarketBar
            fill={priceChange24h > 0 ? "bg-[#00B1A7]" : "bg-[#FE2264]"}
            percentage={getPercentage(coin.total_volume, coin.market_cap)}
          />
        </span>
        <span className="flex-1 hidden xl:inline w-[8%] px-1">
          <div className="text-xs flex items-center justify-between">
            <span
              className={
                priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"
              }
            >
              {formatNumber(coin.circulating_supply)}
            </span>

            <span
              className={
                priceChange24h > 0 ? "text-[#00B1A7]" : "text-[#FE2264]"
              }
            >
              {formatNumber(coin.total_supply)}
            </span>
          </div>
          <CoinMarketBar
            fill={priceChange24h > 0 ? "bg-[#00B1A7]" : "bg-[#FE2264]"}
            percentage={getPercentage(
              coin.circulating_supply,
              coin.total_supply
            )}
          />
        </span>
        <span className="flex-1 w-1/3 h-[40px] md:w-[16%] xl:w-[8%]">
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
