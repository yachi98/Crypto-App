import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SelectedCoinState {
  selectedCoins: SelectedCoin[];
  currency: string;
  coinId: string | null;
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

// The state management is handled using Redux
// Toolkit. The currency state in SelectedCoinState
// is updated when the user selects a new currency.
// This triggers the getSelectedCoinData thunk to refetch data using the new currency.

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
      // console.log(timeFormattedVolumes); // this works
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
    removeCoins: (state) => {
      state.selectedCoins = [];
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
        const transformedCoins = state.selectedCoins.map((coin) => {
          if (coin.id === action.payload.id) {
            return action.payload;
          } else {
            return coin;
          }
        });
        const foundCoins = transformedCoins.find(
          (coin) => coin.id === action.payload.id
        );
        if (!foundCoins) {
          transformedCoins.push(action.payload);
        }
        state.selectedCoins = transformedCoins;
        state.isLoading = false;
      })
      .addCase(getSelectedCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});
export const { changeTime, removeCoin, removeCoins } =
  getSelectedCoinSlice.actions;
export default getSelectedCoinSlice.reducer;

// const coinDataPromises = coinId.map((coinId) =>
//   getSelectedCoinData(coinId)
// );
// const coinDataArray = await Promise.all(coinDataPromises);
// Promise.all([p1, p2, p3]).then((values) => {
//   console.log(values); // [3, 1337, "foo"]
// });

//     const results = await Promise.all(coinData);
//     return results;
