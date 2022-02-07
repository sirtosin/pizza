import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncProduct = createAsyncThunk(
  "product/fetchAsyncproduct",
  async () => {
    const response = await axios.get(`http://localhost:7000/api/v1/product`);
    localStorage.setItem("product", JSON.stringify(response.data));
    return response.data;
  }
);

export const fetchAsyncProductDetail = createAsyncThunk(
  "product/fetchAsyncProductDetail",
  async (id) => {
    const response = await axios.get(
      `http://localhost:7000/api/v1/product/${id}`
    );
    return response.data;
  }
);

const initialState = {
  product: {},
  selectProduct: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    remove: async (state, action) => {
      await axios
        .delete(`http://localhost:7000/api/v1/product/${action.payload}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      const myproduct = JSON.parse(localStorage.getItem("product"));
      const newProduct = myproduct.filter((item) => {
        console.log("item_id", item._id, action.payload);
        return item._id !== action.payload;
      });
      state.product = newProduct;
      localStorage.setItem("product", JSON.stringify(newProduct));
    },
  },
  extraReducers: {
    [fetchAsyncProduct.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncProduct.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, product: payload };
    },
    [fetchAsyncProduct.rejected]: () => {
      console.log("Rejected!");
    },
    [fetchAsyncProductDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectProduct: payload };
    },
  },
});

export const { remove } = productSlice.actions;

export default productSlice.reducer;
