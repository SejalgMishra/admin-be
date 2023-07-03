const express = require("express")

const CategoryController = require("../controller/category")

const router = express.Router()

router.post("/category" , CategoryController.addCategory)

router.get("/category" , CategoryController.getCategory)

router.put("/category/:id" , CategoryController.updateCategory)

router.delete("/category/:id" , CategoryController.deleteCategory)




module.exports= router