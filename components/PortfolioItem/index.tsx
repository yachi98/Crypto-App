import { Portfolio } from "@/interfaces/portfolio.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import { removePortfolio } from "@/redux/features/portfolioSlice";
import { useState } from "react";
import PortfolioItemModal from "../PortfolioItemModal";
import DeleteIcon from "@/public/DeleteIcon.svg";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const PortfolioItem = ({ coin }: { coin: Portfolio }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePortfolio(coin.id));
    setShowModal(false);
  };

  return (
    <div className="p-5 dark:bg-[#070b15] bg-white h-[160px] rounded-3xl mb-3 relative">
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <img
          src={coin.large}
          alt={coin.name}
          className="w-full h-full object-cover blur-3xl opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex items-center gap-3">
        <img src={coin.large} alt={coin.name} width={40} height={40} />
        <h3 className="text-lg">{coin.value}</h3>
      </div>
      <h3 className="text-sm">Current Price:</h3>
      <h3 className="text-sm">Amount: {coin.amount}</h3>
      <h3 className="text-sm">Date Purchased: {coin.date}</h3>
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
