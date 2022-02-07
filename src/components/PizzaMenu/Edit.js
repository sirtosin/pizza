import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Edit.css";
import {
  fetchAsyncProduct,
  fetchAsyncProductDetail,
} from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncProductDetail(id));
    console.log("id", id);
  }, [dispatch, id]);
  const myproduct = useSelector((state) => state.product.selectProduct);
  console.log("EditProductDetail", myproduct);

  const [title, setTitle] = useState(myproduct.title);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sauce, setSauce] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = (e, id) => {
    e.preventDefault();

    const sure = async () => {
      const ask = prompt("are you satisfied? ");
      switch (ask) {
        case "yes":
          console.log("submitted");

          setIsLoading(true);

          await axios
            .put(`http://localhost:7000/api/v1/product/${id}`, {
              title,
              image,
              price,
              description,
              sauce,
            })
            .then((res) => {
              console.log(res);
              alert("Product updated");
              dispatch(fetchAsyncProduct());
              navigate(`/`);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
              setError(true);
            });
          break;
        case "no":
          break;
        // default
      }
    };
    sure();
  };

  return (
    <>
      {isLoading && <h1 className="loading">loading...</h1>}
      {error && <h1>oops!!! error occured</h1>}
      {myproduct ? (
        <div className="edit__container" key={myproduct._id}>
          <div className="edit__wrapper">
            <form className="edit__item">
              <h2>edit Product</h2>
              <label className="edit__label">title </label>
              <input
                placeholder={myproduct.title}
                type="text"
                name="title"
                className="input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="edit__label">image </label>
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleChange}
                value={fileInputState}
                className="form-input"
              />
              {previewSource || myproduct.image ? (
                <img
                  src={previewSource || myproduct.image}
                  alt="chosen"
                  style={{ height: "50px", width: "50px" }}
                />
              ) : null}

              <div className="edit__item">
                <label className="edit__label">price</label>
                <input
                  type="number"
                  name="price"
                  placeholder={myproduct.price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="edit__input"
                />
              </div>
              <div className="edit__item">
                <label className="edit__label">sauce</label>
                <textarea
                  rows={3}
                  type="text"
                  name="sauce"
                  placeholder={myproduct.sauce}
                  className="textarea"
                  onChange={(e) => setSauce(e.target.value)}
                />
              </div>
              <div className="edit__item">
                <label className="edit__label">description</label>
                <textarea
                  rows={5}
                  type="text"
                  name="description"
                  placeholder={myproduct.description}
                  className="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="button__container">
                <button
                  className="edit__button"
                  onClick={(e) => handleSubmit(e, myproduct._id)}
                  disabled={isLoading || title === "" || price === ""}
                >
                  Edit Product
                </button>
                <a>
                  <Link to="/admin">
                    <button className="edit__button red">cancel</button>
                  </Link>
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h3>no product to display</h3>
      )}
    </>
  );
};

export default Edit;
