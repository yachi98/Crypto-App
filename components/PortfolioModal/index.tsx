import { useRef, useState, ChangeEvent, useEffect } from "react";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import CloseIcon from "@/public/CloseIcon.svg";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioModal = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  const currencyInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [coinSearch, setCoinSearch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [invalidCoin, setInvalidCoin] = useState<boolean>(false);
  const [invalidAmount, setInvalidAmount] = useState<boolean>(false);
  const [invalidDate, setInvalidDate] = useState<boolean>(false);

  const coinResults = coinMarketData.filter((coin: Coin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  // const onCoinSelect = (coin: Coin) => {
  //   handleCoinSelect(coin);
  //   setShowDropdown(false);
  //   setCoinSearch(coin.name);
  // };

  const handleInputFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.style.border = "1px solid #fdba74";
    }
  };

  const handleInputBlur = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.style.border = "none";
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  if (!showModal) {
    return null;
  }

  // useEffect(() => {
  //   if (currentCoin) {
  //     setCoinSearch(currentCoin.name);
  //   }
  // }, [currentCoin]);

  return (
    <div className="w-[700px] h-[360px] dark:bg-gradient-to-r from-black to-gray-900 bg-white absolute top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-3xl">
      <div className="absolute right-0 p-5">
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
      <h3 className="text-xl p-8">Select coin</h3>
      <div className="p-8 grid grid-cols-2 gap-2 items-center">
        <h3>Select currency</h3>
        <input
          ref={currencyInputRef}
          onFocus={() => handleInputFocus(currencyInputRef)}
          onBlur={() => handleInputBlur(currencyInputRef)}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
        />
        <h3>Enter amount you purchased</h3>
        <input
          ref={amountInputRef}
          onFocus={() => handleInputFocus(amountInputRef)}
          onBlur={() => handleInputBlur(amountInputRef)}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
        />
        <h3>Select the date you purchased</h3>
        <input
          ref={dueDateInputRef}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          onFocus={() => handleInputFocus(dueDateInputRef)}
          onBlur={() => handleInputBlur(dueDateInputRef)}
        />
      </div>

      <div className="flex justify-center gap-5">
        <button className="p-2 dark:bg-gray-900 bg-light-theme rounded-xl w-[100px]">
          Cancel
        </button>
        <button className="p-2 dark:bg-gray-800 bg-gray-200 rounded-xl w-[100px]">
          Save
        </button>
      </div>
    </div>
  );
};

export default PortfolioModal;
