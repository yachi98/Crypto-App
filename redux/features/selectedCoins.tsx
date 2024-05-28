import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SelectedCoinState {
  selectedCoins: SelectedCoin[];
  currency: string;
  coinId: string;
  timeDay: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: SelectedCoinState = {
  selectedCoins: [],
  currency: "gbp",
  coinId: "bitcoin",
  timeDay: "1",
  isLoading: true,
  hasError: false,
};

const formatChartData = ({
  data,
  index,
}: {
  data: [number, number][];
  index: number;
}): number[] => {
  return data.map((item) => item[index]);
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
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${timeDay}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      // console.log({ coinId, timeDay, currency });

      const { prices, total_volumes } = data;

      const timeFormattedPrices = formatChartData({ data: prices, index: 1 });
      const timeFormattedVolumes = formatChartData({
        data: total_volumes,
        index: 1,
      });

      const priceLabels = formatChartData({ data: prices, index: 0 });
      const volumeLabels = formatChartData({ data: total_volumes, index: 0 });

      const coinData: {
        id: string;
        prices: number[];
        total_volumes: number[];
        priceLabels: number[];
        volumeLabels: number[];
      } = {
        id: coinId,
        prices: timeFormattedPrices,
        total_volumes: timeFormattedVolumes,
        priceLabels: priceLabels,
        volumeLabels: volumeLabels,
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
    removeCoin: (state, action) => {
      const coinIdToRemove = action.payload;
      const newList = state.selectedCoins.filter(
        (item) => item.id !== coinIdToRemove
      );
      state.selectedCoins = newList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSelectedCoinData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSelectedCoinData.fulfilled, (state, action) => {
        state.selectedCoins = [...state.selectedCoins, action.payload];
        state.isLoading = false;
      })
      .addCase(getSelectedCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});
export const { changeTime, changeCoin, removeCoin } =
  getSelectedCoinSlice.actions;
export default getSelectedCoinSlice.reducer;
