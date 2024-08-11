"use client";

import { useRef, useState, ChangeEvent, useEffect } from "react";
import { SearchCoin } from "@/interfaces/searchCoin.interface";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import CloseIcon from "@/public/CloseIcon.svg";
import axios from "axios";
import convertDate from "@/utils/convertDate";
import { useAppSelector } from "@/redux/store";
import { addPortfolioData } from "@/redux/features/portfolioSlice";
import { uid } from "uid";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioModal = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const [searchCoins, setSearchCoins] = useState<SearchCoin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<SearchCoin | null>(null);
  const currencyInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [coinValue, setCoinValue] = useState<string>("");
  const [coinApiId, setCoinApiId] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [dueDate, setDueDate] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [invalidCoin, setInvalidCoin] = useState<boolean>(false);
  const [invalidAmount, setInvalidAmount] = useState<boolean>(false);
  const [invalidDate, setInvalidDate] = useState<boolean>(false);
  const { currency } = useAppSelector((state) => state.currencySlice);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const searchCoinData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${coinValue}&x_cg_demo_api_key=CG-duQsjCRoXZm1bJBTrL8sARut`
        );
        setSearchCoins(data.coins);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    searchCoinData();
  }, [coinValue]);

  const searchCoinResults = searchCoins.filter((coin: SearchCoin) =>
    coin.name.toLowerCase().startsWith(coinValue)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (coinValue.trim() === "") {
      setInvalidCoin(true);
      return;
    }

    if (amount === undefined || amount === 0) {
      setInvalidAmount(true);
      return;
    }

    if (dueDate === undefined || dueDate === "") {
      setInvalidAmount(true);
      return;
    }

    const portfolioCoin = {
      id: uid(),
      value: coinValue,
      coinApiId: coinApiId,
      purchaseAmount: amount,
      image: image,
      purchaseDate: convertDate(dueDate),
      hasProfit: false,
      currentPrice: { [currency]: 0 },
      market_data: {
        purchasePrice: { [currency]: 0 },
        market_cap: { [currency]: 0 },
        total_volume: { [currency]: 0 },
      },
    };

    dispatch(addPortfolioData(portfolioCoin));
    setCoinValue("");
    setAmount(0);
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
    setAmount(value === "" ? 0 : parseInt(value, 10));
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

  const handleCoinSelect = (coin: SearchCoin) => {
    setCoinApiId(coin.id);
    setCoinValue(coin.name);
    setImage(coin.large);
    setSelectedCoin(coin);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setCoinValue("");
    setSelectedCoin(null);
    setAmount(0);
    setDueDate("");
  };

  return (
    <div className="p-3 dark:bg-[#000000bd] bg-[#fafafa] absolute top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl max-w-full w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <div className="absolute right-0 p-3">
        <button onClick={() => handleCancel()}>
          <CloseIcon />
        </button>
      </div>
      <div className="p-3 flex items-center gap-4">
        {selectedCoin ? (
          <>
            <img
              src={selectedCoin.large}
              alt={selectedCoin.name}
              width={40}
              height={40}
            />
            <span className="text-xl">{selectedCoin.name}</span>
          </>
        ) : (
          "Select Coin"
        )}
      </div>
      <form onSubmit={handleSubmit} className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <label>Select currency</label>
          <div className="flex flex-col relative">
            <input
              ref={currencyInputRef}
              placeholder="Select coin..."
              value={coinValue}
              onChange={handleSearchChange}
              onFocus={() => handleInputFocus(currencyInputRef)}
              onBlur={() => handleInputBlur(currencyInputRef)}
              className="dark:bg-black bg-light-theme outline-none rounded-xl p-2 w-full"
            />
            {showDropdown && (
              <div className="col-span-2 h-[300px] w-full md:w-[320px] flex flex-col overflow-y-scroll dark:bg-black bg-white absolute z-10 rounded-2xl mt-12">
                {searchCoinResults.map((coin) => (
                  <button
                    key={coin.id}
                    className="p-2 flex gap-2 dark:hover:bg-gray-800 hover:bg-slate-100"
                    onClick={() => handleCoinSelect(coin)}
                  >
                    <img
                      src={coin.large}
                      alt={coin.name}
                      width={22}
                      height={22}
                    />
                    {coin.name}
                  </button>
                ))}
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
              className="dark:bg-black bg-light-theme outline-none rounded-xl p-2 w-full"
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
              className="dark:bg-black bg-light-theme outline-none rounded-xl p-2 w-full"
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
        <div className="flex justify-center gap-5 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 bg-white dark:bg-black dark:hover:text-white rounded-xl w-[100px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 bg-white dark:bg-black dark:hover:text-white rounded-xl w-[100px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioModal;
