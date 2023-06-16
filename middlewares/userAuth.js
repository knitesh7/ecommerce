const userHandler = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.secretKey

const authHandler = (req, res, next) => {
    try {
        if (req.headers.authorization !== undefined) {
            const decodedPayload = jwt.verify(req.headers.authorization, secretKey)
            if (decodedPayload) {
                if (req.url === '/verifyadmin') {
                    req.userPayload = decodedPayload
                    next()
                } else {
                    return res.status(200).json({ verifylogin: true })
                }
            }
        } else {
            return res.status(400).json({ message: 'not signed in' })
            // return res.sendStatus(400)
            // return res.send(400)
        }

    } catch (error) {
        return res.status(400).json({ message: 'invalid user' })
        // return res.sendStatus(400)
        // return res.send(400)
    }
}

const adminVerifier = async (req, res) => {
    try {
        const user = await userHandler.findById(req.userPayload._id)
        if (user) {
            if (user.userType === 1) {
                return res.status(200).json({ verifyadmin: true })

            } else {
                return res.status(200).json({ verifyadmin: false })
            }
        }
    } catch (error) {
        // return res.status(500).json({ message: error.message })
        return res.sendStatus(500)
    }
}

module.exports = { authHandler, adminVerifier }