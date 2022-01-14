import React from "react";
import "./PizzaDetail.css";
const PizzaDetails = () => {
  return (
    <div className="pizzadetail__container">
      <img src="/img/pizza.png" />
      <aside>
        <h4>view ingridents</h4>
        <p>lorem loreem loreem loreem</p>
        <h3>N3,200</h3>
        <button>
          Add to cart
          <img style={{ width: "20px", height: "20px" }} src="/img/cart.png" />
        </button>
      </aside>
    </div>
  );
};

export default PizzaDetails;
