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

import axios from "axios";
import { useDispatch } from "react-redux";
import { getProducts } from "./components/redux/productSlice";
function App() {
  //product from store
  const dispatch = useDispatch();
  useEffect(async () => {
    const res = await axios.get("http://localhost:2000/");
    const data = res.data;
    dispatch(getProducts(data));
    console.log(data);
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<PizzaDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="order" element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
