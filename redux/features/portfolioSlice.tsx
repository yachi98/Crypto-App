import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Portfolio } from "@/interfaces/portfolio.interface";
import axios from "axios";

interface PortfolioState {
  portfolioData: Portfolio[];
  hasError: boolean;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  portfolioData: [],
  hasError: false,
  isLoading: false,
};

let portfolio: Portfolio[] = [];

export const addPortfolioData = createAsyncThunk(
  "historicalData/addPortfolioData",
  async (coin: Portfolio, { rejectWithValue }) => {
    try {
      const { data: historicalData } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.purchaseDate}`
      );

      const uniqueIds = [
        ...new Set(portfolio.map((portfolioId) => portfolioId.coinApiId)),
      ]; // iterates over the portfolio array and creates a new array that contains only the coinApiId of each Portfolio object. new Set(...): The Set object is used to store unique values. By passing the array from the previous step to the Set constructor, any duplicate values are removed. [...new Set(...)]: The ... (spread operator) is used to convert the Set back into an array. So, [...new Set(['bitcoin', 'ethereum', 'bitcoin'])] would produce the array ['bitcoin', 'ethereum'].
      const currentPrices = await Promise.all(
        // Promise.all: This method is used to run multiple asynchronous operations concurrently. It takes an array of promises and returns a single promise that resolves when all of the promises in the array have resolved.
        uniqueIds.map(async (uniqueId) => {
          // Mapping Over uniqueIds: uniqueIds.map iterates over each uniqueId in the uniqueIds array and returns a new array of promises.
          const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${uniqueId}`
          );
          return {
            value: uniqueId,
            currentPrice: data.market_data.current_price.gbp,
          };
        })
      );

      portfolio = portfolio.map((p) => {
        const currentCoinData = currentPrices.find(
          (priceData) => priceData.value === p.coinApiId
        );
        const currentPrice = currentCoinData?.currentPrice || 0;
        return {
          ...p,
          hasProfit: p.market_data.purchasePrice > currentPrice,
        };
      });

      const currentPrice = historicalData.market_data.current_price.gbp;
      const purchaseAmountValue = coin.purchaseAmount * currentPrice;

      const portfolioEntry: Portfolio = {
        id: coin.id,
        coinApiId: coin.coinApiId,
        value: coin.value,
        image: coin.image,
        purchaseDate: coin.purchaseDate,
        purchaseAmount: purchaseAmountValue,
        market_data: {
          purchasePrice: historicalData.market_data.current_price || {},
          market_cap: historicalData.market_data.market_cap || {},
          total_volume: historicalData.market_data.total_volume || {},
        },
      };

      return portfolioEntry;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
        state.portfolioData = [...state.portfolioData, action.payload];
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

// export const addPortfolioData = createAsyncThunk(
//   "historicalData/addPortfolioData",
//   async (coin: Portfolio, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.purchaseDate}`
//       );

//       const currentPrice = data.market_data.current_price.gbp;
//       const purchaseAmountValue = coin.purchaseAmount * currentPrice;

//       const portfolioEntry: Portfolio = {
//         id: coin.id,
//         coinApiId: coin.coinApiId,
//         value: coin.value,
//         image: coin.image,
//         purchaseDate: coin.purchaseDate,
//         purchaseAmount: purchaseAmountValue,
//         market_data: {
//           current_price: data.market_data.current_price || {},
//           market_cap: data.market_data.market_cap || {},
//           total_volume: data.market_data.total_volume || {},
//         },
//       };

//       return portfolioEntry;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// const portfolio: Portfolio[] = []; // Ensure Portfolio is correctly defined

//           // Fetch current market data for the coin
//           const res = await fetch(
//             `https://api.coingecko.com/api/v3/coins/${p.coinApiId}?market_data=true`
//           );
//           const json = await res.json();
//           const currentPrice = json.market_data.current_price.usd;
