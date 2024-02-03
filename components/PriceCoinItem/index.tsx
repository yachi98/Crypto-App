import { Coin } from "@/interfaces/coin.interface";
import Image from "next/image";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import PriceChange from "@/components/PriceChange";
import { useState } from "react";

const PriceCoinItem = ({ coin }: { coin: Coin }) => {
  const [isSelected, setSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleClick = () => {
    if (!isSelected && selectedCount >= 3) {
      return;
    }
    setSelected(!isSelected);
  };

  const priceChange1h: number = getFormattedPrice(
    coin.price_change_percentage_1h_in_currency
  );
  return (
    <button
      onClick={handleClick}
      //   className="rounded-2xl p-2 bg-black w-[250px] h-[80px] flex items-center flex-shrink-0"
      className={`rounded-3xl pl-2 border-white ${
        isSelected
          ? "bg-gradient-to-r from-purple-400 to-orange-300"
          : "bg-black"
      } w-[250px] h-[75px] flex items-center flex-shrink-0`}
    >
      <Image src={coin.image} alt={coin.name} width={30} height={30} />
      <div className="flex flex-col">
        <span className="px-1 text-white flex text-sm">
          {coin.name.charAt(0).toUpperCase() + coin.name.slice(1).toLowerCase()}{" "}
          ({coin.symbol.toUpperCase()})
        </span>
        <div className="flex gap-12">
          <span className="w-[6%] px-1 text-white text-sm">
            {formatNumber(coin.current_price)}
          </span>
          <PriceChange price={priceChange1h} />
        </div>
      </div>
    </button>
  );
};

export default PriceCoinItem;
