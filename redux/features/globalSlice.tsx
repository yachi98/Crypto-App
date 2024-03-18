import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CoinInfo {
  [coin: string]: number;
}

interface GlobalData {
  globalData: {
    active_cryptocurrencies: number;
    markets: number;
    total_volume: CoinInfo;
    total_market_cap: CoinInfo;
    market_cap_percentage: CoinInfo;
    market_cap_change_percentage_24h_usd: number;
  };
  isLoading: boolean;
  hasError: boolean;
}

const initialState: GlobalData = {
  globalData: {
    active_cryptocurrencies: 0,
    markets: 0,
    total_volume: { usd: 0 },
    total_market_cap: { usd: 0 },
    market_cap_percentage: { btc: 0, eth: 0 },
    market_cap_change_percentage_24h_usd: 0,
  },
  isLoading: false,
  hasError: false,
};

export const getGlobalData = createAsyncThunk(
  "global/getGlobalData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {}, // Define different types of logic and update data
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getGlobalData.fulfilled, (state, action) => {
        state.globalData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getGlobalData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default globalSlice.reducer;

// The extraReducers field allows you to handle actions that are not part of the initial slice, such as asynchronous actions. Here, it's using a builder object to define how the state should be updated in response to specific actions.

// .addCase(getGlobalData.pending, (state) => { ... }): This case is triggered when the getGlobalData asynchronous action is pending. It sets the isLoading flag to true and resets the hasError flag to false.

// .addCase(getGlobalData.fulfilled, (state, action) => { ... }): This case is triggered when the getGlobalData asynchronous action is successfully fulfilled. It updates the globalData in the state with the data received from the API (action.payload.data) and sets isLoading to false.

// .addCase(getGlobalData.rejected, (state, action) => { ... }): This case is triggered when the getGlobalData asynchronous action is rejected (fails). It sets isLoading to false, sets hasError to true, and logs an error message to the console.
