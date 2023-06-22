const express = require('express')
const productRouter = express.Router()
const {productAdder,productsFetcher,productRemover,productUpdator} = require('../controllers/product')

productRouter.post('/add',productAdder)
productRouter.get('/all',productsFetcher)
productRouter.delete('/:id',productRemover)
productRouter.patch('/editproduct/:id',productUpdator)
module.exports = productRouter