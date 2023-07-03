const Joi = require("joi")

const productValidation = Joi.object({
    product_name : Joi.string().min(3).required(),
    product_category : Joi.string().required(),
    productImage : Joi.string().required()
})

module.exports = productValidation;