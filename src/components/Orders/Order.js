import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchAsyncOrderDetail } from "../redux/orderSlice";
import "./Order.css";

const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncOrderDetail(id));
  }, [dispatch, id]);
  const order = useSelector((state) => state.order.selectOrder);
  return (
    <div className="order__container">
      <div className="order__left">
        <div className="row">
          <table className="order__table">
            <tr className="trTitle">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className="order__tr" key={order._id}>
              <td>
                <span className="id">{order._id}</span>
              </td>
              <td>
                <span className="name"> {order.customer}</span>
              </td>
              <td>
                <span className="phone"> {order.phone}</span>
              </td>
              <td>
                <span className="address">{order.address}</span>
              </td>
              <td>
                <span className="total">{order.total}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className="row">
          <div className="">
            <img src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <img src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <img src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <img src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="order__right">
        <div className="wrapper">
          <h2 className="title">CART TOTAL</h2>
          <div className="totalText">
            <b className="totalTextTitle">Subtotal:</b>
            {order.total}
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Discount:</b>N0.00
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Total:</b>
            {order.total}
          </div>
          <button disabled className="button">
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
