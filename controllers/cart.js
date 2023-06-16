const cartsHandler = require('../models/cart.js')
const cartFetcher = async (req, res) => {
    try {
        const cart = await cartsHandler.findOne({ owner: req.params.id })
        if (cart === null) {
            return res.status(200).json({ cartdata: null })
        }
        const { owner, cartItems, quantityArr } = cart
        return res.status(200).json({ owner, cartItems, quantityArr })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const cartAddUpdate = async (req, res) => {
    const contentType = req.get('Content-Type'); // Get the Content-Type header
    let cartsArr = []
    if (contentType === 'application/json') {
        cartsArr = req.body
    } else {
        cartsArr = JSON.parse(req.body)
    }
    try {
        for (let key in cartsArr) {
            const temp = await cartsHandler.findOne({ owner: cartsArr[key].owner })
            if (temp === null) {
                await cartsHandler.create(cartsArr[key])
            } else {
                await cartsHandler.findOneAndUpdate({ owner: cartsArr[key].owner }, cartsArr[key])
            }
        }
        return res.sendStatus(200)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
module.exports = { cartAddUpdate, cartFetcher }