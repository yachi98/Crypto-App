import PercentageBar from "@/components/PercentageBar";
import { Coin } from "@/interfaces/coin.interface";
import formatNumber from "@/utils/formatNumber";
import PriceChange from "@/components/PriceChange";
import getFormattedPrice from "@/utils/getFormattedDate";
// import Image from "next/image";

const RowCoinItem = ({ coin }: { coin: Coin }) => {
  const priceChange24h: number = getFormattedPrice(
    coin.price_change_percentage_24h
  );

  // const priceChange1h: number = getFormattedPrice(coin.price_change_percentage_1h);

  return (
    <div className="bg-black w-full  text-[#DEDEDE] text-sm font-light p-5 flex gap-3">
      <span className="px-1">{coin.market_cap_rank}</span>
      {/* <Image src={coin.image} alt={coin.name} width={30} height={30} /> */}
      <span className="w-[16%] px-1">
        {coin.name.charAt(0).toUpperCase() + coin.name.slice(1).toLowerCase()} (
        {coin.symbol.toUpperCase()})
      </span>
      <span className="w-[6%] px-1">{coin.current_price}</span>
      <span className="w-[6%] px-1"></span>
      <span className="w-[6%] px-1">
        <PriceChange price={priceChange24h} />
      </span>
      <span className="w-[6%] px-1"></span>
      <span className="w-full max-w-[18%] px-1"></span>
      <span className="w-full max-w-[18%] px-1"></span>
      <span></span>
    </div>
  );
};

export default RowCoinItem;
