import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const exist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (exist) {
        exist.quantity += 1;
        exist.total = exist.quantity * exist.price;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    getCartProduct: (state) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log("newcart", cart);
      if (cart) {
        state.products = cart;
        state.quantity = cart.length;
        state.total = cart.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0);
      }
    },
    removeCartProduct: (state, action) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter((item) => {
        console.log("item_id", item._id, action.payload);
        return item._id !== action.payload;
      });
      state.products = newCart;
      state.quantity = newCart.length;
      state.total = newCart.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addProduct, reset, getCartProduct, removeCartProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
