const fs = require('fs')
const productHandler = require('../models/product')
const productAdder = async (req, res) => {
    try {
        const { name, price, quantity, description, category,image } = await req.body
    
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
        return res.status(200).json({ message: 'Product has been deleted succesfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const productUpdator = async (req, res) => {
    const { name, price, quantity, description, category } = await req.body
    let updateData = { name, price, quantity, description, category }
    try {
        if(req.body.image){
            if(req.body.image!==''){
                updateData = {...updateData,image:req.body.image }
            }
        }
        await productHandler.findByIdAndUpdate(req.params.id, updateData)
        return res.status(200).json({ message: 'Product Updated Successfully!' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = { productAdder, productsFetcher, productRemover, productUpdator }