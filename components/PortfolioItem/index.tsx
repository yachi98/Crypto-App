import { Portfolio } from "@/interfaces/portfolio.interface";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import { removePortfolio } from "@/redux/features/portfolioSlice";
import { useState } from "react";
import PortfolioItemModal from "../PortfolioItemModal";
import CoinMarketBar from "../CoinMarketBar";
import PriceChange from "../PriceChange";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import getPercentage from "@/utils/getPercentage";
import DeleteIcon from "@/public/DeleteIcon.svg";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const PortfolioItem = ({ coin }: { coin: Portfolio }) => {
  const [showModal, setShowModal] = useState(false);
  const { symbol, currency } = useAppSelector((state) => state.currencySlice);
  const dispatch: AppDispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePortfolio(coin.id));
    setShowModal(false);
  };

  // const priceChange24h = getFormattedPrice(coin.price_change_percentage_24h);

  // const priceChange24h = getFormattedPrice(
  //   ((coin.market_data.current_price[currency] - coin.market_data.current_price[currency] * 0.01) /
  //     coin.market_data.current_price[currency]) *
  //   100
  // );

  const marketToVolume = getFormattedPrice(
    (coin.market_data.market_cap[currency] /
      coin.market_data.total_volume[currency]) *
      100
  );

  return (
    <div className="p-5 dark:bg-[#070b15] bg-white h-[200px] rounded-3xl mb-3 relative">
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <img
          src={coin.image}
          alt={coin.value}
          className="w-full h-full object-cover blur-3xl opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.value} width={40} height={40} />
        <h3 className="text-lg">{coin.value}</h3>
      </div>
      <h3 className="text-sm">
        Purchase Price: {symbol}
        {formatNumber(coin.market_data.current_price[currency])}
      </h3>
      <h3 className="text-sm">Amount: {coin.purchaseAmount}</h3>
      <h3 className="text-sm">Date Purchased: {coin.purchaseDate}</h3>
      <h3 className="text-sm">Market Cap vs Volume</h3>
      <span className="text-sm text-grape">
        {formatNumber(marketToVolume)}%
      </span>

      <CoinMarketBar
        fill="dark:bg-white bg-gray-800"
        // percentage={marketToVolume}
        percentage={getPercentage(
          coin.market_data.market_cap[currency],
          coin.market_data.total_volume[currency]
        )}
      />
      {/* <h3 className="text-sm">Circ Supply vs Max Supply</h3> */}
      {/* <PriceChange price={priceChange24h} /> */}
      <button
        onClick={() => setShowModal(true)}
        className="p-2 dark:hover:bg-[#121929] hover:bg-slate-100  rounded-xl absolute right-3 top-3"
      >
        <DeleteIcon />
      </button>
      {showModal && (
        <PortfolioItemModal
          coin={coin}
          showModal={showModal}
          setShowModal={setShowModal}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default PortfolioItem;
