const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.secretKey

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secretanswer: {
        type: String,
        required: true
    },
    userType:{
        type:Number,
        default:0
    }
}, { timestamps: true })

userSchema.methods.generateToken = function(){
    try {
        let userToken = jwt.sign({_id:this._id},secretKey)
        return userToken
    } catch (error) {
        console.log(error)
    }
}
const userHandler = mongoose.model('users', userSchema)


module.exports = userHandler