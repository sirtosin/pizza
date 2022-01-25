import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router";
import { resetUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
import Add from "../PizzaMenu/Add";
import { remove } from "../redux/productSlice";

const Admin = () => {
  const user = useSelector((state) => state.user.users);
  const myproduct = useSelector((state) => state.product.product);
  const orders = useSelector((state) => state.order.order);
  const [add, setAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (myproduct) {
      setIsLoading(false);
      setError(false);
    } else {
      setIsLoading(true);
      setError(true);
    }
  }, [myproduct]);
  const addProduct = () => {
    setAdd(true);
    console.log("add");
  };
  const removeProduct = (id) => {
    dispatch(remove(id));
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
            <div className="item">
              <h1 className="title">Products</h1>
              <table className="table">
                <tbody>
                  <tr className="trTitle">
                    <th>Image</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </tbody>
                {isLoading && <h1>loading...</h1>}
                {error && <h1>oops!!! error occured</h1>}
                {myproduct && myproduct.length === 0 ? (
                  <p>There are no products here</p>
                ) : (
                  <tbody>
                    {myproduct.length > 0 &&
                      myproduct.map((product) => (
                        <tr className="trTitle" key={product._id}>
                          <td>
                            <img src={product.img} alt="" />
                          </td>
                          <td>{product._id.slice(0, 5)}...</td>
                          <td>{product.title}</td>
                          <td>
                            <CurrencyFormat
                              renderText={(value) => <> {value}</>}
                              decimalScale={2}
                              value={product.prices}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"N"}
                            />
                          </td>
                          <td>
                            <button className="admin__button">Edit</button>
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
            <div className="item">
              <h1 className="title">Orders</h1>
              <table className="table">
                <tbody>
                  <tr className="trTitle">
                    <th>Id</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tbody>
                {isLoading && <h1>loading...</h1>}
                {error && <h1>oops!!! error occured</h1>}
                {orders.length === 0 ? (
                  <p>There are no orders</p>
                ) : (
                  <tbody>
                    {orders.length > 0 &&
                      orders.map((order) => (
                        <tr className="trTitle" key={order._id}>
                          <td>{order._id.slice(0, 5)}...</td>
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
