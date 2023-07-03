const mongoose = require("mongoose")
const { Schema , model} = mongoose

const ProductSchema = new mongoose.Schema({
    product_name:{
        type:String
    },
    product_category:{
        type:String
    },
    productImage : {
        type:String
    }
})

const Category = mongoose.model("Product" , ProductSchema)

module.exports = Category