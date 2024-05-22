import { useRef, useState, ChangeEvent, useEffect } from "react";
import { HistoricalCoin, Portfolio } from "@/interfaces/portfolio.interface";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import CloseIcon from "@/public/CloseIcon.svg";
import axios from "axios";
import { getPortfolioData } from "@/redux/features/portfolioSlice";
import { addPortfolio } from "@/redux/features/portfolioSlice";

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
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [invalidCoin, setInvalidCoin] = useState<boolean>(false);
  const [invalidAmount, setInvalidAmount] = useState<boolean>(false);
  const [invalidDate, setInvalidDate] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const searchCoinData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${coinValue}&x_cg_demo_api_key=CG-duQsjCRoXZm1bJBTrL8sARut`
        );
        setHistoricalCoins(data.coins);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      } finally {
        setLoading(false);
      }
    };

    searchCoinData();
  }, [coinValue]);

  const searchCoinResults = historicalCoins.filter((coin: HistoricalCoin) =>
    coin.name.toLowerCase().startsWith(coinValue)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (coinValue.trim() === "") {
      setInvalidCoin(true);
      setShowDropdown(false);
    }

    if (amount.trim() === "") {
      setInvalidAmount(true);
      setShowDropdown(false);
      return;
    }

    // setInvalidAmount(false);

    const portfolioCoin = {
      value: coinValue,
      amount: amount,
      date: dueDate,
    };
    dispatch(addPortfolio(portfolioCoin));
    console.log(portfolioCoin);
    setCoinValue("");
    setAmount("");
    setDueDate("");
    setShowModal(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinValue(searchValue);
    setShowDropdown(true);
    searchValue.trim() === "" ? setShowDropdown(false) : setShowDropdown(true);
  };

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const today: string = new Date().toISOString().split("T")[0];

    if (dateValue <= today) {
      setDueDate(dateValue);
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

  const handleCoinSelect = (coin: HistoricalCoin) => {
    setCoinValue(coin.name);
    setSelectedCoin(coin.name);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setCoinValue("");
    setSelectedCoin("");
    setAmount("");
    setDueDate("");
  };

  useEffect(() => {
    dispatch(getPortfolioData(coinValue));
  }, [coinValue]);

  return (
    <div className="w-[720px] h-[380px] dark:bg-black bg-white border dark:border-[#171717] absolute top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-3xl">
      <div className="absolute right-0 p-5">
        <button onClick={() => handleCancel()}>
          <CloseIcon />
        </button>
      </div>
      <h3 className="text-xl p-8">
        {selectedCoin ? `${selectedCoin}` : "Select currency"}
      </h3>
      <form onSubmit={handleSubmit} className="px-8">
        <div className="grid grid-cols-2 gap-4 items-center">
          <label>Select currency</label>
          <div className="flex flex-col">
            <input
              ref={currencyInputRef}
              placeholder="Select coin..."
              value={coinValue}
              onChange={handleSearchChange}
              onFocus={() => handleInputFocus(currencyInputRef)}
              onBlur={() => handleInputBlur(currencyInputRef)}
              className="dark:bg-[#09090c] bg-light-theme outline-none rounded-xl p-2 w-full"
            />
            {showDropdown && (
              <div className="col-span-2 h-[300px] w-[320px] flex flex-col overflow-y-scroll dark:bg-[#09090c] bg-white absolute z-10 rounded-2xl">
                {loading ? (
                  <div className="py-2 flex gap-2 justify-left">Loading...</div>
                ) : (
                  searchCoinResults.map((coin) => (
                    <button
                      key={coin.id}
                      className="py-2 flex gap-2"
                      onClick={() => handleCoinSelect(coin)}
                    >
                      <img
                        // src={coin.image.thumb}
                        alt={coin.name}
                        width={25}
                        height={25}
                      />
                      {coin.name}
                    </button>
                  ))
                )}
              </div>
            )}
            {invalidCoin && (
              <span className="text-[#a5a5a5] text-xs">
                Need to choose coin
              </span>
            )}
          </div>

          <label>Enter amount you purchased</label>
          <div className="flex flex-col">
            <input
              value={amount}
              placeholder="Select amount..."
              ref={amountInputRef}
              onChange={handleAmount}
              onFocus={() => handleInputFocus(amountInputRef)}
              onBlur={() => handleInputBlur(amountInputRef)}
              className="dark:bg-[#09090c] bg-light-theme outline-none rounded-xl p-2 w-full"
            />
            {invalidAmount && (
              <span className="text-[#a5a5a5] text-xs">
                Purchase amount not specified
              </span>
            )}
          </div>
          <label>Select the date you purchased</label>
          <div className="flex flex-col">
            <input
              ref={dueDateInputRef}
              className="dark:bg-[#09090c] bg-light-theme outline-none rounded-xl p-2 w-full"
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              onFocus={() => handleInputFocus(dueDateInputRef)}
              onBlur={() => handleInputBlur(dueDateInputRef)}
            />
            {invalidDate && (
              <span className="text-[#a5a5a5] text-xs">
                Purchase date can not be in the future
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-5">
          <button
            type="button"
            onClick={() => handleCancel()}
            className="p-2 dark:bg-black bg-white dark:text-[#686868] dark:hover:text-white dark:border dark:border-[#686868] dark:hover:border-white transition rounded-xl w-[100px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 dark:bg-black bg-white dark:text-[#686868] dark:hover:text-white dark:border dark:border-[#686868] dark:hover:border-white  transition rounded-xl w-[100px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioModal;

// {searchCoinResults.map((coin) => (
//   <button
//     key={coin.id}
//     className="py-2 flex gap-2"
//     onClick={() => handleCoinSelect(coin)}
//   >
//     <img
//       // src={coin.image.thumb}
//       alt={coin.name}
//       width={25}
//       height={25}
//     />
//     placeholder={loading ? "Loading..." : "Select coin..."}
//     {coin.name}
//   </button>
// ))}
// </div>
// )}
// {invalidCoin && (
// <span className="text-[#a5a5a5] text-xs">
// Need to choose coin
// </span>
// )}
// </div>
