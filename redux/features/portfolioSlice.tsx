import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Portfolio } from "@/interfaces/portfolio.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import axios from "axios";

interface PortfolioState {
  portfolioData: Portfolio[];
  historicalData: HistoricalCoin[];
  hasError: boolean;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  portfolioData: [],
  historicalData: [],
  hasError: false,
  isLoading: false,
};

export const addPortfolioData = createAsyncThunk(
  "historicalData/addPortfolioData",
  async (coin: Portfolio, { rejectWithValue }) => {
    // console.log(coin);
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.date}`
      );

      // const newCoin = {
      //   id: coin.id,
      //   coinApiId: coin.coinApiId,
      //   value: coin.value,
      //   name: coin.name,
      //   large: coin.large,
      //   date: coin.date,
      //   amount: coin.amount,
      //   currentPrices: coin.market_data.current_price,
      // };

      const newCoin: Portfolio = {
        id: coin.id,
        coinApiId: coin.coinApiId,
        value: coin.value,
        name: coin.name,
        large: coin.large,
        date: coin.date,
        amount: coin.amount,
        market_data: {
          current_price: data.market_data.current_price || {},
          market_cap: data.market_data.market_cap || {},
          total_volume: data.market_data.total_volume || {},
        },
      };

      console.log(newCoin);

      return newCoin;
    } catch (error) {
      rejectWithValue(error);
      console.log("deleted");
    }
  }
);

//   try {

//     const portfolioData: Portfolio[] = state.portfolio.portfolioData;
//     console.log("1", coin);

//     const historicalData = portfolioData.map(async (coin) => {
//       const response = await axios.get(
//         `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.date}`
//       );
//       console.log("2", coin);
//       const data = await response.data;
//       return data;
//     });

//     const results = await Promise.all(historicalData);
//     return results;
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// }

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    removePortfolio(state, action) {
      state.portfolioData = state.portfolioData.filter(
        (coin) => coin.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPortfolioData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addPortfolioData.fulfilled, (state, action) => {
        console.log("action", action);
        state.portfolioData = [...state.portfolioData, action.payload];
        // state.historicalData = action.payload;
        state.isLoading = false;
      })
      .addCase(addPortfolioData.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { removePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
