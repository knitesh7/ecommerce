const util = require('util')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const userHandler = require('../models/usermodel')
const hashPass = util.promisify(bcrypt.hash)
const comparePass = util.promisify(bcrypt.compare)

function dateFormatter(receivedDate) {
    const datetime = moment(receivedDate);
    return datetime.format('DD-MM-YYYY');
}

//for user registration
const registerController = async (req, res) => {
    const { username, email, mobile, password, address, secretanswer } = req.body
    if (!username || !email || !mobile || !password || !address || !secretanswer) {
        return res.status(400).json({ message: 'All field are required to create user' })
    }

    try {
        const hashedPass = await hashPass(password, 10)
        userHandler.create({ username, email, mobile, password: hashedPass, address, secretanswer }).then(resp => res.status(200).json({ message: 'Congo!User added.', result: resp.toObject(), success: 'yes' })).catch(err => res.status(500).json({ message: err, success: 'no' }))
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}



//for user login
const loginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Both fields are required to login' })
    }
    try {
        const user = await userHandler.findOne({ email: email })
        const { _id, username, createdAt, address, mobile, userType } = user
        const userObj = { _id, username, email, address, mobile, userType, createdAt: dateFormatter(createdAt) }
        if (user === null) {
            return res.status(400).json({ message: `Email is not registered.` })
        }
        try {
            const passMatchedStatus = await comparePass(password, user.password)
            const token = user.generateToken()
            return passMatchedStatus ? res.status(200).json({ validUser: 'yes', token, userType: user.userType, userObj }) : res.status(400).json({ message: 'Incorrect password', validUser: 'no' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const forgotPassController = async (req, res) => {
    const { email, secretanswer, newpassword } = req.body
    if (!email || !secretanswer || !newpassword) {
        return res.status(400).json({ message: 'All fields are required to update password.' })
    }
    try {
        const user2update = await userHandler.findOne({ email })
        if (user2update) {
            if (user2update.secretanswer === secretanswer) {
                user2update.password = await hashPass(newpassword, 10)
                await userHandler.updateOne({ email }, user2update)
                return res.status(200).json({ message: 'Password Updated Successfully.' })
            } else {
                return res.status(400).json({ message: `Secret answer is invalid` })
            }
        } else {
            return res.status(400).json({ message: `Email is Invalid` })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const userDetailFetcher = async (req, res) => {
    const token = req.body.token
    try {
        if (token) {
            const parts = token.split('.');
            const payload = parts[1];
            const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
            const payloadObject = JSON.parse(decodedPayload);
            const user = await userHandler.findOne({ _id: payloadObject._id })
            const { _id,username, email, createdAt, address, mobile, userType } = user
            const userObj = { _id,username, email, address, mobile, userType, createdAt: dateFormatter(createdAt) }
            // console.log('sending : ',userObj)
            return res.status(200).json({ userObj })
        } else {
            return res.status(400).json({ message: 'User is not signed in' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const userUpdater = async (req, res) => {
    const { updateData, email } = req.body
    try {
        let user = await userHandler.findOne({ email })
        let updatedUser = await userHandler.findByIdAndUpdate({ _id: user._id }, { ...updateData }, { new: true })
        const { _id,username, createdAt, address, mobile, userType } = updatedUser
        return res.status(200).json({ updatedUser: { _id,username, email, createdAt: dateFormatter(createdAt), address, mobile, userType } })
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { userDetailFetcher, registerController, loginController, forgotPassController, userUpdater }