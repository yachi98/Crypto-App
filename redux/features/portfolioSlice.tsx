import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Portfolio } from "@/interfaces/portfolio.interface";

interface PortfolioState {
  portfolioData: Portfolio[];
  hasError: boolean;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  portfolioData: [],
  hasError: false,
  isLoading: true,
};

// export const getHistoricalData = createAsyncThunk(
//   "historicalData/getHistoricalData",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state: any = getState();
//       const portfolioData: Portfolio[] = state.portfolio.portfolioData;

//       // Fetch historical data for each coin
//       const results = await Promise.all(
//         portfolioData.map((coin) =>
//           axios.get(
//             `https://api.coingecko.com/api/v3/coins/${coin.id}/history?date=${coin.date}`
//           )
//         )
//       );

//       // Map the results to get the data
//       const historicalData = results.map((response) => response.data);
//       return historicalData;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addPortfolio(state, action) {
      state.portfolioData = [...state.portfolioData, action.payload];
    },
    removePortfolio(state, action) {
      state.portfolioData = state.portfolioData.filter(
        (coin) => coin.id !== action.payload
      );
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getHistoricalData.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(getHistoricalData.fulfilled, (state, action) => {
  //       state.portfolioData = state.portfolioData.map((coin, index) => ({
  //         ...coin,
  //         historicalData: action.payload[index],
  //       }));
  //       state.isLoading = false;
  //     })
  //     .addCase(getHistoricalData.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     });
  // },
});

export const { addPortfolio, removePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
