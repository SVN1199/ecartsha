const { createMainCategory, getCategory, updateCategory, deleteCategory, createSubCategory, createChildCategory, getCategoryForCreateProduct, updateSubCategory, updateChildCategory, deleteSubCategory, deleteChildCategory, getAvailableCategory, getProductsByMainCategory } = require('../controllers/categoryControllers')
const { authorizeRoles, isAuthenticateUser } = require('../middlewares/authenticate')

const router = require('express').Router()

router.route('/createmaincategory').post(isAuthenticateUser, authorizeRoles('admin'), createMainCategory)
router.route('/createsubcategory').post(isAuthenticateUser, authorizeRoles('admin'), createSubCategory)
router.route('/createchildcategory').post(isAuthenticateUser, authorizeRoles('admin'), createChildCategory)
router.route('/getallcategory').get(getCategory)

router.route('/').patch(isAuthenticateUser, authorizeRoles('admin'), updateCategory)
router.route('/subcategory').patch(isAuthenticateUser, authorizeRoles('admin'), updateSubCategory)
router.route('/childcategory').patch(isAuthenticateUser, authorizeRoles('admin'), updateChildCategory)
router.route('/').delete(isAuthenticateUser, authorizeRoles('admin'), deleteCategory)
router.route('/subcategory').delete(isAuthenticateUser, authorizeRoles('admin'), deleteSubCategory)
router.route('/childcategory').delete(isAuthenticateUser, authorizeRoles('admin'), deleteChildCategory)

router.route('/categoryforcreateproduct').get(isAuthenticateUser, authorizeRoles('admin'), getCategoryForCreateProduct)


router.route('/homecategory').get(getAvailableCategory)


module.exports = router