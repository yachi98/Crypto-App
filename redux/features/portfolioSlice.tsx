import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Portfolio } from "@/interfaces/portfolio.interface";

interface PortfolioState {
  portfolioData: Portfolio[];
  coinId: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: PortfolioState = {
  portfolioData: [],
  coinId: "bitcoin",
  isLoading: true,
  hasError: false,
};

export const getPortfolioData = createAsyncThunk(
  "portfolioData/getPortfolioData",
  async (coinId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=30-12-2023&localization=false`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolioData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPortfolioData.fulfilled, (state, action) => {
        state.portfolioData = [...state.portfolioData, action.payload];
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(getPortfolioData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default portfolioSlice.reducer;
