import { Coin } from "@/interfaces/coin.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import formatTime from "@/utils/formatTime";

interface SelectedCoinData {
  selectedCoins: Coin[];
  timeDay: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: SelectedCoinData = {
  selectedCoins: [],
  timeDay: "1",
  isLoading: true,
  hasError: false,
};

export const getSelectedCoinData = createAsyncThunk(
  "selectedCoinData/getSelectedCoinData",
  async (
    { coinId, timeDay }: { coinId: string; timeDay: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeDay}&precision=full&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const { prices, total_volumes } = data;

      const timeFormattedPrices = prices.map((item: [number, number]) => [
        formatTime(item[0].toString(), timeDay),
        item[1],
      ]);

      const timeFormattedVolumes = total_volumes.map(
        (item: [number, number]) => [
          formatTime(item[0].toString(), timeDay),
          item[1],
        ]
      );

      console.log("data", data);

      const coinData: Coin = {
        id: coinId,
        prices: timeFormattedPrices,
        total_volumes: timeFormattedVolumes,
      } as Coin;
      return coinData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getSelectedCoinSlice = createSlice({
  name: "getSelectedCoinData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSelectedCoinData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSelectedCoinData.fulfilled, (state, action) => {
        state.selectedCoins = [action.payload];
        state.isLoading = false;
      })
      .addCase(getSelectedCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default getSelectedCoinSlice.reducer;
