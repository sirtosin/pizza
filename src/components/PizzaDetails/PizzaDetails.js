import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addProduct } from "../redux/cartSlice";
import { fetchAsyncProductDetail } from "../redux/productSlice";
import "./PizzaDetail.css";
import CurrencyFormat from "react-currency-format";

const PizzaDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncProductDetail(id));
  }, [dispatch, id]);
  const myproduct = useSelector((state) => state.product.selectProduct);
  const mycart = useSelector((state) => state.cart.products);
  console.log("myproductDetail", myproduct);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [price, setPrice] = useState(myproduct.prices);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (myproduct === 0) {
      setIsLoading(true);
      setError(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(false);
    }
  }, [myproduct]);

  const handleSize = (sizeIndex) => {
    if (sizeIndex === 0) {
      setPrice(myproduct.prices);
      console.log("price", price);
    }
    if (sizeIndex === 1) {
      setPrice(myproduct.prices + 500);
      console.log("price", price);
    }
    if (sizeIndex === 2) {
      setPrice(myproduct.prices + 1000);
      console.log("price", price);
    }
  };

  const handleClick = () => {
    if (mycart.find((item) => item._id === id)) {
      alert("Product already added to cart");
    } else {
      dispatch(addProduct({ ...myproduct, extras, price, quantity }));
      alert("Added to cart");
    }
  };

  return (
    <>
      {isLoading && <h1>loading...</h1>}
      {error && <h1>oops!!! error occured</h1>}

      {myproduct ? (
        <div className="pizzadetail__container" key={myproduct._id}>
          <img src={myproduct.img} />
          <aside>
            <h1>{myproduct.title}</h1>

            <h3>{myproduct.desc}</h3>
            <h4>Choose your preferred size</h4>
            <div className="sizes">
              <div className="size" onClick={() => handleSize(0)}>
                <img
                  src="/img/size.png"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
                <span className="number">Small</span>
              </div>
              <div className="size" onClick={() => handleSize(1)}>
                <img
                  src="/img/size.png"
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
                <span className="number">Medium</span>
              </div>
              <div className="size" onClick={() => handleSize(2)}>
                <img
                  src="/img/size.png"
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
                <span className="number">Large</span>
              </div>
            </div>

            <h3>
              price:
              {price === undefined
                ? "choose your size to see price"
                : "N" +
                  // (
                  //   <CurrencyFormat
                  //     renderText={(value) => <h3> {value}</h3>}
                  //     decimalScale={2}
                  //     value={price}
                  //     displayType={"text"}
                  //     thousandSeparator={true}
                  //     prefix={"N"}
                  //   />
                  // )
                  price}
            </h3>
            <section className="extra">
              <h4>Extra sauce Ingredients: </h4>
              {myproduct.extraOptions &&
                myproduct.extraOptions.map((option) => (
                  <div key={option._id}>
                    <h4>{option.text},</h4>
                  </div>
                ))}
            </section>

            <div className="quantity">
              <label>
                <h4> Quantity: </h4>
              </label>
              <input
                type="number"
                placeholder="1"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button
              disabled={price === undefined || quantity === 0 ? true : false}
              onClick={() => handleClick()}
            >
              Add to cart
              <img
                style={{ width: "20px", height: "20px" }}
                src="/img/cart.png"
              />
            </button>
          </aside>
        </div>
      ) : (
        <h3>no product to display</h3>
      )}
    </>
  );
};

export default PizzaDetails;
