"use client";

import { Coin } from "@/interfaces/coin.interface";
import { labelFormatter } from "@/redux/features/dateFormatter";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ScriptableContext } from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";

const ConverterChart = ({
  fromCoin,
  toCoin,
}: {
  fromCoin: Coin;
  toCoin: Coin;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeCoinId, timeDay } = useAppSelector(
    (state) => state.selectedCoinData
  );
  const { currency } = useAppSelector((state) => state.currencySlice);

  useEffect(() => {
    if (!activeCoinId) return;
    dispatch(
      getSelectedCoinData({
        coinId: activeCoinId,
        timeDay,
        currency,
      })
    );
  }, [activeCoinId, currency]);

  const fromCoinPrices: number[] = fromCoin.sparkline_in_7d.price;
  const toCoinPrices: number[] = toCoin.sparkline_in_7d.price;

  const dataSet: number[] = fromCoinPrices.map(
    (fromPrice, index) => fromPrice / toCoinPrices[index]
  );

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

    gradientFill.addColorStop(0, "rgba(116, 116, 250, 0.5)");
    gradientFill.addColorStop(0.7, "rgba(116, 116, 250, 0.1)");
    gradientFill.addColorStop(1, "transparent");

    return gradientFill;
  };

  const data = {
    labels: labelFormatter(fromCoinPrices, timeDay),
    datasets: [
      {
        data: dataSet,
        borderColor: "rgba(159, 122, 234)",
        backgroundColor: getBackgroundColor,
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
    ],
  };

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
            return value;
          },
          labelColor: function () {
            return {
              borderRadius: 2,
              backgroundColor: "rgba(159, 122, 234)",
            };
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: "grey",
          maxTicksLimit: 10,
          align: "inner",
        },
        border: {
          display: true,
        },
        stacked: true,
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

  return (
    <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white h-[370px] w-full mt-5 rounded-2xl">
      <div className="w-full h-full p-10">
        <div className="flex justify-between">
          <h3 className="text-xl mb-2">
            {fromCoin.name}{" "}
            <span className="uppercase">({fromCoin.symbol})</span>
            <span className="dark:text-white text-black mx-3">to</span>
            {toCoin.name} <span className="uppercase">({toCoin.symbol})</span>
          </h3>
          <h3>7 day Sparkline</h3>
        </div>
        <Line options={options as any} data={data} />
      </div>
    </div>
  );
};

export default ConverterChart;
