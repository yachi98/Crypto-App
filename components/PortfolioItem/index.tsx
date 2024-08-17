import { Portfolio } from "@/interfaces/portfolio.interface";
import DeleteIcon from "@/public/DeleteIcon.svg";
import { removePortfolio } from "@/redux/features/portfolioSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import getPercentage from "@/utils/getPercentage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PortfolioItemModal from "../PortfolioItemModal";

const PortfolioItem = ({ coin }: { coin: Portfolio }) => {
  const [showModal, setShowModal] = useState(false);
  const { symbol, currency } = useAppSelector((state) => state.currencySlice);

  const dispatch: AppDispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePortfolio(coin.id));
    setShowModal(false);
  };

  const purchasePrice = coin.market_data.purchasePrice[currency];
  const currentPrice = coin.currentPrice[currency];
  const purchaseAmount = coin.purchaseAmount;

  console.log(coin.currentPrice[currency]);
  console.log(coin.market_data.purchasePrice[currency]);
  console.log("purchaseAmount", purchaseAmount);
  console.log("coin", coin);

  // const profit = currentPrice - purchasePrice;
  const profit = (currentPrice - purchasePrice) * purchaseAmount;
  console.log(profit, "hello");

  // Format the profit and profit percentage for display
  const profitFormatted = formatNumber(profit);

  const profitColor = profit >= 0 ? "#01F1E3" : "#FE2264";
  // getFormattedPrice(profit)

  const marketToVolumePercentage =
    getPercentage(
      coin.market_data.market_cap[currency],
      coin.market_data.total_volume[currency]
    ) / 100;

  const circToMaxSupplyPercentage =
    getPercentage(
      coin.market_data.market_cap[currency],
      coin.market_data.total_volume[currency]
    ) * 100;

  const priceChange24h = getFormattedPrice(
    (coin.market_data.purchasePrice[currency] /
      coin.market_data.market_cap[currency]) *
      1000
  );

  return (
    <div className="p-5 dark:bg-[#000000bd] bg-white h-auto rounded-3xl mb-5 relative">
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <img
          src={coin.image}
          alt={coin.value}
          className="w-full h-full object-cover blur-3xl opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/4"
        />
      </div>
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.value} width={30} height={30} />
        <h3 className="text-lg">{coin.value}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 mt-3 items-center">
        <div>
          <h3 className="text-sm">Purchase Price:</h3>
          <span className="text-[#01F1E3]">
            {symbol}
            {formatNumber(coin.market_data.purchasePrice[currency])}
          </span>
        </div>
        <div>
          <h3 className="text-sm">Current Price:</h3>
          <span className="text-[#01F1E3]">
            {symbol}
            {formatNumber(coin.currentPrice[currency])}
          </span>
        </div>
        <div>
          <h3 className="text-sm">Total Price:</h3>
          <span className="text-[#01F1E3]">
            {symbol}
            {formatNumber(coin.purchaseAmount * purchasePrice)}
          </span>
        </div>
        <div>
          <h3 className="text-sm">Profit:</h3>
          <span className={`text-[${profitColor}]`}>
            {symbol}
            {profitFormatted}
          </span>
        </div>
        <div>
          <h3 className="text-sm">Market Cap vs Volume:</h3>
          <span className="text-sm text-[#01F1E3]">
            {getFormattedPrice(marketToVolumePercentage)}%
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm hidden sm:inline">
            Circ Supply vs Max Supply:
          </h3>
          <span className="text-sm text-[#01F1E3]">
            {formatNumber(circToMaxSupplyPercentage)}%
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm hidden sm:inline">Price Change 24h:</h3>
          <span className="text-sm text-[#01F1E3]">
            {formatNumber(priceChange24h)}%
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm">Date Purchased:</h3>
          <span className="text-[#01F1E3]">{coin.purchaseDate}</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 dark:hover:bg-[#121929] hover:bg-slate-100 rounded-xl absolute right-3 top-3"
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
    </div>
  );
};

export default PortfolioItem;
