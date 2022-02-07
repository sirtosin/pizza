import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className="navbar__container">
      <div className="left">
        <img
          className="imgWrapper"
          src="/img/telephone.png"
          style={{ width: "35px", height: "35px" }}
          alt="phone"
        />
        <span>
          <h3>place order now!!!</h3>
          <h2>+234-406-80-757</h2>
        </span>
      </div>
      <div className="middle">
        <>
          <Link to="/">
            <h3
              style={{
                fontStyle: "italic",
                fontFamily: "fantasy",
              }}
            >
              d'lorenzo
            </h3>
          </Link>
        </>
        <>
          <Link to="/admin/login">
            <h3>admin</h3>
          </Link>
        </>
      </div>
      <div className="right">
        <>
          <Link to="/cart">
            <h3>cart</h3>
            <img src="/img/cart.png" />
            <small>{quantity}</small>
          </Link>
        </>
      </div>
    </div>
  );
};

export default Navbar;
