import React from "react";
import "./Cart.css";
import Checkout from "./Checkout";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// import axios from "axios";
// import { reset } from "../redux/cartSlice";
// import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const [cash, setCash] = useState(false);
  return (
    <div className="cart__container">
      <div className="cart__left">
        <table className="table">
          <tbody>
            <tr className="trTitle">
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            <tr className="cart__tr">
              <td>
                <div className="imgContainer">
                  <img src="/img/pizza.png" alt="" />
                </div>
              </td>
              <td>
                <span className="name">Pizza</span>
              </td>
              <td>
                <span className="extras">spicy </span>
              </td>
              <td>
                <span className="price">N3,200</span>
              </td>
              <td>
                <span className="quantity">1</span>
              </td>
              <td>
                <span className="total">3,200</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cart__right">
        <div className="cart__wrapper">
          <h2 className="title">CART TOTAL</h2>
          <div className="totalText">
            <b className="totalTextTitle">Subtotal:</b>N3,200
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Discount:</b> N0.00
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Total:</b>N3,200
          </div>
          <div className="paymentMethods">
            <button className="payButton">CASH ON DELIVERY</button>
          </div>

          <button className="cart__button">CHECKOUT NOW!</button>
        </div>
      </div>
      {/* {cash && <Checkout total={cart.total} createOrder={createOrder} />} */}
    </div>
  );
};

export default Cart;
