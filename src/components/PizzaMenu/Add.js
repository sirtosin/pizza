import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Add.css";
const Add = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sauce, setSauce] = useState("");
  const [close, setClose] = useState(false);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("sauce", sauce);

    await axios
      .post("http://localhost:7000/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setClose(true);
        navigate(`/admin`);
      })
      .catch((err) => {
        throw err;
        //console.log(err);
      });
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
            <button className="add__close" onClick={() => closeModal()}>
              X
            </button>

            <form
              className="add__item"
              method="POST"
              encType="multipart/form-data"
            >
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
              {image.preview && (
                <img src={image.preview} width="100" height="80" />
              )}
              <hr></hr>

              <input type="file" name="file" onChange={handleFileChange} />
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
                  rows={3}
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
                  rows={5}
                  placeholder="what a taste.."
                  type="text"
                  name="description"
                  className="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                disabled={title === "" || image === "" || price === ""}
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
