const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    shipping: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const productHandler = mongoose.model('products', ProductSchema)

module.exports = productHandler