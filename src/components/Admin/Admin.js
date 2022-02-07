import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router";
import { resetUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import Add from "../PizzaMenu/Add";
import axios from "axios";
import { fetchAsyncProduct } from "../redux/productSlice";
import { Link } from "react-router-dom";

const Admin = () => {
  const user = useSelector((state) => state.user.users);
  const myproduct = useSelector((state) => state.product.product);
  const orders = useSelector((state) => state.order.order);
  const [pizza, setPizza] = useState([]);
  const [pizzaOrder, setPizzaOrder] = useState([]);
  const [add, setAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (myproduct) {
      setIsLoading(false);
      setError(false);
      setPizza(myproduct);
    } else {
      setError(true);
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (orders) {
      setIsLoading(false);
      setError(false);
      setPizzaOrder(orders);
    } else {
      setError(true);
    }
  }, []);
  const addProduct = () => {
    setAdd(true);
    console.log("add");
  };
  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:7000/api/v1/product/" + id
      );
      console.log(res);
      setPizza(pizza.filter((pizza) => pizza._id !== id));
      dispatch(fetchAsyncProduct());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!user ? (
        navigate("/")
      ) : (
        <>
          <aside className="admin__log">
            <h3>welcome, {user.username}</h3>
            <button onClick={() => dispatch(resetUser())}>logout</button>
          </aside>
          <div className="add__product">
            <button onClick={addProduct}>
              add a product
              {add && <Add />}
            </button>
          </div>
          <div className="admin__container">
            <div className="admin__item">
              <h1 className="admin__title">Products</h1>
              <table className="admin__table">
                <tbody>
                  <tr className="admin__trTitle">
                    <th>Image</th>
                    <th className="admin__id">Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </tbody>
                {isLoading && <h1>loading...</h1>}
                {error && <h1>oops!!! error occured</h1>}
                {pizza && pizza.length === 0 ? (
                  <>There are no products here</>
                ) : (
                  <tbody>
                    {pizza.length > 0 &&
                      pizza.map((product) => (
                        <tr className="admin__trTitle" key={product._id}>
                          <td>
                            <img src={product.image} alt="" />
                          </td>
                          <td className="admin__id">
                            {product._id.slice(0, 5)}...
                          </td>
                          <td>{product.title}</td>
                          <td>
                            <CurrencyFormat
                              renderText={(value) => <> {value}</>}
                              decimalScale={2}
                              value={product.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"N"}
                            />
                          </td>
                          <td>
                            <a className="admin__button">
                              <Link to={`edit/${product._id}`}> Edit</Link>
                            </a>
                            <button
                              className="admin__button"
                              onClick={() => removeProduct(product._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="admin__item">
              <h1 className="admin__title">Orders</h1>
              <table className="admin__table">
                <tbody>
                  <tr className="admin__trTitle">
                    <th className="admin__id">Id</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tbody>
                {isLoading && <h1>loading...</h1>}
                {error && <h1>oops!!! error occured</h1>}
                {pizzaOrder.length === 0 ? (
                  <p>There are no pizzaOrder</p>
                ) : (
                  <tbody>
                    {pizzaOrder.length > 0 &&
                      pizzaOrder.map((order) => (
                        <tr className="admin__trTitle" key={order._id}>
                          <td className="admin__id">
                            {order._id.slice(0, 5)}...
                          </td>
                          <td>{order.customer}</td>
                          <td>
                            <CurrencyFormat
                              renderText={(value) => <> {value}</>}
                              decimalScale={2}
                              value={order.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"N"}
                            />
                          </td>
                          <td>
                            <span>cash</span> <span>paid</span>
                          </td>
                          <td>status</td>
                          <td>
                            <button>Next Stage</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
