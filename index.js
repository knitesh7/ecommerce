const express = require('express')
const dotenv = require('dotenv')
const router = require('./routes/userroutes')
const productRouter = require('./routes/productroutes')
const cartsRouter = require('./routes/cartroutes')
const paymentRouter = require('./routes/paymentroutes')
const orderRouter = require('./routes/orderroutes')
const basicMiddlewares = require('./middlewares/basic')
const mongodbConnector = require('./connection/dbconnection')
const path = require('path')

dotenv.config()

const PORT = process.env.PORT
const Mongo_URL = process.env.Mongo_URL

mongodbConnector(Mongo_URL)

const app = express()
basicMiddlewares(app)

app.use(express.static(path.join(__dirname,'./frontend/build/')))

//to fetch uploaded images back
app.use('/getimage', express.static('./uploads'))

//main routes
app.use(router)
app.use('/products', productRouter)
app.use('/carts', cartsRouter)
app.use('/paymentgateway', paymentRouter)
app.use('/orders',orderRouter)
app.get('*',(req,res)=>res.render("index.html"))
app.use((req, res) => res.send('Page not found'))

//..............................

app.listen(PORT, () => console.log('Server started..'))

