import "./Order.css";
const Order = () => {
  return (
    <div className="order__container">
      <div className="order__left">
        <div className="row">
          <table className="order__table">
            <tr className="trTitle">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className="order__tr">
              <td>
                <span className="id">12234</span>
              </td>
              <td>
                <span className="name">tosinn smith</span>
              </td>
              <td>
                <span className="address">ogba ikeja</span>
              </td>
              <td>
                <span className="total">N3,200</span>
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
            <b className="totalTextTitle">Subtotal:</b>N3,200
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Discount:</b>N0.00
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Total:</b>N3,200
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
