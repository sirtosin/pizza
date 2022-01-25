const Product = require("../../Models/Product");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const DIR = "./public";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
      title: req.body.title,
      image: url + "/public/" + req.file.filename,
      price: req.body.price,
      description: req.body.description,
      sauce: req.body.sauce,
    });
    await product.save();
    console.log(req.file);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//single product
router.get("/:id", async (req, res) => {
  //console.log(req.params.id);
  try {
    const single = await Product.findById(req.params.id);
    res.send(single);
  } catch (err) {
    console.log(err);
  }
});

//update product info
router.put("/:id", async (req, res) => {
  try {
    const update = await Product.updateOne(req.body);
    res.json(update);
  } catch (error) {
    console.log(error);
  }
});

//delete Product
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((product) => {
      if (!product) {
        res.status(405).send({
          message: `cannot delete product with ID ${id}, product not found!!!`,
        });
      } else {
        return res.send("deleted");
      }
    })
    .catch((err) => res.send(err.message));
});
module.exports = router;
