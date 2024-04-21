"use client";

import { CoinPage } from "@/interfaces/coinPage";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import CaretIcon from "@/public/CaretIcon.svg";
import { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";
import formatNumber from "@/utils/formatNumber";
import extractUrl from "@/utils/extractUrl";

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
      <div className="dark:bg-[#0b111b] bg-white w-full h-[390px] rounded-3xl mt-5 p-8 flex justify-between">
        {isLoading ? (
          <div>Fetching data...</div>
        ) : (
          <>
            {coin && (
              <>
                <div className="w-2/5 pr-7">
                  <div className="flex flex-col gap-1">
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
                    </div>
                    <span className="text-3xl mt-7">
                      {symbol}
                      {formatNumber(coin.market_data.current_price[currency])}
                    </span>
                  </div>
                  <div>
                    <div className="flex mt-5 items-center justify-between">
                      <h2 className="text-[#01F1E3]">High 24h</h2>
                      <span className="text-xl">
                        {symbol}
                        {formatNumber(coin.market_data.high_24h[currency])}
                      </span>
                    </div>
                    <div>
                      <div className="flex gap-3 items-center mt-6 justify-between">
                        <div className="flex items-center gap-2">
                          <CaretIcon className="w-[30px]" />
                          <h3 className="text-xl">All Time High:</h3>
                        </div>
                        <div>
                          <span className="text-2xl">
                            {symbol}
                            {formatNumber(coin.market_data.ath[currency])}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="dark:text-[#dedede]">
                      {formatDate(coin.market_data.ath_date[currency])}
                    </span>
                    <div className="">
                      <div className="flex gap-3 items-center mt-6 justify-between">
                        <div className="flex items-center gap-2">
                          <CaretIcon className="w-[30px] fill-[#FE2264] rotate-180" />
                          <h3 className="text-xl">All Time Low:</h3>
                        </div>
                        <div>
                          <span className="text-2xl">
                            {symbol}
                            {formatNumber(coin.market_data.atl[currency])}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="dark:text-[#dedede]">
                      {formatDate(coin.market_data.atl_date[currency])}
                    </span>
                  </div>
                </div>
                <div className="dark:text-white text-black text-sm w-3/5 text-left relative mt-3">
                  <h3 className="text-xl">Description</h3>
                  <div>
                    <p
                      className="mt-5 overflow-y-hidden max-h-[11rem] scrollbar-track-transparent scrollbar-h-24 hover:overflow-y-auto  hover:scrollbar "
                      dangerouslySetInnerHTML={{
                        __html: coin.description.en,
                      }}
                    />
                  </div>

                  <div className="flex gap-3 mt-5 absolute bottom-0">
                    <button className="p-3 dark:bg-gray-900 bg-[#efefef] rounded-2xl">
                      <a href={coin.links.homepage[0]} target="_blank">
                        {extractUrl(coin.links.homepage[0])}
                      </a>
                    </button>
                    <button className="p-3 dark:bg-gray-900 bg-[#efefef] rounded-2xl">
                      <a href={coin.links.blockchain_site[0]} target="_blank">
                        {extractUrl(coin.links.blockchain_site[0])}
                      </a>
                    </button>
                    <button className="p-3 dark:bg-gray-900 bg-[#efefef] rounded-2xl">
                      <a
                        href={coin.links.official_forum_url[0]}
                        target="_blank"
                      >
                        {extractUrl(coin.links.official_forum_url[0])}
                      </a>
                    </button>
                  </div>
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
