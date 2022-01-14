import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PizzaMenu.css";

const PizzaMenu = () => {
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get("http://localhost:2000");
        pizzaMenu.push(result.data);
        setPizzaMenu(result.data);
        setIsLoading(false);
        console.log("pizaa", pizzaMenu);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pizza__menu__container">
      <div className="owner">
        <h2>d'lorenzo pizza </h2>
        <aside className="underline"></aside>
        <p>
          D'lorenzo pizza is a dish of Italian origin consisting of a usually
          round, flat base of leavened wheat-based dough topped with tomatoes,
          cheese, and often various other ingredients, which is then baked at a
          high temperature, traditionally in a wood-fired oven. A small pizza is
          sometimes called a pizzetta
        </p>
      </div>
      <div className="title">
        <h3>our menu</h3>
        <aside className="underline"></aside>
      </div>
      <section className="pizza__menu__products">
        {isLoading && <h1>loading...</h1>}
        {error && <h1>oops!! error occured.</h1>}
        <a>
          {pizzaMenu.map((product) => {
            <article key={product._id}>
              <img src={product.img} />
              <h4>{product.title}</h4>
              <p>{product.prices}[0]</p>
              <p>{product.desc}</p>
            </article>;
          })}
        </a>
      </section>
    </div>
  );
};

export default PizzaMenu;
