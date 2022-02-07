import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PizzaMenu.css";

const PizzaMenu = () => {
  const myproduct = useSelector((state) => state.product.product);
  const [isLoading, setIsLoading] = useState(true);
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
        {myproduct.length === 0 ? (
          <p>There are no products</p>
        ) : (
          <a>
            {!myproduct && isLoading && <h1>loading...</h1>}
            {error && <h1>oops!!! error occured</h1>}
            {myproduct.length > 0 &&
              myproduct.map((product) => (
                <aside key={product._id}>
                  <Link to={`/${product._id}`}>
                    <article>
                      <img src={product.image} />
                      <h4>{product.title}</h4>
                      <p>
                        <CurrencyFormat
                          renderText={(value) => <> {value}</>}
                          decimalScale={2}
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"N"}
                        />
                      </p>
                      <p>{product.description}</p>
                    </article>
                  </Link>
                </aside>
              ))}
          </a>
        )}
      </section>
    </div>
  );
};

export default PizzaMenu;
