const express = require('express')
const orderRouter = express.Router()

const {orderFetcher,allordersFetcher,shipStatusSetter } = require('../controllers/order.js')


orderRouter.get('',allordersFetcher)
orderRouter.get('/:id',orderFetcher)
orderRouter.post('/shipstatus',shipStatusSetter)

module.exports = orderRouter