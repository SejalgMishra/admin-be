const express = require("express");

const ProductController = require("../controller/products");
const ProductSchema = require("../model/product.model");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

router.post(
  "/product",
  upload.single("productImage"),
  ProductController.addProduct
);

router.get("/product", ProductController.getProduct);

router.put("/product/:id", ProductController.updateProduct);

router.delete("/product/:id", ProductController.deleteProduct);

module.exports = router;
