import { Portfolio } from "@/interfaces/portfolio.interface";

const PortfolioItem = ({ item }: { item: Portfolio }) => {
  return (
    <div className="p-4 dark:bg-[#0d121d] bg-white h-[270px] rounded-3xl mb-3">
      <h3 className="text-xl">{item.name}</h3>
      <h3 className="text-xl">Current Price: </h3>
      <h3 className="text-xl">Amount: {item.amount}</h3>
      <h3 className="text-xl">Date Purchased: {item.date}</h3>
    </div>
  );
};

export default PortfolioItem;
