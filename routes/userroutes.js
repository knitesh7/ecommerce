const router = require('express').Router()

const { registerController, loginController,forgotPassController,userDetailFetcher,userUpdater } = require('../controllers/user')
const {authHandler, adminVerifier } = require('../middlewares/userAuth')


router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgotpassword', forgotPassController)
router.get('/verifylogin', authHandler)
router.get ('/verifyadmin',authHandler, adminVerifier)
router.post ('/getuserdetail',userDetailFetcher)
router.post ('/updateuser',userUpdater)

module.exports = router