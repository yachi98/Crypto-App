"use client";

import { CoinPage } from "@/interfaces/coinPage";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const CoinPage = ({ params }: { params: { id: string } }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coin, setCoin] = useState<CoinPage | null>(null);

  // const { coinId } = useAppSelector((state) => state.selectedCoinData);
  const dispatch: AppDispatch = useDispatch();
  const { symbol } = useAppSelector((state) => state.currencySlice);

  const getCoinData = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
      );
      console.log(data);
      setCoin(data);
      setIsLoading(false);
    } catch (err) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (coin === null || coin.id !== params.id) {
      getCoinData();
    }
  }, [params.id]);

  return (
    <div className="dark:bg-gray-950 bg-light-theme max-w-screen-2xl m-auto h-screen p-2">
      <div className="dark:bg-[#0B101A] bg-white w-full h-[450px] rounded-3xl mt-5 p-7">
        {coin && (
          <div className="w-full">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={50}
              height={50}
            />
            <span className="flex">
              {coin.name.charAt(0).toUpperCase() +
                coin.name.slice(1).toLowerCase()}{" "}
              ({coin.symbol.toUpperCase()})
            </span>
            <div
              className="text-sm w-1/2"
              dangerouslySetInnerHTML={{ __html: `${coin.description.en}` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinPage;
