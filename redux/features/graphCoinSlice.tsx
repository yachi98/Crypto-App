import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin } from "@/interfaces/coin.interface";

// interface GraphMarketInfo {
//   [coin: string]: number;
// }

interface GraphMarketData {
  selectedCoins: Coin[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: GraphMarketData = {
  selectedCoins: [],
  isLoading: true,
  hasError: false,
};

export const getGraphData = createAsyncThunk(
  "graphMarketData/getGraphData",
  async (coinId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=23&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// https://api.coingecko.com/api/v3/coins/id/market_chart?vs_currency=usd&days=23&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}

const graphMarketSlice = createSlice({
  name: "graphMarketData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGraphData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getGraphData.fulfilled, (state, action) => {
        state.selectedCoins = action.payload;
        state.selectedCoins = [...state.selectedCoins, action.payload];
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(getGraphData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default graphMarketSlice.reducer;
