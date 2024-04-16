"use client";

import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TimeSelectorBar from "../TimeSelector";
import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { labelFormatter } from "@/redux/features/dateFormatter";
import formatNumber from "@/utils/formatNumber";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement
);

// const [hoverPrice, setHoverPrice] = useState(0);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  // plugins: {
  //   tooltip: {
  //     enabled: true,
  //     mode: "index",
  //     intersect: false,
  //     callbacks: {
  //       label: function (tooltipItem: any) {
  //         let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
  //         value =
  //           value < 10
  //             ? value.toPrecision(7)
  //             : value.toFixed(2).toLocaleString();

  //           setHoverPrice(tooltipItem.dataset.data[tooltipItem.dataIndex]);
  //         return value;
  //       },
  //     },
  //   },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color: "grey",
        maxTicksLimit: 10,
      },
      border: {
        display: true,
      },
      // stacked: true,
    },
    y: {
      display: false,
    },
    "y-axis-1": {
      display: false,
      beginAtZero: false,
    },
    "y-axis-2": {
      display: false,
      beginAtZero: false,
    },
    "y-axis-3": {
      display: false,
      beginAtZero: false,
    },
  },
  pointRadius: 0,
  borderWidth: 0,
};

const getBackgroundColor = (
  context: ScriptableContext<"line">
): CanvasGradient => {
  const ctx: CanvasRenderingContext2D = context.chart.ctx;
  const height: number = ctx.canvas.clientHeight;
  const gradientFill: CanvasGradient = ctx.createLinearGradient(
    0,
    0,
    0,
    height
  );
  gradientFill.addColorStop(1, "rgba(159, 122, 234, 0.1)");
  gradientFill.addColorStop(0.7, "rgba(159, 122, 234, 0.1)");
  gradientFill.addColorStop(1, "transparent");
  return gradientFill;
};

const CoinLineGraph = ({
  coin,
  days,
}: {
  coin: SelectedCoin;
  days: string;
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const data = {
    labels: labelFormatter(coin.priceLabels, days),
    datasets: [
      {
        data: coin.prices,
        borderColor: "rgba(159, 122, 234)",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
        backgroundColor: getBackgroundColor,
      },
    ],
  };
  useEffect(() => {
    setTimeout(() => {
      setShouldRender(true);
    }, 1000);
  }, []);

  return (
    <div className="h-full w-full">
      {shouldRender && <Line options={options} data={data} />}
    </div>
  );
};

const CoinBarGraph = ({ coin, days }: { coin: SelectedCoin; days: string }) => {
  const data = {
    labels: labelFormatter(coin.volumeLabels, days),
    datasets: [
      {
        data: coin.total_volumes,
        borderColor: "rgba(159, 122, 234, 0.9)",
        borderWidth: 1,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
        backgroundColor: getBackgroundColor,
      },
    ],
  };

  return <Bar options={options} data={data as any} />;
};

const CoinGraphChart = () => {
  const { selectedCoins } = useAppSelector((state) => state.selectedCoinData);
  const { symbol } = useAppSelector((state) => state.currencySlice);
  const dispatch: AppDispatch = useDispatch();
  const { coinId, timeDay } = useAppSelector((state) => state.selectedCoinData);
  const { currency } = useAppSelector((state) => state.currencySlice);

  const selectedCoin = selectedCoins.length > 0 ? selectedCoins[0] : null;
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const coinInfo = coinMarketData.find(
    (data) => selectedCoin && data.id === selectedCoin.id
  );

  const todayDate: string = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    dispatch(
      getSelectedCoinData({
        coinId: coinId,
        timeDay: timeDay,
        currency: currency,
      })
    );
  }, [coinId, timeDay, currency]);

  return (
    <div className="flex mt-2">
      <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-2xl w-1/2 h-[450px] m-2 flex flex-col p-6">
        {coinInfo && (
          <div className="flex flex-col gap-8">
            <span className="dark:text-[#DEDEDE] flex text-base">
              {coinInfo.name.charAt(0).toUpperCase() +
                coinInfo.name.slice(1).toLowerCase()}{" "}
              ({coinInfo.symbol.toUpperCase()})
            </span>
            <span className="dark:text-[#DEDEDE] text-black text-3xl">
              {symbol}
              {formatNumber(coinInfo.current_price)}
            </span>
            <span className="dark:text-[#DEDEDE] text-black text-base">
              {todayDate}
            </span>
          </div>
        )}
        {selectedCoin && (
          <div className="w-[100%] h-[100%]">
            <CoinLineGraph days={timeDay} coin={selectedCoin} />
          </div>
        )}
      </div>
      <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-2xl w-1/2 h-[450px] m-2 flex flex-col p-6">
        {selectedCoin && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <span className="dark:text-[#DEDEDE] text-black flex text-base">
                Volume 24h
              </span>
              <TimeSelectorBar />
            </div>
            <span className="dark:text-[#DEDEDE] text-black text-3xl">
              {symbol}
              {formatNumber(
                selectedCoin.total_volumes[
                  selectedCoin.total_volumes.length - 1
                ]
              )}
            </span>
            <span className="dark:text-[#DEDEDE] text-black text-base">
              {todayDate}
            </span>
          </div>
        )}
        {selectedCoin && (
          <div className="w-[100%] h-[100%]">
            <CoinBarGraph days={timeDay} coin={selectedCoin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinGraphChart;
