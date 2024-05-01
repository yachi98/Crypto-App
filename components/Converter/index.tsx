"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import CoinRow from "../ConverterRow";
import SwitchIcon from "@/public/ConvertIcon.svg";
import ConverterChart from "../ConverterChart";

const Converter = () => {
  const { currency } = useAppSelector((state) => state.currencySlice);
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  const [toCoin, setToCoin] = useState<Coin | null>(null);
  const [fromCoin, setFromCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCoin, setAmountInFromCoin] = useState(true);
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    if (coinMarketData.length > 0) {
      const firstCoin: Coin = coinMarketData[0];
      const secondCoin: Coin = coinMarketData[1];
      const coinRate: number =
        firstCoin.current_price / secondCoin.current_price;
      setConversionRate(coinRate);
      setFromCoin(firstCoin);
      setToCoin(secondCoin);
    }
  }, []);

  useEffect(() => {
    if (fromCoin !== null && toCoin !== null) {
      const rate: number = fromCoin.current_price / toCoin.current_price;
      setConversionRate(rate);
    }
  }, [fromCoin, toCoin]);

  const handleAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    change: boolean
  ) => {
    const inputValue = parseFloat(e.target.value) || 0;
    setAmount(inputValue);
    setAmountInFromCoin(change);
  };

  const handleCoinSwitch = () => {
    setToCoin(fromCoin);
    setFromCoin(toCoin);
    setAmountInFromCoin(!amountInFromCoin);
  };

  let fromAmount, toAmount;

  if (amountInFromCoin) {
    fromAmount = amount;
    toAmount = amount * conversionRate;
  } else {
    toAmount = amount;
    fromAmount = amount / conversionRate;
  }

  return (
    <div>
      <div className="flex gap-5 mt-5 relative">
        <CoinRow
          currency={currency}
          data={coinMarketData}
          currentCoin={fromCoin}
          amount={fromAmount}
          handleCoinSelect={(coin: Coin) => setFromCoin(coin)}
          handleAmountChange={(e) => handleAmountChange(e, true)}
        />
        <button
          className="dark:bg-gray-800 bg-[#f5f5f5] dark:text-white text-black p-2 rounded-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
          onClick={handleCoinSwitch}
        >
          <SwitchIcon width={30} height={30} className="rotate-90" />
        </button>
        <CoinRow
          currency={currency}
          data={coinMarketData}
          currentCoin={toCoin}
          amount={toAmount}
          handleCoinSelect={(coin: Coin) => setToCoin(coin)}
          handleAmountChange={(e) => handleAmountChange(e, false)}
        />
      </div>
      {fromCoin !== null && toCoin !== null && (
        <ConverterChart fromCoin={fromCoin} toCoin={toCoin} />
      )}
    </div>
  );
};

export default Converter;
