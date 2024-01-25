interface LookupItem {
  value: number;
  symbol: string;
}

const lookup: LookupItem[] = [
  { value: 1, symbol: "" },
  { value: 1000, symbol: "K" },
  { value: 1000000, symbol: "M" },
  { value: 1000000000, symbol: "B" },
  { value: 1000000000000, symbol: "T" },
];

const noTrailingZeroRx = /\.0+$|(\.[0-9]*[1-9])0+$/;

const formatNumber = (num: number): string => {
  // return string
  if (num < 1) {
    return num.toFixed(3); // slice the dots
  }

  const item: LookupItem | undefined = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(2).replace(noTrailingZeroRx, "$1") +
        item.symbol
    : "0";
};

export default formatNumber;
