const express = require('express')
const productRouter = express.Router()
const upload = require('../middlewares/upload')
const {productAdder,productsFetcher,productRemover,productUpdator} = require('../controllers/product')

productRouter.post('/add',upload.single('image'),productAdder)
productRouter.get('/all',productsFetcher)
productRouter.delete('/:id',productRemover)
productRouter.patch('/editproduct/:id',upload.single('image'),productUpdator)
module.exports = productRouter