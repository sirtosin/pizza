import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeCartProduct, reset } from "../redux/cartSlice";
import Cash from "../Orders/Cash";
import { PaystackButton } from "react-paystack";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router";

const Cart = () => {
  const [delivery, setDelivery] = useState(false);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const myproduct = useSelector((state) => state.cart.products);
  const mytotal = useSelector((state) => state.cart.total);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: "developer@react.com",
    amount: mytotal * 100,
    publicKey: "pk_test_3eb5e531d4ed919aaf3d459a8490e4e9eac550cb",
  };

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    alert(reference.message);
    if (reference) {
      navigate("/");
    }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay Now",
    onSuccess: (reference) => {
      handlePaystackSuccessAction(reference);
    },
    onClose: handlePaystackCloseAction,
  };
  useEffect(() => {
    if (myproduct.length === 0) {
      setIsLoading(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(false);
    }
  }, [myproduct]);
  console.log(
    "cart",
    myproduct.map((product) => product.quantity)
  );

  const pay = () => {
    setDelivery(false);
    setCash(true);
  };

  const handleRemove = (id) => {
    dispatch(removeCartProduct(id));
  };
  return (
    <div className="cart__container">
      <div className="cart__left">
        <table className="table">
          <tbody>
            <tr className="cart__trTitle">
              <th>Product</th>
              <th>Name</th>
              <th className="one">Extras</th>
              <th>Price</th>
              <th className="one">Qty</th>
              <th className="one">Total</th>
            </tr>
          </tbody>
          {isLoading && "loading..."}
          {error && "oops!!! error occured"}
          {myproduct && myproduct.length === 0 ? (
            <p className="no">There are no products in cart</p>
          ) : (
            <tbody>
              {myproduct.length > 0 &&
                myproduct.map((product) => (
                  <tr className="cart__tr" key={product._id}>
                    <td className="image">
                      <div className="imgContainer">
                        <img src={product.image} alt="" />
                      </div>
                    </td>
                    <td className="title">{product.title}</td>
                    <td className="extra">{product.sauce}</td>

                    <td className="price">
                      <CurrencyFormat
                        renderText={(value) => (
                          <span className="cart_price"> {value}</span>
                        )}
                        decimalScale={2}
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"N"}
                      />
                    </td>

                    <td className="qty">{product.quantity}</td>
                    <td className="total">
                      <CurrencyFormat
                        renderText={(value) => (
                          <span className="cart_price"> {value}</span>
                        )}
                        decimalScale={2}
                        value={product.price * product.quantity}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"N"}
                      />
                    </td>
                    <button
                      className="clearcart"
                      onClick={() => handleRemove(product._id)}
                    >
                      X
                    </button>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        <button className="clearcart2" onClick={() => dispatch(reset())}>
          clear cart
        </button>
      </div>
      <div className="cart__right">
        <div className="cart__wrapper">
          <h2 className="title">CART TOTAL</h2>
          <div className="totalText">
            <CurrencyFormat
              renderText={(value) => (
                <b className="totalTextTitle">Subtotal: {value}</b>
              )}
              decimalScale={2}
              value={mytotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"N"}
            />
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Discount:</b> N0.00
          </div>
          <div className="totalText">
            <CurrencyFormat
              renderText={(value) => (
                <b className="totalTextTitle">Total: {value}</b>
              )}
              decimalScale={2}
              value={mytotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"N"}
            />
          </div>

          {open ? (
            <>
              <div className="paymentMethods">
                <button className="payButton" onClick={pay}>
                  CASH ON DELIVERY
                </button>
              </div>

              <div className="paymentMethods paystack">
                <PaystackButton
                  onClick={() => setOpen(false)}
                  className="payButton"
                  {...componentProps}
                />
              </div>
            </>
          ) : (
            <button
              className="cart__button"
              disabled={mytotal === 0}
              onClick={() => setOpen(true)}
            >
              CHECKOUT NOW
            </button>
          )}
        </div>
      </div>
      {cash && <Cash mytotal={mytotal} />}
    </div>
  );
};

export default Cart;
