import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import getNumArray from "@/utils/getGraphArray";
import getReducedArray from "@/utils/getGraphReducedArray";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const PriceCoinGraph = ({
  prices,
  priceChange,
  reduceBy,
}: {
  prices: number[];
  priceChange: number;

  reduceBy: number;
}) => {
  const dataSet: number[] = getReducedArray(prices, reduceBy);
  const borderColor: string =
    priceChange > 0 ? "rgba(0, 177, 167, 1)" : "rgba(254, 34, 100, 1)";

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

    if (priceChange > 0) {
      gradientFill.addColorStop(0, "rgba(0,245,228,.5)");
      gradientFill.addColorStop(0.7, "rgba(0,245,228,.1)");
    } else {
      gradientFill.addColorStop(0, "rgba(255,0,97,.5)");
      gradientFill.addColorStop(0.7, "rgba(255,0,97,.1)");
    }

    gradientFill.addColorStop(1, "transparent");
    return gradientFill;
  };

  const data = {
    labels: getNumArray(dataSet.length),
    datasets: [
      {
        data: dataSet,
        borderColor,
        backgroundColor: getBackgroundColor,
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const options = {
    fill: true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default PriceCoinGraph;
