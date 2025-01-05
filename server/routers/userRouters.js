const { userFeedbackPost } = require('../controllers/authControllers')
const { isAuthenticateUser } = require('../middlewares/authenticate')

const router = require('express').Router()

router.route('/feedback').post(isAuthenticateUser, userFeedbackPost)

module.exports = router