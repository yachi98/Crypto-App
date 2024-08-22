import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SelectedCoinState {
  selectedCoins: SelectedCoin[];
  coinId: string | null;
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
    }: {
      coinId: string;
      timeDay: string;
      currency: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${timeDay}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const { prices, total_volumes } = data;

      const timeFormattedPrices = formatChartData({ data: prices, index: 1 });
      const timeFormattedVolumes = formatChartData({
        data: total_volumes,
        index: 1,
      });

      const priceLabels = formatChartData({ data: prices, index: 0 });
      const volumeLabels = formatChartData({ data: total_volumes, index: 0 });
      const coinData: SelectedCoin = {
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
    localStorageSelectedCoins: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.selectedCoins = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSelectedCoinData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSelectedCoinData.fulfilled, (state, action) => {
        const coinIndex = state.selectedCoins.findIndex(
          (coin) => coin.id === action.payload.id
        );

        if (coinIndex === -1) {
          state.selectedCoins.push(action.payload);
        } else {
          state.selectedCoins[coinIndex] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(getSelectedCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});
export const { changeTime, removeCoin, localStorageSelectedCoins } =
  getSelectedCoinSlice.actions;
export default getSelectedCoinSlice.reducer;
