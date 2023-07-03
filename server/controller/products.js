const ProductSchema = require("../model/product.model");
const productValidation = require("../validation/product.joi");

class ProductController {
  static addProduct = async (req, res) => {
    const { product_name, product_category } = req.body;
    const { filename } = req.file;
    // if (!product_name || !product_category) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Please enter a product_name and product_category" });
    // }

    try {
      const result = await productValidation.validateAsync({
        product_name,
        product_category,
        productImage: filename,
      });
      const addData = await ProductSchema.create({
        product_name,
        product_category,
        productImage: filename,
      });
      res.send(addData);
      console.log("added", addData);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  static getProduct = async (req, res) => {
    try {
      const getData = await ProductSchema.find({});
      res.send(getData);
    } catch (error) {
      console.error(err);
      res.status(500).send(error);
    }
  };

  static updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, product_category } = req.body;
    try {
      const updateData = await ProductSchema.findByIdAndUpdate(
        id,
        { product_name, product_category },
        { new: product_name || product_category }
      );
      res.json(updateData);
      console.log(updateData, "updated");
      return;
    } catch (error) {
      console.error(err);
      res.status(500).send(error);
    }
  };

  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await ProductSchema.findByIdAndRemove(id);
      res.json("deleted");
    } catch (error) {
      console.error(err);
      res.status(500).send(error);
    }
  };
}

module.exports = ProductController;
