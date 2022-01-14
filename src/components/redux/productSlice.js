import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

export const productSlice = createSlice({
  name: "product",
  initialState: { value: initialStateValue },
  reducers: {
    postProduct: (state, action) => {
      state.value = action.payload;
    },
    getProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { postProduct, getProducts } = productSlice.actions;

export default productSlice.reducer;
