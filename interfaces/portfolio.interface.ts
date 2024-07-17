export interface Portfolio {
  id: string;
  coinApiId: string;
  value: string;
  image: string;
  purchaseDate: string;
  purchaseAmount: number;
  hasProfit: boolean;
  currentPrice: { [currency: string]: number };
  market_data: {
    purchasePrice: { [currency: string]: number };
    market_cap: { [currency: string]: number };
    total_volume: { [currency: string]: number };
  };
}
