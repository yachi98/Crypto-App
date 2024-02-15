import { Coin } from "@/interfaces/coin.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/redux/store";
import formatTime from "@/utils/formatTime";

interface selectedCoinState {
  selectedCoins: Coin[];
  currency: string;
  coinId: string;
  timeStamp: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: selectedCoinState = {
  selectedCoins: [],
  timeStamp: "1",
  isLoading: true,
  hasError: false,
};

export const getCoinData = createAsyncThunk(
  "coinData/getCoinData",
  async (
    { currency, timeStamp, coinId }: selectedCoinState,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${timeStamp}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const { prices, total_volumes } = data;

      const timeFormattedPrices = prices.map((item: string) => [
        formatTime(item[0], timeStamp),
        item[1],
      ]);
      const timeFormattedVolumes = total_volumes.map((item: string) => [
        formatTime(item[0], timeStamp),
        item[1],
      ]);

      const item: CoinData = {
        id: coinId,
        prices: timeFormattedPrices,
        total_volumes: timeFormattedVolumes,
      };
      return item;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const selectedCoinsSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {
    updateTimeStamp: (state, action) => {
      state.timeStamp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.selectedCoins = [...state.selectedCoins, action.payload];
        state.isLoading = true;
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default selectedCoinsSlice.reducer;
