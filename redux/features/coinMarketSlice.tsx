import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin } from "@/interfaces/coin.interface";

interface GetCoinMarketDataArgs {
  currency: string;
  page: number;
}

interface CoinMarketData {
  coinMarketData: Coin[];
  allMarketData: Coin[];
  currentPage: number;
  currency: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: CoinMarketData = {
  coinMarketData: [],
  allMarketData: [],
  currentPage: 1,
  currency: "usd",
  isLoading: true,
  hasError: false,
};

export const getCoinData = createAsyncThunk(
  "coinMarket/getCoinData",
  async ({ currency, page }: GetCoinMarketDataArgs, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCoinsMarketData = createAsyncThunk(
  "coinMarket/getAllCoinsMarketData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en"
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        const { currency } = action.meta.arg;
        state.currency = currency;
        state.coinMarketData = action.payload;
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
        state.allMarketData = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getAllCoinsMarketData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default coinMarketSlice.reducer;
