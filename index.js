const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const router = require('./routes/userroutes')
const productRouter = require('./routes/productroutes')
const cartsRouter = require('./routes/cartroutes')
const paymentRouter = require('./routes/paymentroutes')
const orderRouter = require('./routes/orderroutes')
const basicMiddlewares = require('./middlewares/basic')
const mongodbConnector = require('./connection/dbconnection')

dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI 

mongodbConnector(MONGO_URI)

const app = express()
basicMiddlewares(app)

//to fetch uploaded images back
// app.use('/getimage', express.static('./uploads'))

//main routes
app.use(router)
app.use('/products', productRouter)
app.use('/carts', cartsRouter)
app.use('/paymentgateway', paymentRouter)
app.use('/orders',orderRouter)

//..............................
app.use(express.static(path.join(__dirname, './frontend/build/')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './frontend/build/index.html')))
app.use((req, res) => res.send('Page not found'))
app.listen(PORT, () => console.log('Server started..'))

