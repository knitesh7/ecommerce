const fs = require('fs')
const productHandler = require('../models/product')
const productAdder = async (req, res) => {
    try {
        const { name, price, quantity, description, category } = req.body
        const image = req.file.filename

        if (!name || !price || !quantity || !description || !category || !image) {
            return res.status(400).json({ message: 'All fields are not added' })
        }
        await productHandler.create({ name, price, image, description, category, quantity, shipping: false })
        return res.status(200).json({ message: 'Product added succesfully!' })
    } catch (error) {
        console.log('error ara : ', error.message)
        return res.status(500).json({ message: error.message })
    }
}
const productsFetcher = async (req, res) => {
    try {
        let productsArr = await productHandler.find({})
        if (productsArr.length === 0) {
            return res.status(200).json({ products: [] })
        }
        productsArr = productsArr.map(x => x.toObject())
        return res.status(200).json({ products: productsArr })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const productRemover = async (req, res) => {
    try {
        const deletedProduct = await productHandler.findByIdAndDelete(req.params.id)
        fs.unlink(`./uploads/${deletedProduct.image}`, err => console.log(err))
        return res.status(200).json({ message: 'Product has been deleted succesfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const productUpdator = async (req, res) => {
    try {
        const { name, price, quantity, description, category } = await req.body
        const image = await req.file.filename
        const oldProduct = await productHandler.findById(req.params.id)
        await productHandler.findByIdAndUpdate(req.params.id, { name, price, quantity, description, category, image })
        fs.unlink(`./uploads/${oldProduct.image}`, err => console.log(err))
        return res.status(200).json({ message: 'Product Updated Successfully!' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = { productAdder, productsFetcher, productRemover, productUpdator }