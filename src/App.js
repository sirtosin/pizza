import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PizzaDetails from "./components/PizzaDetails/PizzaDetails";
import Cart from "./components/Cart/Cart";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/Login";
import Order from "./components/Orders/Order";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncProduct } from "./components/redux/productSlice";
import { getCartProduct, reset } from "./components/redux/cartSlice";
import { login, resetUser } from "./components/redux/userSlice";
import { fetchAsyncOrder } from "./components/redux/orderSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncProduct());
    dispatch(fetchAsyncOrder());
    dispatch(getCartProduct());
    if (localStorage.getItem("user")) {
      dispatch(login(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(resetUser());
    }
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<PizzaDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="order/:id" element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
