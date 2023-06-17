const braintree = require("braintree");
const dotenv = require('dotenv')
const orderHandler = require('../models/order')
dotenv.config()

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
});

const sendTokenToClient = async (req, res) => {
    console.log(req.params.customerid)
    try {
        const response = await gateway.clientToken.generate({})
        return res.status(200).send(response.clientToken)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Something went wrong!')
    }

}
const transactionHandler = async (req, res) => {
    const { nonceFromClient, billAmount, buyerCart } = req.body
    const { owner, cartItems, quantityArr } = buyerCart
    try {
        const result = await gateway.transaction.sale({
            amount: billAmount,
            paymentMethodNonce: nonceFromClient,
            options: {
                submitForSettlement: true
            }
        });
        await orderHandler.create({ buyer: owner, payment: result, purchasedItems: { products: cartItems, productsQuantity: quantityArr } })
    
        return res.sendStatus(200)

    } catch (error) {
        console.log(error)
    }
}


module.exports = { sendTokenToClient, transactionHandler }