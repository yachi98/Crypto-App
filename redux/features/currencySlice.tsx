import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currency: "gbp",
  symbol: "£",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurr: (state, action) => {
      state.currency = action.payload;
      switch (action.payload) {
        case "gbp":
          state.symbol = "£";
          break;
        case "eur":
          state.symbol = "€";
          break;
        case "usd":
          state.symbol = "$";
          break;
        case "jpy":
          state.symbol = "¥";
          break;
        case "chf":
          state.symbol = "₣";
          break;
        case "rub":
          state.symbol = "₽";
          break;
        default:
          state.symbol = "£";
      }
    },
  },
});

export const { changeCurr } = currencySlice.actions;
export default currencySlice.reducer;
