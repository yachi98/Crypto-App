export const labelFormatter = (labels: number[], days: string) => {
  return labels.map((num) => {
    const time = new Date(num);
    switch (days) {
      case "1":
        const hours = time.getHours();
        const minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
        return hours + ":" + minutes;
      case "7":
      case "14":
      case "30":
      case "180":
      case "365":
        return time.toLocaleString("en-US", { month: "short", day: "numeric" });
      case "1826":
        return time.toLocaleString("en-us", {
          month: "short",
          year: "numeric",
        });
      default:
        return time;
    }
  });
};
