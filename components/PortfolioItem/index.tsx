import { Portfolio } from "@/interfaces/portfolio.interface";
import { Coin } from "@/interfaces/coin.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
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

  // console.log("hi", portfolioData);

  const handleRemove = () => {
    dispatch(removePortfolio(item.id));
    setShowModal(false);
  };

  return (
    <div className="p-5 dark:bg-[#0d121d] bg-white h-[270px] rounded-3xl mb-3 relative">
      <h3 className="text-xl">{item.value}</h3>
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
