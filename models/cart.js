const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    cartItems: [{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }],
    quantityArr: [{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }]
})

const cartsHandler = mongoose.model('carts', CartSchema)

module.exports = cartsHandler