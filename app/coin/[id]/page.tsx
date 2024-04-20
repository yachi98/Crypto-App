"use client";

import { CoinPage } from "@/interfaces/coinPage";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import CaretIcon from "@/public/CaretIcon.svg";
import { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";

const CoinPage = ({ params }: { params: { id: string } }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coin, setCoin] = useState<CoinPage | null>(null);
  const { currency } = useAppSelector((state) => state.currencySlice);
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
      <div className="dark:bg-[#0B101A] bg-white w-full h-[400px] rounded-3xl mt-5 p-8 flex justify-between">
        {isLoading ? (
          <div>Fetching data...</div>
        ) : (
          <>
            {coin && (
              <>
                <div>
                  <div className="flex items-center gap-6">
                    <Image
                      src={coin.image.large}
                      alt={coin.name}
                      width={50}
                      height={50}
                    />
                    <span className="text-xl">
                      {coin.name.charAt(0).toUpperCase() +
                        coin.name.slice(1).toLowerCase()}{" "}
                      ({coin.symbol.toUpperCase()})
                    </span>
                    {/* {coin.links.homepage.map((website: string) => (
                        <li key={website}> */}
                    <a href={coin.links.homepage[0]} target="_blank">
                      {coin.links.homepage[0]}
                    </a>
                    {/* </li>
                      ))} */}
                  </div>
                  <span className="text-3xl mt-7">
                    {coin.market_data.current_price[currency]}
                  </span>
                  <div className="flex flex-col gap-6 mt-11">
                    <div className="flex items-center gap-5 mt-5">
                      <CaretIcon className="w-[30px] h-[20px]" />
                      <h3 className="text-xl">All Time High</h3>
                    </div>

                    <span>
                      {formatDate(coin.market_data.ath_date[currency])}
                    </span>
                    <div className="flex items-center gap-5 mt-5">
                      <CaretIcon className="w-[30px] h-[20px] fill-[#FE2264] rotate-180" />
                      <h3 className="text-xl">All Time Low</h3>
                    </div>
                    <span>
                      {formatDate(coin.market_data.atl_date[currency])}
                    </span>
                  </div>
                </div>
                <div className="dark:text-white text-black text-sm w-2/5 text-left overflow-ellipsis overflow-hidden max-h-[15rem] hover:scrollbar  scrollbar-track-transparent scrollbar-h-24 overflow-y-hidden  hover:overflow-y-auto pl-7">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${coin.description.en}`,
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoinPage;
