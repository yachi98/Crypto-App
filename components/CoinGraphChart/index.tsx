"use client";

import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TimeSelectorBar from "../TimeSelector";
import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { labelFormatter } from "@/redux/features/dateFormatter";
import formatDateGraph from "@/utils/formatDateGraph";
import backgroundColor from "@/utils/backgroundColour";
import formatNumber from "@/utils/formatNumber";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip
);

const options = {
  responsive: true,
  tooltip: { enabled: true },
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem: any) {
          let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
          value =
            value < 10
              ? value.toPrecision(7)
              : value.toFixed(2).toLocaleString();
          const coinName = tooltipItem.dataset.label;
          return `${
            coinName.charAt(0).toUpperCase() + coinName.slice(1).toLowerCase()
          }: ${formatNumber(value)}`;
        },
        labelColor: function (tooltipItem: any) {
          const colors = [
            "rgba(0, 122, 255, 1)",
            "rgba(88, 77, 255, 1)",
            "rgba(239, 101, 255, 1)",
          ];
          return {
            borderRadius: 2,
            backgroundColor:
              colors[tooltipItem.datasetIndex] || "rgba(0, 122, 255, 1)",
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        display: true,
        color: "grey",
        maxTicksLimit: 10,
        font: {
          size: 10,
        },
        align: "inner",
      },
      border: { display: true },
      stacked: true,
    },
    y: {
      type: "logarithmic",
      display: false,
      beginAtZero: true,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  pointRadius: 0,
  borderWidth: 0,
};

const CoinLineGraph = ({
  coins,
  days,
}: {
  coins: SelectedCoin[];
  days: string;
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const data = {
    labels: labelFormatter(coins[0].priceLabels, days),
    datasets: coins.map((coin, index) => ({
      data: coin.prices,
      label: coin.id,
      borderColor: options.plugins.tooltip.callbacks.labelColor({
        datasetIndex: index,
      }).backgroundColor,
      backgroundColor: backgroundColor,
      borderWidth: 1,
      pointRadius: 0,
      fill: true,
      tension: 0.8,
    })),
  };

  useEffect(() => {
    setTimeout(() => {
      setShouldRender(true);
    }, 1000);
  }, []);

  return (
    <div className="h-full w-full">
      {shouldRender && <Line options={options as any} data={data} />}
    </div>
  );
};

const CoinBarGraph = ({
  coins,
  days,
}: {
  coins: SelectedCoin[];
  days: string;
}) => {
  const data = {
    labels: labelFormatter(coins[0].volumeLabels, days),
    datasets: coins.map((coin, index) => ({
      data: coin.total_volumes,
      label: coin.id,
      borderColor: options.plugins.tooltip.callbacks.labelColor({
        datasetIndex: index,
      }).backgroundColor,
      backgroundColor: options.plugins.tooltip.callbacks.labelColor({
        datasetIndex: index,
      }).backgroundColor,
      borderWidth: 8,
      pointRadius: 0,
      fill: true,
      tension: 0.8,
    })),
  };

  return <Bar options={options as any} data={data as any} />;
};

const CoinGraphChart = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coinId, selectedCoins, timeDay } = useAppSelector(
    (state) => state.selectedCoinData
  );
  const { currency, symbol } = useAppSelector((state) => state.currencySlice);
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const selectedCoinsInfo: Coin[] = selectedCoins.reduce(
    (acc: Coin[], curr: SelectedCoin) => {
      const coinInfo = coinMarketData.find((coin: Coin) => coin.id === curr.id);
      return coinInfo ? [...acc, coinInfo] : acc;
    },
    []
  );

  const coinBG: string[] = ["bg-[#007aff]", "bg-[#584dff]", "bg-[#EF65FF]"];

  useEffect(() => {
    if (!coinId) return;
    dispatch(
      getSelectedCoinData({
        coinId,
        timeDay,
        currency,
      })
    );
  }, [coinId, timeDay, currency]);

  function renderInfo(name: string) {
    return (
      <span>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</span>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-2">
      <div className="dark:bg-black bg-white rounded-2xl md:w-[calc(50%-0.8rem)] lg:w-[calc(50%-0.8rem)] w-[calc(100%-1rem)] h-[340px] m-2 flex flex-col p-4 relative">
        {selectedCoinsInfo.length > 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              {selectedCoinsInfo.map((selectedCoin, index) => (
                <div key={selectedCoin.id} className="flex gap-2 items-center">
                  <span
                    className={`${coinBG[index]} w-[12px] h-[12px] items-center justify-center rounded hidden sm:flex`}
                  ></span>
                  <span className="text-xs dark:text-[#bdbdbd]">
                    {selectedCoin.symbol.toUpperCase()}
                  </span>
                  <span className="text-xs">
                    {symbol}
                    {formatNumber(selectedCoin.current_price)}
                  </span>
                </div>
              ))}
              <span className="dark:text-[#DEDEDE] text-sm text-black absolute right-4 hidden sm:block">
                {formatDateGraph}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-black">
              <span className="flex gap-1 items-center text-xl dark:text-[#bdbdbd]">
                {renderInfo(selectedCoinsInfo[0].name)} (
                {selectedCoinsInfo[0].symbol.toUpperCase()})
              </span>
              <span className="text-3xl dark:text-[#DEDEDE]">
                {symbol}
                {formatNumber(selectedCoinsInfo[0].current_price)}
              </span>
            </div>
          </div>
        )}
        {selectedCoinsInfo[0] && (
          <div className="w-[100%] h-[100%]">
            <CoinLineGraph days={timeDay} coins={selectedCoins} />
          </div>
        )}
      </div>

      <div className="dark:bg-black bg-white rounded-2xl md:w-[calc(50%-0.8rem)] lg:w-[calc(50%-0.8rem)] w-[calc(100%-1rem)] h-[340px] m-2 flex flex-col p-4">
        {selectedCoins[0] && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <span className="dark:text-[#DEDEDE] text-black flex text-base">
                Volume 24h
              </span>
              <TimeSelectorBar />
            </div>
            <div className="flex flex-col gap-1 text-black">
              <span className="flex gap-1 items-center text-xl dark:text-[#bdbdbd]">
                {renderInfo(selectedCoins[0].id)}
              </span>
              <span className="text-3xl dark:text-[#DEDEDE]">
                {symbol}
                {formatNumber(
                  selectedCoins[0].total_volumes[
                    selectedCoins[0].total_volumes.length - 1
                  ]
                )}
              </span>
            </div>
          </div>
        )}
        {selectedCoinsInfo[0] && (
          <div className="w-[100%] h-[100%]">
            <CoinBarGraph days={timeDay} coins={selectedCoins} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinGraphChart;
