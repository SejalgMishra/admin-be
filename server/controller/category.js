const CategorySchema = require("../model/category.model");

class CategoryController {
  static addCategory = async (req, res) => {
    const { category, category_name } = req.body;

    if (!category || !category_name) {
      return res
        .status(400)
        .json({ msg: "Please enter a category and category_name" });
    }

    try {
      const addData = await CategorySchema.create({ category, category_name });
      res.json(addData);
      console.log("added", addData);
    } catch (error) {
      console.error(err);
      res.status(500).send(error);
    }
  };

  static getCategory = async (req, res) => {
    try {
      const getData = await CategorySchema.find({});
      res.json(getData);
    } catch (error) {
      console.error(err);
      res.status(500).send(error);
    }
  };

  static deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
      await CategorySchema.findByIdAndRemove(id);
      res.send("deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  static updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category, category_name } = req.body;
    try {
      const updateData = await CategorySchema.findByIdAndUpdate(
        id,
        { category, category_name },
        { new: true }
      );
      console.log("update", updateData);
      res.send(updateData);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
}

module.exports = CategoryController;
