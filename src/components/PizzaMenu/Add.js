import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Add.css";
import { fetchAsyncProduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const Add = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sauce, setSauce] = useState("");
  const [close, setClose] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  function handleChange(e) {
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setImage(reader.result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const sure = async () => {
      const ask = prompt("are you satisfied? ");
      switch (ask) {
        case "yes":
          setLoading(true);

          console.log("submitted");

          console.log("image", image);
          await axios
            .post("http://localhost:7000/api/v1/product", {
              title,
              image,
              price,
              description,
              sauce,
            })
            .then((res) => {
              if (res.status !== 201) {
                setLoading(true);
              } else {
                console.log(res);
                setClose(true);
                setLoading(false);
                dispatch(fetchAsyncProduct());
                alert("Product Added");
                navigate("/");
              }
            })
            .catch((err) => {
              throw err;
              //console.log(err);
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
    console.log("close");
    setClose(true);
  };

  return (
    <>
      {!close ? (
        <div className="add__container">
          <div className="add__wrapper">
            <button className="add__close" onClick={closeModal}>
              X
            </button>

            <form className="add__item">
              {loading && <h1 className="loading">Loading...</h1>}
              <h2>Add Product</h2>

              <label className="add__label">title </label>
              <input
                placeholder="pizza.."
                type="text"
                name="title"
                className="input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="add__label">image </label>
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleChange}
                value={fileInputState}
                className="form-input"
              />
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "50px", width: "50px" }}
                />
              )}
              <div className="add__item">
                <label className="add__label">price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="N3,400"
                  onChange={(e) => setPrice(e.target.value)}
                  className="add__input"
                />
              </div>
              <div className="add__item">
                <label className="add__label">sauce</label>
                <textarea
                  rows={2}
                  placeholder="ginger.."
                  type="text"
                  name="sauce"
                  className="textarea"
                  onChange={(e) => setSauce(e.target.value)}
                />
              </div>
              <div className="add__item">
                <label className="add__label">description</label>
                <textarea
                  rows={3}
                  placeholder="what a taste.."
                  type="text"
                  name="description"
                  className="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                disabled={title === "" || price === ""}
                className="add__button"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Add;
