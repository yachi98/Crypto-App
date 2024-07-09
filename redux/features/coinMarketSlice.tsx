import { Coin } from "@/interfaces/coin.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CoinMarketData {
  coinMarketData: Coin[];
  currentPage: number;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: CoinMarketData = {
  coinMarketData: [],
  currentPage: 1,
  isLoading: true,
  hasError: false,
};

export const getCoinData = createAsyncThunk(
  "coinMarket/getCoinData",
  async (
    { currency, page }: { currency: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&market_data=true&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCoinsMarketData = createAsyncThunk(
  "coinMarket/getAllCoinsMarketData",
  async (
    { currency, page }: { currency: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&market_data=true&locale=en`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const coinMarketSlice = createSlice({
  name: "coinMarket",
  initialState,
  reducers: {
    clearCoinData(state) {
      state.coinMarketData = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.coinMarketData = [...state.coinMarketData, ...action.payload];
        state.currentPage += 1;
        state.isLoading = false;
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      })
      .addCase(getAllCoinsMarketData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getAllCoinsMarketData.fulfilled, (state, action) => {
        state.coinMarketData = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getAllCoinsMarketData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export const { clearCoinData } = coinMarketSlice.actions;
export default coinMarketSlice.reducer;
