import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/redux/features/globalSlice";
import coinMarketReducer from "@/redux/features/coinMarketSlice";
import selectedCoinReducer from "@/redux/features/selectedCoins";
import currencyReducer from "@/redux/features/currencySlice";
import portfolioReducer from "@/redux/features/portfolioSlice";

export const store = configureStore({
  reducer: {
    globalData: globalReducer,
    coinMarketData: coinMarketReducer,
    selectedCoinData: selectedCoinReducer,
    currencySlice: currencyReducer,
    portfolioData: portfolioReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
