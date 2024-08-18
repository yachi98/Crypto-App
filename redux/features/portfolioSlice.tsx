import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Portfolio } from "@/interfaces/portfolio.interface";
import axios from "axios";

interface PortfolioState {
  portfolioData: Portfolio[];
  hasError: boolean;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  portfolioData: [],
  hasError: false,
  isLoading: false,
};

let portfolio: Portfolio[] = [];

export const addPortfolioData = createAsyncThunk(
  "historicalData/addPortfolioData",
  async (coin: Portfolio, { rejectWithValue, getState }) => {
    try {
      const { data: historicalData } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.purchaseDate}`
      );

      const { data: currentData } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}`
      );

      const state = getState() as RootState;
      const { currency } = state.currencySlice;

      const currentPrice = currentData.market_data.current_price[currency];
      const purchasePrice = historicalData.market_data.current_price[currency];

      // Create a new portfolio entry with historical purchase data
      const portfolioEntry: Portfolio = {
        id: coin.id,
        coinApiId: coin.coinApiId,
        value: coin.value,
        image: coin.image,
        purchaseDate: coin.purchaseDate,
        purchaseAmount: coin.purchaseAmount,
        hasProfit: false,
        currentPrice: { [currency]: currentPrice },
        market_data: {
          purchasePrice: { [currency]: purchasePrice },
          market_cap: historicalData.market_data.market_cap || {},
          total_volume: historicalData.market_data.total_volume || {},
        },
      };

      portfolio.push(portfolioEntry);

      // Get unique coin IDs from the portfolio
      const uniqueIds = [
        ...new Set(portfolio.map((portfolioId) => portfolioId.coinApiId)),
      ];

      const currentPrices = await Promise.all(
        uniqueIds.map(async (uniqueId) => {
          const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${uniqueId}`
          );
          return {
            value: uniqueId,
            currentPrice: data.market_data.current_price[currency],
          };
        })
      );

      // Update the portfolio with profit calculations and the new current prices
      portfolio = portfolio.map((portfolioItem) => {
        const currentCoinData = currentPrices.find(
          (priceData) => priceData.value === portfolioItem.coinApiId
        );
        const currentPrice = currentCoinData ? currentCoinData.currentPrice : 0;

        return {
          ...portfolioItem,
          hasProfit:
            portfolioItem.market_data.purchasePrice[currency] < currentPrice,
          currentPrice: { [currency]: currentPrice },
        };
      });

      // Update the current entry in the portfolio
      const updatedEntry = portfolio.find((entry) => entry.id === coin.id);
      return updatedEntry ? { ...updatedEntry } : portfolioEntry;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    removePortfolio(state, action) {
      state.portfolioData = state.portfolioData.filter(
        (coin) => coin.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPortfolioData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addPortfolioData.fulfilled, (state, action) => {
        state.portfolioData = [...state.portfolioData, action.payload];
        state.isLoading = false;
      })
      .addCase(addPortfolioData.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { removePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
