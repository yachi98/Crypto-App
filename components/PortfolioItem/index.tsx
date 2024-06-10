import { Portfolio } from "@/interfaces/portfolio.interface";
import { Coin } from "@/interfaces/coin.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import { SearchCoin } from "@/interfaces/searchCoin.interface";
import { removePortfolio } from "@/redux/features/portfolioSlice";
import { useState } from "react";
import PortfolioItemModal from "../PortfolioItemModal";
import DeleteIcon from "@/public/DeleteIcon.svg";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const PortfolioItem = ({ item }: { item: Portfolio }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  // const coinData: Coin = portfolioData.find((coin) => coin.id === item.coinId);
  // const coinData: Portfolio = portfolioData.find(
  //   (coin) => coin.id === item.coinId
  // );

  const handleRemove = () => {
    dispatch(removePortfolio(item.id));
    setShowModal(false);
  };

  return (
    <div className="p-5 dark:bg-[#070b15] bg-white h-[270px] rounded-3xl mb-3 relative">
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <img
          src={item.large}
          alt={item.name}
          className="w-[full] h-full object-cover blur-3xl opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex items-center gap-3">
        <img src={item.large} alt={item.name} width={40} height={40} />
        <h3 className="text-xl">{item.value}</h3>
      </div>
      <h3 className="text-xl">Current Price: </h3>
      <h3 className="text-xl">Amount: {item.amount}</h3>
      <h3 className="text-xl">Date Purchased: {item.date}</h3>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 dark:hover:bg-[#121929] hover:bg-slate-100  rounded-xl absolute right-3 top-3"
      >
        <DeleteIcon />
      </button>
      {showModal && (
        <PortfolioItemModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default PortfolioItem;
