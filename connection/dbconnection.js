const mongoose = require('mongoose')
const mongodbConnector = (url)=>{
    return mongoose.connect(url).then(()=>console.log('connected to mongo db')).catch(err=>console.log(err))
}

module.exports = mongodbConnector


