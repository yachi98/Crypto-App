import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SelectedCoinState {
  selectedCoins: SelectedCoin[];
  coinId: string;
  timeDay: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: SelectedCoinState = {
  selectedCoins: [],
  coinId: "bitcoin",
  timeDay: "1",
  isLoading: true,
  hasError: false,
};

const formatChartData = (data: [number, number][]): number[] => {
  return data.map((item) => item[1]);
};

export const getSelectedCoinData = createAsyncThunk(
  "selectedCoinData/getSelectedCoinData",
  async (
    {
      coinId,
      timeDay,
      currency,
    }: { coinId: string; timeDay: string; currency: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${timeDay}&precision=full&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const { prices, total_volumes } = data;

      const timeFormattedPrices = formatChartData(prices);
      const timeFormattedVolumes = formatChartData(total_volumes);

      const coinData: {
        id: string;
        prices: number[];
        total_volumes: number[];
      } = {
        id: coinId,
        prices: timeFormattedPrices,
        total_volumes: timeFormattedVolumes,
      };
      return coinData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getSelectedCoinSlice = createSlice({
  name: "getSelectedCoinData",
  initialState,
  reducers: {
    changeTime: (state, action) => {
      state.timeDay = action.payload;
    },
    changeCoin: (state, action) => {
      const newCoinId = action.payload;
      state.coinId = newCoinId;
    },
  },
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
export const { changeTime, changeCoin } = getSelectedCoinSlice.actions;
export default getSelectedCoinSlice.reducer;
