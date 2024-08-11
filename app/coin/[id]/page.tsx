"use client";

import { CoinPage } from "@/interfaces/coinPage";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import CaretIcon from "@/public/CaretIcon.svg";
import { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";
import formatNumber from "@/utils/formatNumber";
import PriceChange from "@/components/PriceChange";
import extractUrl from "@/utils/extractUrl";
import PriceCoinGraph from "@/components/PriceCoinGraph";

const CoinPage = ({ params }: { params: { id: string } }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coin, setCoin] = useState<CoinPage | null>(null);
  const { currency, symbol } = useAppSelector((state) => state.currencySlice);

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
    <div>
      <div className="dark:bg-[#0000008a] bg-white w-full h-auto lg:h-[400px] rounded-3xl mt-5 p-8 flex flex-col lg:flex-row justify-between relative overflow-hidden z-0">
        {isLoading ? (
          <div>Fetching data...</div>
        ) : (
          <>
            {!hasError && coin && (
              <>
                <div className="z-0 absolute w-full pointer-events-none h-[200px] lg:h-[390px] bottom-50 left-40">
                  <Image
                    src={coin.image.large}
                    alt={coin.name}
                    width={280}
                    height={280}
                    className="w-full h-full object-cover blur-3xl opacity-30"
                  />
                </div>
                <div className="w-full lg:w-2/5 pr-7">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4 z-0">
                      <Image
                        src={coin.image.large}
                        alt={coin.name}
                        width={50}
                        height={50}
                      />
                      <span className="text-lg md:text-xl lg:text-2xl">
                        {coin.name.charAt(0).toUpperCase() +
                          coin.name.slice(1).toLowerCase()}{" "}
                        ({coin.symbol.toUpperCase()})
                      </span>
                    </div>
                    <div className="flex items-center justify-between z-10">
                      <span className="text-2xl md:text-3xl lg:text-4xl mt-5 z-10">
                        {symbol}
                        {formatNumber(coin.market_data.current_price[currency])}
                      </span>
                      <PriceChange
                        price={coin.market_data.price_change_percentage_24h}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex mt-5 items-center justify-between z-10">
                      <h2 className="text-lg md:text-xl lg:text-2xl text-[#01F1E3] z-10">
                        High 24h
                      </h2>
                      <span className="text-xl md:text-2xl lg:text-3xl z-10">
                        {symbol}
                        {formatNumber(coin.market_data.high_24h[currency])}
                      </span>
                    </div>
                    <div>
                      <div className="flex gap-3 items-center mt-8 justify-between">
                        <div className="flex items-center gap-2 z-10">
                          <CaretIcon className="w-[20px] md:w-[30px]" />
                          <h3 className="text-lg md:text-xl lg:text-2xl">
                            All Time High:
                          </h3>
                        </div>
                        <div>
                          <span className="text-xl md:text-2xl lg:text-3xl">
                            {symbol}
                            {formatNumber(coin.market_data.ath[currency])}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="dark:text-[#dedede] z-10">
                      {formatDate(coin.market_data.ath_date[currency])}
                    </span>
                    <div className="">
                      <div className="flex gap-3 items-center mt-8 justify-between z-10">
                        <div className="flex items-center gap-2">
                          <CaretIcon className="w-[20px] md:w-[30px] fill-[#FE2264] rotate-180" />
                          <h3 className="text-lg md:text-xl lg:text-2xl z-10">
                            All Time Low:
                          </h3>
                        </div>
                        <div>
                          <span className="text-xl md:text-2xl lg:text-3xl z-10">
                            {symbol}
                            {formatNumber(coin.market_data.atl[currency])}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="dark:text-[#dedede] z-10">
                      {formatDate(coin.market_data.atl_date[currency])}
                    </span>
                  </div>
                </div>

                <div className="dark:text-white text-black text-sm md:text-base  w-full lg:w-3/5 text-left relative mt-3 lg:mt-0">
                  <h3 className="text-lg md:text-xl lg:text-2xl">
                    Description
                  </h3>
                  <div>
                    <p
                      className="mt-5 overflow-y-hidden max-h-[11rem] scrollbar-track-transparent scrollbar-h-24 hover:overflow-y-auto hover:scrollbar text-sm"
                      dangerouslySetInnerHTML={{
                        __html: coin.description.en,
                      }}
                    />
                  </div>

                  <div className="flex gap-3 mt-5 absolute bottom-0 hidden xl:flex">
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
      {coin && (
        <div className="w-full h-auto lg:h-[330px] rounded-2xl flex flex-col lg:flex-row gap-5 mt-5">
          <div className="w-full lg:w-1/2 dark:bg-[#000000bd] bg-white rounded-2xl p-7 flex flex-col">
            <h1 className="text-xl md:text-2xl">Market</h1>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-sm md:text-base lg:text-lg text-[#afafaf]">
                MARKET CAP
              </h1>
              <div className="p-2 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl text-[#afafaf]">
                  {symbol}
                  {formatNumber(coin.market_data.market_cap[currency])}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-sm md:text-base lg:text-lg text-[#afafaf]">
                FULLY DILUTED VALUATION
              </h1>
              <div className="p-2 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl text-[#afafaf]">
                  {symbol}
                  {formatNumber(
                    coin.market_data.fully_diluted_valuation[currency]
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-sm md:text-base lg:text-lg text-[#afafaf]">
                TOTAL VOLUME 24H
              </h1>
              <div className="p-2 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl text-[#afafaf]">
                  {symbol}
                  {formatNumber(coin.market_data.total_volume[currency])}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-sm md:text-base lg:text-lg text-[#afafaf]">
                CIRCULATING SUPPLY
              </h1>
              <div className="p-2 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl text-[#afafaf]">
                  {symbol}
                  {formatNumber(coin.market_data.circulating_supply)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-sm md:text-base lg:text-lg text-[#afafaf]">
                VOLUME / MARKET
              </h1>
              <div className="p-2 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl text-[#afafaf]">
                  {symbol}
                  {formatNumber(
                    coin.market_data.total_volume[currency] /
                      coin.market_data.market_cap[currency]
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[330px] dark:bg-black bg-white rounded-2xl p-7">
            <h1 className="text-lg md:text-xl lg:text-2xl">7D Sparkline</h1>
            <PriceCoinGraph
              prices={coin.market_data.sparkline_7d.price}
              priceChange={1}
              reduceBy={6}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinPage;
