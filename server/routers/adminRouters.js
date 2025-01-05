const { getAllUsers, getSingleUser, getAllProducts, getProductInventory, updateProductInventory, addProductInventory, deleteProductInventory, addProductDetail, getProductDetail, deleteProductDetail, getProductDescriptionAndHide, updateProductDescriptionAndHide, getProductsWithStocks, getAllOrders, getSingleOrder, orderStatusModified, getAllReturnOrders, getSingleReturnOrder, updateReturnOrderStatus, updateProduct, getProductUpdate, deleteProduct, getUsersFeedbacks, getOffersProduct } = require('../controllers/adminControllers')
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/authenticate')
const { upload } = require('../middlewares/multer')
const router = require('express').Router()

router.route('/getallusers').get(isAuthenticateUser, authorizeRoles('admin'), getAllUsers)
router.route('/getuser/:id').get(isAuthenticateUser, authorizeRoles('admin'), getSingleUser)

//products
router.route('/products').get(isAuthenticateUser, authorizeRoles('admin'), getAllProducts)
router.route('/product/:productId').put(isAuthenticateUser, authorizeRoles('admin'), upload.array('images'), updateProduct)
router.route('/product/:productId').get(isAuthenticateUser, authorizeRoles('admin'), getProductUpdate)
router.route('/product').delete(isAuthenticateUser, authorizeRoles('admin'), deleteProduct)

//product Inventory
router.route('/productinventory/:productId').post(isAuthenticateUser, authorizeRoles('admin'), addProductInventory)
router.route('/productinventory/:productId').get(isAuthenticateUser, authorizeRoles('admin'), getProductInventory)
router.route('/productinventory/:productId').put(isAuthenticateUser, authorizeRoles('admin'), updateProductInventory)
router.route('/productinventory/:productId').delete(isAuthenticateUser, authorizeRoles('admin'), deleteProductInventory)

//product detail
router.route('/productdetail/:productId').put(isAuthenticateUser, authorizeRoles('admin'), addProductDetail)
router.route('/productdetail/:productId').get(isAuthenticateUser, authorizeRoles('admin'), getProductDetail)
router.route('/productdetail/:productId').delete(isAuthenticateUser, authorizeRoles('admin'), deleteProductDetail)

//product description
router.route('/productdescriptionandhide/:productId').get(isAuthenticateUser, authorizeRoles('admin'), getProductDescriptionAndHide)
router.route('/productdescriptionandhide/:productId').put(isAuthenticateUser, authorizeRoles('admin'), updateProductDescriptionAndHide)

//product detail
router.route('/productstocks').get(isAuthenticateUser, authorizeRoles('admin'), getProductsWithStocks)


//orders detail
router.route('/allorders').get(isAuthenticateUser, authorizeRoles('admin'), getAllOrders)
router.route('/order/:orderid').get(isAuthenticateUser, authorizeRoles('admin'), getSingleOrder)
router.route('/orderstatus/:orderid').patch(isAuthenticateUser, authorizeRoles('admin'), orderStatusModified)

router.route('/managereturn').get(isAuthenticateUser, authorizeRoles('admin'), getAllReturnOrders)
router.route('/returnorder/:orderId/:orderItemId').get(isAuthenticateUser, authorizeRoles('admin'), getSingleReturnOrder)
router.route('/returnorder/:orderId/:orderItemId').put(isAuthenticateUser, authorizeRoles('admin'), updateReturnOrderStatus)


//feedbacks
router.route('/feedbacks').get(isAuthenticateUser, authorizeRoles('admin'), getUsersFeedbacks)


//discounts
router.route('/discounts').get(isAuthenticateUser, authorizeRoles('admin'), getOffersProduct)


module.exports = router