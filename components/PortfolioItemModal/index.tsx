import { Portfolio } from "@/interfaces/portfolio.interface";

interface PortfolioItemModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleRemove: () => void;
  coin: Portfolio;
}

const PortfolioItemModal = ({
  showModal,
  setShowModal,
  handleRemove,
  coin,
}: PortfolioItemModalProps) => {
  return (
    <div
      style={{ marginTop: "-250px" }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="w-[360px] h-[200px] dark:bg-[#0a0f1c] opacity-80 bg-[#fafafa] rounded-2xl p-5 flex flex-col justify-between">
        <div className="flex justify-center">
          <img width={45} height={45} src={coin.image} />
        </div>
        <h3 className="text-md flex justify-center w-full text-center">
          Are you sure you want to delete this {coin.value}?
        </h3>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setShowModal(!showModal)}
            className="text-sm p-3 w-[170px] dark:bg-[#121929] bg-slate-200 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            className="text-sm p-3 w-[170px] bg-red-500 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemModal;
