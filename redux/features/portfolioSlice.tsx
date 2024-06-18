import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Portfolio } from "@/interfaces/portfolio.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import axios from "axios";

interface PortfolioState {
  portfolioData: Portfolio[];
  historicalData: HistoricalCoin[];
  hasError: boolean;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  portfolioData: [],
  historicalData: [],
  hasError: false,
  isLoading: true,
};

export const getHistoricalData = createAsyncThunk(
  "historicalData/getHistoricalData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const portfolioData: Portfolio[] = state.portfolio.portfolioData;

      const historicalData = portfolioData.map(async (coin) => {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.date}`
        );
        const data = await response.data;
        return data;
      });
      console.log(historicalData);

      const results = await Promise.all(historicalData);
      return results;

      // Map the results to get the data
      // const resultsData = results.map((response) => response.data);
      // console.log(resultsData);
      // return resultsData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addPortfolio(state, action) {
      state.portfolioData = [...state.portfolioData, action.payload];
    },
    removePortfolio(state, action) {
      state.portfolioData = state.portfolioData.filter(
        (coin) => coin.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoricalData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getHistoricalData.fulfilled, (state, action) => {
        // state.portfolioData = [...state.portfolioData, action.payload];
        // state.portfolioData = state.portfolioData.map((coin, index) => ({
        //   ...coin,
        //   historicalData: action.payload[index],
        // }));
        state.isLoading = false;
      })
      .addCase(getHistoricalData.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { addPortfolio, removePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
