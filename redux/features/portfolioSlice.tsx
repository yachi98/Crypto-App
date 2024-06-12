import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  isLoading: true,
};

export const getHistoricalData = createAsyncThunk(
  "historicalData/getHistoricalData",
  async (coinId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2023`
      );
      console.log(data);
      return data;
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
        state.portfolioData = [...state.portfolioData, action.payload];
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
