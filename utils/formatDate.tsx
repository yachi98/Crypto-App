const formatDate = (coinDate: string): string =>
  new Date(coinDate).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default formatDate;
