const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// DB Config
const db = require("./config").MONGOURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//Routes
app.use("/", require("./api/products/index.js"));
// app.use("/order", require("./api/orders/index.js"));

const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
