import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
