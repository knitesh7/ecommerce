const express = require('express')
const cartsRouter = express.Router()

const { cartAddUpdate, cartFetcher } = require('../controllers/cart.js')

cartsRouter.post('/add',cartAddUpdate)
cartsRouter.get('/:id',cartFetcher)

module.exports = cartsRouter