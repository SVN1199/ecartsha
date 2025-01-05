const { createDistancePrice, updateDistancePrice, getDistancePrice, deleteDistancePrice, createHomeUI, getHomeUI, paymentOptions, gePaymentOptions, contentOptions, getContentOptions, updateServicesAndAbout, createOffersAdvertisement, getOffersAdvertisement, deleteOffersAdvertisement, getDashBoard, updateWebsiteName, getWebsiteName, updateFooter, getFooterContent, updateFooterMedia, createFooterMedia } = require('../controllers/websiteControllers')
const { authorizeRoles, isAuthenticateUser } = require('../middlewares/authenticate')
const { homeUIUpload, OffersAdsUpload } = require('../middlewares/multer')

const router = require('express').Router()

router.route('/distanceprice').put(isAuthenticateUser, authorizeRoles('admin'), createDistancePrice)
router.route('/updatedistanceprice').put(isAuthenticateUser, authorizeRoles('admin'), updateDistancePrice)
router.route('/distanceprice').delete(isAuthenticateUser, authorizeRoles('admin'), deleteDistancePrice)

router.route('/distanceprice').get(isAuthenticateUser, getDistancePrice)

router.route('/homeimages').put(isAuthenticateUser, authorizeRoles('admin'), homeUIUpload.array('images'), createHomeUI)
router.route('/homeimages').get(getHomeUI)

router.route('/contentOptions').put(isAuthenticateUser, authorizeRoles('admin'), contentOptions)
router.route('/contentOptions').get(getContentOptions)
router.route('/servicesandabout').put(isAuthenticateUser, authorizeRoles('admin'), updateServicesAndAbout)
router.route('/servicesandabout').get(updateServicesAndAbout)
router.route('/offers').post(isAuthenticateUser, authorizeRoles('admin'), OffersAdsUpload.single('image'),createOffersAdvertisement)
router.route('/offers').delete(isAuthenticateUser, authorizeRoles('admin'),deleteOffersAdvertisement)
router.route('/offers').get(getOffersAdvertisement)
router.route('/dashboard').get(getDashBoard)
router.route('/websitename').patch(isAuthenticateUser, authorizeRoles('admin'),updateWebsiteName)
router.route('/websitename').get(getWebsiteName)
router.route('/footercontent').get(getFooterContent)
router.route('/footercontent').put(isAuthenticateUser, authorizeRoles('admin'), updateFooter)
router.route('/footermedia').put(isAuthenticateUser, authorizeRoles('admin'), createFooterMedia)


module.exports = router