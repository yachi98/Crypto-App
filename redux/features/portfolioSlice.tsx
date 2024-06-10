import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Portfolio } from "@/interfaces/portfolio.interface";

interface PortfolioState {
  portfolioData: Portfolio[];
}

const initialState: PortfolioState = {
  portfolioData: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addPortfolio(state, action) {
      state.portfolioData = [...state.portfolioData, action.payload];
      console.log(action.payload);
    },
    removePortfolio(state, action) {
      state.portfolioData = state.portfolioData.filter(
        (coin) => coin.id !== action.payload
      );
    },
  },
});

export const { addPortfolio, removePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
