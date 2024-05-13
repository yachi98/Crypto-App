import { useRef, useState, ChangeEvent, useEffect } from "react";
import { HistoricalCoin, Portfolio } from "@/interfaces/portfolio.interface";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import CloseIcon from "@/public/CloseIcon.svg";
import axios from "axios";
import { getPortfolioData } from "@/redux/features/portfolioSlice";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioModal = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);
  const currencyInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [coinSearch, setCoinSearch] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [invalidCoin, setInvalidCoin] = useState<boolean>(false);
  const [invalidAmount, setInvalidAmount] = useState<boolean>(false);
  const [invalidDate, setInvalidDate] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const searchCoinData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${coinSearch}&x_cg_demo_api_key=CG-duQsjCRoXZm1bJBTrL8sARut`
        );
        setHistoricalCoins(data.coins);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    searchCoinData();
  }, [coinSearch]);

  const searchCoinResults = historicalCoins.filter((coin: HistoricalCoin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinSearch(searchValue);
    setShowDropdown(true);
    searchValue.trim() === "" ? setShowDropdown(false) : setShowDropdown(true);
  };

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const today: string = new Date().toISOString().split("T")[0];

    if (dateValue <= today) {
      setDate(dateValue);
      setInvalidDate(false);
    } else {
      setInvalidDate(true);
    }
  };

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

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

  const handleCoinSelect = (coin: any) => {
    setCoinSearch(coin.name);
    setShowDropdown(false);
  };

  useEffect(() => {
    dispatch(getPortfolioData(coinSearch));
  }, [coinSearch]);

  return (
    <div className="w-[700px] h-[360px] dark:bg-gradient-to-r from-black to-gray-900 bg-white absolute top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-3xl">
      <div className="absolute right-0 p-5">
        <button onClick={() => setShowModal(false)}>
          <CloseIcon />
        </button>
      </div>
      <h3 className="text-xl p-8">
        {coinSearch ? `${coinSearch}` : "Select currency"}
      </h3>
      <div className="p-8 grid grid-cols-2 gap-2 items-center">
        <h3>Select currency</h3>
        <input
          ref={currencyInputRef}
          placeholder="Select coin..."
          value={coinSearch}
          onChange={handleSearchChange}
          onFocus={() => handleInputFocus(currencyInputRef)}
          onBlur={() => handleInputBlur(currencyInputRef)}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
        />
        {showDropdown && (
          <div className="h-[300px] w-[300px] flex flex-col overflow-y-scroll dark:bg-gray-950 bg-white absolute z-10 rounded-2xl">
            {searchCoinResults.map((coin) => (
              <button
                key={coin.id}
                className="py-2 flex gap-2"
                onClick={() => handleCoinSelect(coin)}
              >
                <img alt={coin.name} width={25} height={25} />
                {coin.name}
              </button>
            ))}
          </div>
        )}

        <h3>Enter amount you purchased</h3>
        <input
          value={amount}
          placeholder="Select amount..."
          ref={amountInputRef}
          onChange={handleAmount}
          onFocus={() => handleInputFocus(amountInputRef)}
          onBlur={() => handleInputBlur(amountInputRef)}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
        />
        <h3>Select the date you purchased</h3>
        <div className="flex flex-col">
          <input
            ref={dueDateInputRef}
            className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
            type="date"
            value={date}
            onChange={handleDueDateChange}
            onFocus={() => handleInputFocus(dueDateInputRef)}
            onBlur={() => handleInputBlur(dueDateInputRef)}
          />
          {invalidDate && (
            <span className="text-red-500 text-sm">
              Purchase date can not be in the future
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-5">
        <button
          onClick={() => setShowModal(false)}
          className="p-2 dark:bg-gray-900 bg-light-theme rounded-xl w-[100px]"
        >
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
