import { Portfolio } from "@/interfaces/portfolio.interface";
import DeleteIcon from "@/public/DeleteIcon.svg";
import { removePortfolio } from "@/redux/features/portfolioSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import formatNumber from "@/utils/formatNumber";
import getFormattedPrice from "@/utils/getFormattedDate";
import getPercentage from "@/utils/getPercentage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CoinMarketBar from "../CoinMarketBar";
import PortfolioItemModal from "../PortfolioItemModal";

const PortfolioItem = ({ coin }: { coin: Portfolio }) => {
  const [showModal, setShowModal] = useState(false);
  const { symbol, currency } = useAppSelector((state) => state.currencySlice);
  const dispatch: AppDispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePortfolio(coin.id));
    setShowModal(false);
  };

  const marketToVolume = getFormattedPrice(
    (coin.market_data.market_cap[currency] /
      coin.market_data.total_volume[currency]) *
      100
  );

  return (
    <div className="p-5 dark:bg-[#070b15] bg-white h-[230px] rounded-3xl mb-5 relative">
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
      <div className="grid grid-cols-4 gap-12 mt-3 items-center">
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
            {formatNumber(coin.market_data.purchasePrice[currency])}
          </span>
        </div>
        <div>
          <h3 className="text-sm">Total:</h3>
          <span className="text-[#01F1E3]">
            {symbol}
            {formatNumber(coin.purchaseAmount)}
          </span>
        </div>
        <div>
          <h3 className="text-sm">Date Purchased:</h3>
          <span className="text-[#01F1E3]">{coin.purchaseDate}</span>
        </div>
        <div>
          <h3 className="text-sm">Market Cap vs Volume</h3>
          <span className="text-sm text-[#01F1E3]">
            {formatNumber(marketToVolume)}%
          </span>

          <CoinMarketBar
            fill="bg-[#01F1E3] bg-gray-800"
            percentage={getPercentage(
              coin.market_data.market_cap[currency],
              coin.market_data.total_volume[currency]
            )}
          />
        </div>
        <h3 className="text-sm">Circ Supply vs Max Supply</h3>
        <h3 className="text-sm">Price change 24h</h3>
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
    </div>
  );
};

export default PortfolioItem;
