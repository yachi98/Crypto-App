import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  ScriptableContext,
  Tooltip,
} from "chart.js";

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
