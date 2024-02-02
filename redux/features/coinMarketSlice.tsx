import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin } from "@/interfaces/coin.interface";

interface CoinMarketInfo {
  [coin: string]: number;
}

interface CoinMarketData {
  coinMarketData: Coin[];
  allCoinsList: Coin[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: CoinMarketData = {
  coinMarketData: [],
  allCoinsList: [],
  isLoading: true,
  hasError: false,
};

export const getCoinData = createAsyncThunk(
  "coinMarket/getCoinData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCoinsData = createAsyncThunk(
  "coinMarket/getAllCoinsData",
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

//api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}_${orderDir}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d

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
        state.coinMarketData = action.payload;
        state.isLoading = false;
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      })
      .addCase(getAllCoinsData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getAllCoinsData.fulfilled, (state, action) => {
        state.hasError = false;
        console.log("daniel", action.payload);
        state.allCoinsList = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getAllCoinsData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default coinMarketSlice.reducer;
