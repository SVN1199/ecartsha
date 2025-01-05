const { newOrder, getSingleOrder, getMyOrders, getSingleProductOrder, returnOrder, getReturnOrderStatus, cancelReturnOrder } = require('../controllers/orderControllers')
const { isAuthenticateUser } = require('../middlewares/authenticate')
const router = require('express').Router()

router.route('/neworder').post(isAuthenticateUser, newOrder)
router.route('/myorder/:id').get(isAuthenticateUser, getSingleOrder)
router.route('/singleorder/:orderId/:singleOrderId').get(isAuthenticateUser, getSingleProductOrder)
router.route('/myorder').get(isAuthenticateUser, getMyOrders)
router.route('/returnorder').post(isAuthenticateUser, returnOrder)
router.route('/returnorder').get(isAuthenticateUser, getReturnOrderStatus)
router.route('/returnorder').delete(isAuthenticateUser, cancelReturnOrder)

module.exports = router