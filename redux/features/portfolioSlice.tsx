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
  isLoading: false,
};

export const addPortfolioData = createAsyncThunk(
  "historicalData/addPortfolioData",
  async (coin: Portfolio, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.purchaseDate}`
      );

      const currentPrice = data.market_data.current_price.gbp;
      const purchaseAmountValue = coin.purchaseAmount * currentPrice;

      const portfolioEntry: Portfolio = {
        id: coin.id,
        coinApiId: coin.coinApiId,
        value: coin.value,
        image: coin.image,
        purchaseDate: coin.purchaseDate,
        purchaseAmount: purchaseAmountValue,
        market_data: {
          current_price: data.market_data.current_price || {},
          market_cap: data.market_data.market_cap || {},
          total_volume: data.market_data.total_volume || {},
        },
      };

      return portfolioEntry;
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
