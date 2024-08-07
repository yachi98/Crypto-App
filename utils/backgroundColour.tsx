import { ScriptableContext } from "chart.js";

const backgroundColor = (
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
  gradientFill.addColorStop(1, "rgba(0, 122, 255, 0.1)");
  gradientFill.addColorStop(0.7, "rgba(0, 122, 255, 0.1)");
  gradientFill.addColorStop(1, "transparent");
  return gradientFill;
};

export default backgroundColor;
