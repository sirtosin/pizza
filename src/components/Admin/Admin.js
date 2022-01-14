import "./Admin.css";

const Admin = () => {
  return (
    <div
      className="admin
    __container"
    >
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
          <tbody>
            <tr className="trTitle">
              <td>
                <img src="/img/pizza.png" alt="" />
              </td>
              <td>12343</td>
              <td>pizza</td>
              <td>N3,200</td>
              <td>
                <button className="admin__button">Edit</button>
                <button className="admin__button">Delete</button>
              </td>
            </tr>
          </tbody>
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
          <tbody>
            <tr className="trTitle">
              <td>12342...</td>
              <td>tosinn smith</td>
              <td>N3,200</td>
              <td>
                <span>cash</span> <span>paid</span>
              </td>
              <td>status</td>
              <td>
                <button>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
