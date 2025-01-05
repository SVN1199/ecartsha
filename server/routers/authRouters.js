const { register, login, getUser, checkEmail, sendOtpViaEmail, verifyEmail, updatePassword, forgotPassword, resetPassword, updateUserProfile, deleteUserProfile } = require('../controllers/authControllers')
const { logoutUser, isAuthenticateUser } = require('../middlewares/authenticate')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage : multer.diskStorage({
        destination : function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/user'))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

router.route('/register').post(upload.single('avatar'), register)
router.route('/login').post(login)
router.route('/getuser').get(isAuthenticateUser, getUser)
router.route('/logout').get(logoutUser)

router.route('/sendotpviaemail').post(sendOtpViaEmail) 
router.route('/verifyemail/:otp').post(verifyEmail) 

router.route('/updateprofile/:id').put(isAuthenticateUser, upload.single('avatar'), updateUserProfile)
router.route('/deleteprofile/:id').delete(isAuthenticateUser, deleteUserProfile)
router.route('/updatepassword').put(isAuthenticateUser, updatePassword)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:token').post(resetPassword)

module.exports = router