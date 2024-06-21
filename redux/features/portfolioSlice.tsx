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
});

export const { addPortfolio, removePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
