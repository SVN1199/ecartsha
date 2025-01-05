const router = require('express').Router()
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/authenticate')
const { newProduct, getSingleProducts, getProducts, updateProduct, createReview, addMultipleProduct, viewedProducts, deleteProductInventory, updateProductFields, updateProductPolicies, updateProductDetails, searchProducts, getProductByCategory, getCartProducts, getAllReviews, getProductsName, pushAddToWishList, getWishList, pullRemoveFromWishList, getOffersProduct, getProductsByMainCategory } = require('../controllers/productControllers')
const { upload, fileUpload } = require('../middlewares/multer')


router.route('/').get(getProducts)
router.route('/viewedproducts').get(viewedProducts)
router.route('/searchproducts').get(searchProducts)
router.route('/categoryproducts/:categoryId').get(getProductByCategory)
router.route('/:productName/:productCode/:productId').get(getSingleProducts)
router.route('/reviews/:productId').get(getAllReviews)
router.route('/:id').put(isAuthenticateUser, createReview)
router.route('/searchname').get(getProductsName)


router.route('/getcartproducts').get(isAuthenticateUser, getCartProducts)
router.route('/createreview/:productId').put(isAuthenticateUser, createReview)

router.route('/addmultiproduct').post(isAuthenticateUser, authorizeRoles('admin'), fileUpload.single('file'), addMultipleProduct)
router.route('/').post(isAuthenticateUser, authorizeRoles('admin'), upload.array('images'), newProduct)
router.route('/:id').put(isAuthenticateUser, authorizeRoles('admin'), upload.array('images'), updateProduct)

router.route('/deleteinventory/:productId').delete(isAuthenticateUser, authorizeRoles('admin'), deleteProductInventory)
router.route('/updateproductfields/:productId').put(isAuthenticateUser, authorizeRoles('admin'), updateProductFields)
router.route('/updateproductpolicies/:productId').put(isAuthenticateUser, authorizeRoles('admin'), updateProductPolicies)
router.route('/updateproductdetails/:productId').put(isAuthenticateUser, authorizeRoles('admin'), updateProductDetails)



router.route('/userfeatures/addtowishlist').get(isAuthenticateUser, getWishList)
router.route('/userfeatures/addtowishlist').put(isAuthenticateUser, pushAddToWishList)
router.route('/userfeatures/removefromwishlist').put(isAuthenticateUser, pullRemoveFromWishList)


router.route('/offers').get(getOffersProduct)


router.route('/productsbycategory/:categoryId').get(isAuthenticateUser, getProductsByMainCategory)

module.exports = router