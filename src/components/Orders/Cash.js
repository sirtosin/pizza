import { useState } from "react";
import { reset } from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cash.css";
import { useDispatch } from "react-redux";
const Cash = ({ mytotal }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState(0);
  const [total, setmytotal] = useState(mytotal);
  const [status, setStatus] = useState(0);
  const [close, setClose] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const sure = async () => {
      const ask = prompt("are you satisfied? ");
      switch (ask) {
        case "yes":
          console.log("submitted");
          await axios
            .post("https://devpizza.herokuapp.com/api/v1/order", {
              customer,
              address,
              phone,
              method,
              total,
              status,
            })
            .then((res) => {
              console.log(res);
              dispatch(reset());
              setClose(true);
              alert("Order Placed");
              navigate(`/order/${res.data._id}`);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        case "no":
          break;
        // default
      }
    };
    sure();
  };
  const closeModal = () => {
    const ask = prompt("are you sure? ");
    switch (ask) {
      case "yes":
        break;
      case "no":
        break;
    }
    setClose(true);
  };

  return (
    <>
      {!close ? (
        <div className="cash__container">
          <div className="cash__wrapper">
            <button className="cash__close" onClick={() => closeModal()}>
              X
            </button>

            <h1 className="cash__title">
              You will pay N{total} after delivery.
            </h1>
            <form className="cash__item">
              <label className="cash__label">Customer Name</label>
              <input
                placeholder="John Smith"
                type="text"
                name="customer"
                className="input"
                onChange={(e) => setCustomer(e.target.value)}
              />

              <div className="cash__item">
                <label className="cash__label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+234 81 567 89 443"
                  onChange={(e) => setPhone(e.target.value)}
                  className="cash__input"
                />
              </div>
              <div className="cash__item">
                <label className="cash__label">Address</label>
                <textarea
                  rows={5}
                  placeholder="Elton St. 505 NY"
                  type="text"
                  name="address"
                  className="textarea"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button
                disabled={address === "" || customer === "" || phone === ""}
                className="cash__button"
                onClick={handleSubmit}
              >
                Order
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Cash;
