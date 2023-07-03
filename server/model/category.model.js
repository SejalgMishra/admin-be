const mongoose = require("mongoose")
const { Schema , model} = mongoose

const CategorySchema = new mongoose.Schema({
    category:{
        type:String
    },
    category_name:{
        type:String
    }
})

const Category = mongoose.model("Category" , CategorySchema)

module.exports = Category