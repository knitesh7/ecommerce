const { Schema, model } = require('mongoose')

const orderSchema = Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    purchasedItems: {
        products: [{
            type: Schema.Types.Mixed,
            ref: 'products'
        }],
        productsQuantity: [
            { _id: { type: String }, quantity: { type: Number } }
        ]
    },
    payment: {},
    status: {
        type: String,
        default: 'not processed',
        enum: ['not processed', 'processing', 'shipped', 'delivered', 'canceled']
    }

}, { timestamps: true })
const orderHandler = model('orders', orderSchema)
module.exports = orderHandler
// const { Schema, model } = require('mongoose')

// const orderSchema = Schema({
//     buyer: {
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//     },
//     purchasedItems: {
//         products: [{
//             type: Schema.Types.ObjectId,
//             ref: 'products'
//         }],
//         productsQuantity: [{ type: String }]
//     },
//     payment: {},
//     status: {
//         type: String,
//         default: 'not processed',
//         enum: ['not processed', 'processing', 'shipped', 'delivered', 'canceled']
//     }

// },{timestamps:true})
// const orderHandler = model('orders', orderSchema)
// module.exports = orderHandler