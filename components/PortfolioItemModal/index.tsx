import { useState } from "react";

interface PortfolioItemModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleRemove: () => void;
}

const PortfolioItemModal = ({
  showModal,
  setShowModal,
  handleRemove,
}: PortfolioItemModalProps) => {
  return (
    <div className="w-[380px] h-[150px] dark:bg-[#0a0f1c] bg-[#fafafa] absolute z-55 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl p-4 flex flex-col justify-between">
      <h3 className="text-lg flex justify-center w-full text-center">
        Are you sure you want to delete this coin?
      </h3>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setShowModal(!showModal)}
          className="text-lg p-2 w-[120px] dark:bg-[#121929] bg-slate-200 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={() => handleRemove()}
          className="text-lg p-2 w-[120px] bg-red-500 rounded-2xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PortfolioItemModal;
