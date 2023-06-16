const express = require('express')
const paymentRouter = express.Router()

const {sendTokenToClient,transactionHandler} = require('../controllers/payment.js')

paymentRouter.get('/gettoken/:customerid',sendTokenToClient)
paymentRouter.post('/transaction',transactionHandler)

module.exports = paymentRouter