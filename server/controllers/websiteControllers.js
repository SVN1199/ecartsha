const catchAsyncError = require("../middlewares/catchAsyncError");
const { Category } = require("../models/categoryModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Website = require("../models/websiteModel");
const ErrorHandler = require("../utils/errorHandler");

const createDistancePrice = catchAsyncError(async (req, res, next) => {
    const { distanceStart, distanceEnd, distancePrice } = req.body;

    const deliveryChargeDist = {
        distanceStart,
        distanceEnd,
        distancePrice
    };

    const updatedWebsite = await Website.findOneAndUpdate(
        {},
        { $push: { deliveryChargeDist } },
        { new: true, upsert: true }
    );

    if (!updatedWebsite) {
        return next(new ErrorHandler("Failed to update delivery charge distances.", 400))
    }

    res.status(200).json({
        success: true,
        data: updatedWebsite.deliveryChargeDist
    });
});

const updateDistancePrice = catchAsyncError(async (req, res, next) => {
    const { distanceStart, distanceEnd, distancePrice } = req.body;
    const { distancePriceId } = req.query

    const updatedWebsite = await Website.findOneAndUpdate(
        { "deliveryChargeDist._id": distancePriceId },
        {
            $set: {
                "deliveryChargeDist.$.distanceStart": distanceStart,
                "deliveryChargeDist.$.distanceEnd": distanceEnd,
                "deliveryChargeDist.$.distancePrice": distancePrice
            }
        },
        { new: true }
    );

    if (!updatedWebsite) {
        return next(new ErrorHandler("Distance price entry not found.", 404));
    }

    res.status(200).json({
        success: true,
        data: updatedWebsite.deliveryChargeDist
    });
});


const getDistancePrice = catchAsyncError(async (req, res, next) => {
    const distancePrice = await Website.findOne().select('deliveryChargeDist')

    res.status(200).json({
        success: true,
        data: distancePrice.deliveryChargeDist
    })

})

const deleteDistancePrice = catchAsyncError(async (req, res, next) => {
    const { distancePriceId } = req.query;

    const updatedWebsite = await Website.findOneAndUpdate(
        { "deliveryChargeDist._id": distancePriceId },
        { $pull: { deliveryChargeDist: { _id: distancePriceId } } },
        { new: true }
    );

    res.status(200).json({
        success: true,
        data: updatedWebsite.deliveryChargeDist
    });
});


const createHomeUI = catchAsyncError(async (req, res, next) => {
    let BASE_URL = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;

    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map((file) => ({
            image: `${BASE_URL}/uploads/homeui/${file.originalname}`,
        }));
    }

    if (images.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No images provided to update homeUI.",
        });
    }

    let website = await Website.findOne();
    if (!website) {
        website = new Website();
    }

    website.homeUI = images;

    await website.save();

    res.status(200).json({
        success: true,
        message: "Home UI images updated successfully.",
        homeUI: website.homeUI,
    });
});

const getHomeUI = catchAsyncError(async (req, res, next) => {

    let website = await Website.findOne().select('homeUI');

    res.status(200).json({
        success: true,
        homeUI: website.homeUI,
    });
});


const contentOptions = catchAsyncError(async (req, res, next) => {
    const { codOptionEnable, offersEnable, categoryEnable, offersAdEnable } = req.query;

    if (
        codOptionEnable === undefined &&
        offersEnable === undefined &&
        categoryEnable === undefined &&
        offersAdEnable === undefined
    ) {
        return next(new ErrorHandler('No valid toggle parameters provided', 400));
    }

    const website = await Website.findOne();
    if (!website) {
        return next(new ErrorHandler('Website configuration not found', 404));
    }

    if (codOptionEnable !== undefined) {
        website.contentDisplay.codOptionDisplay = codOptionEnable === 'true';
    }
    if (offersEnable !== undefined) {
        website.contentDisplay.offers = offersEnable === 'true';
    }
    if (categoryEnable !== undefined) {
        website.contentDisplay.category = categoryEnable === 'true';
    }
    if (offersAdEnable !== undefined) {
        website.contentDisplay.offersAd = offersAdEnable === 'true';
    }

    await website.save();

    res.status(200).json({
        success: true,
        data: website.contentDisplay
    });
});


const getContentOptions = catchAsyncError(async (req, res, next) => {

    const website = await Website.findOne().select('contentDisplay');

    if (!website) {
        return next(new ErrorHandler('Website configuration not found', 404));
    }

    res.status(200).json({
        success: true,
        data: website.contentDisplay,
    });
});


const updateServicesAndAbout = catchAsyncError(async (req, res, next) => {
    const { services, about } = req.body;

    const website = await Website.findOneAndUpdate(
        {},
        {
            $set: {
                'homePageContent.services': services,
                'homePageContent.about': about,
            }
        },
        { new: true }
    );

    const data = { services: website.homePageContent.services, about: website.homePageContent.about }

    res.status(200).json({
        success: true,
        data
    });
});


const getServicesAndAbout = catchAsyncError(async (req, res, next) => {
    const website = await Website.findOne().select('homePageContent');

    const data = { services: website.homePageContent.services, about: website.homePageContent.about }

    res.status(200).json({
        success: true,
        data
    });
});

const updateFooter = catchAsyncError(async (req, res, next) => {
    const { address, contact, copyright } = req.body;

    let website = await Website.findOne().select('homePageContent.footerContent');

    if (website && website?.homePageContent?.footerContent) {
        website = await Website.findOneAndUpdate(
            {},
            { 'homePageContent.footerContent': { address, contact, copyright } },
            {
                new: true,
                runValidators: true,
            }
        );
    } else {
        website = await Website.create({
            homePageContent: {
                footerContent: { address, contact, copyright },
            },
        });
    }

    res.status(200).json({
        success: true,
        data: website.homePageContent.footerContent,
    });
});


const createFooterMedia = catchAsyncError(async (req, res, next) => {
    const mediaId = req.query.id;
    const { icon, name, link } = req.body;

    let website = await Website.findOne().select('homePageContent.footerContent');

    if (website && website.homePageContent?.footerContent?.mediasurl) {
        let updatedMediasUrl;
        const mediaExists = website.homePageContent.footerContent.mediasurl.some(
            (media) => media._id?.toString() === mediaId
        );

        if (mediaExists) {
            updatedMediasUrl = website.homePageContent.footerContent.mediasurl.map((media) =>
                media._id.toString() === mediaId
                    ? { _id: media._id, icon, name, link }
                    : media 
            );
        } else {
            updatedMediasUrl = [
                ...website.homePageContent.footerContent.mediasurl,
                { icon, name, link },
            ];
        }

        website = await Website.findOneAndUpdate(
            {},
            { 'homePageContent.footerContent.mediasurl': updatedMediasUrl },
            {
                new: true,
                runValidators: true,
            }
        );
    } else {
        website = await Website.findOneAndUpdate(
            {},
            {
                'homePageContent.footerContent.mediasurl': [{ icon, name, link }],
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );
    }

    res.status(200).json({
        success: true,
        data: website.homePageContent.footerContent,
    });
});


const getFooterContent = catchAsyncError(async(req, res, next) => {
    const website = await Website.findOne().select('homePageContent.footerContent');

    res.status(200).json({
        success : true,
        data : website.homePageContent.footerContent
    })
})

const createOffersAdvertisement = catchAsyncError(async (req, res, next) => {
    const { heading, description } = req.body;

    let BASE_URL = process.env.BACKEND_URL
    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    if (req.file) {
        image = `${BASE_URL}/uploads/offers/${req.file.filename}`;
    }

    const newOffer = {
        heading,
        description,
        image,
    };

    let website = await Website.findOne();

    website.offers.push(newOffer);

    await website.save();

    res.status(201).json({
        success: true,
        data: website.offers,
    });
});


const getOffersAdvertisement = catchAsyncError(async (req, res, next) => {
    const website = await Website.findOne().select('offers')

    res.status(200).json({
        success: true,
        data: website.offers
    })
})


const deleteOffersAdvertisement = catchAsyncError(async (req, res, next) => {
    const offerAdsId = req.query.id;

    const website = await Website.findOne().select('offers');

    website.offers = website.offers.filter(offer => offer._id.toString() !== offerAdsId);

    await website.save();

    res.status(200).json({
        success: true,
        data: { name: website.offers }
    });
});


const updateWebsiteName = catchAsyncError(async (req, res, next) => {
    const { name } = req.body;

    const website = await Website.findOneAndUpdate(
        {},
        { websiteName: name },
        { new: true }
    );
    res.status(200).json({
        success: true,
        data: { name: website.websiteName }
    });
});


const getWebsiteName = catchAsyncError(async (req, res, next) => {
    const website = await Website.findOne().select('websiteName');

    res.status(200).json({
        success: true,
        data: { name: website.websiteName }
    });
});


const getDashBoard = catchAsyncError(async (req, res, next) => {
    const { year, month, week } = req.query;

    const calculateDateRange = ({ year, month, week }) => {
        let start, end;

        if (year) {
            const yearNumber = parseInt(year, 10);
            start = new Date(yearNumber, 0, 1);
            end = new Date(yearNumber, 11, 31, 23, 59, 59, 999);
        }

        if (year && month) {
            const monthNumber = parseInt(month, 10) - 1;
            start = new Date(year, monthNumber, 1);
            end = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);
        }

        if (year && month && week) {
            const monthNumber = parseInt(month, 10) - 1;
            const firstDayOfMonth = new Date(year, monthNumber, 1);

            const weekStart = new Date(firstDayOfMonth);
            weekStart.setDate(weekStart.getDate() + (week - 1) * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);

            start = weekStart >= firstDayOfMonth ? weekStart : firstDayOfMonth;
            end = weekEnd <= new Date(year, monthNumber + 1, 0, 23, 59, 59, 999) ? weekEnd : new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);
        }

        return { start, end };
    };

    const filter = calculateDateRange({ year, month, week });

    const dateFilter = filter.start && filter.end ? { createdAt: { $gte: filter.start, $lte: filter.end } } : {};

    const products = await Product.find(dateFilter).countDocuments();
    const categories = await Category.find(dateFilter).countDocuments();
    const orders = await Order.find(dateFilter);
    const users = await User.find(dateFilter).countDocuments();

    const orderDelivered = orders.filter(order =>
        order.orderStatus.status === 'Delivered' &&
        order.orderStatus.updatedAt >= filter.start &&
        order.orderStatus.updatedAt <= filter.end
    ).length;

    const ordersReceived = orders.filter(order => order.orderStatus === 'Processing').length;
    const ordersReturnRequest = orders.filter(order =>
        order.returnProduct.some(status => status === 'Pending')
    ).length;

    res.status(200).json({
        success: true,
        data: {
            products,
            categories,
            orders: orders.length,
            ordersReceived,
            users,
            ordersReturnRequest,
            orderDelivered
        },
    });
});


module.exports = {
    createDistancePrice,
    updateDistancePrice,
    getDistancePrice,
    deleteDistancePrice,
    createHomeUI,
    getHomeUI,
    contentOptions,
    getContentOptions,
    updateServicesAndAbout,
    getServicesAndAbout,
    createOffersAdvertisement,
    getOffersAdvertisement,
    deleteOffersAdvertisement,
    getDashBoard,
    updateWebsiteName,
    getWebsiteName,
    updateFooter,
    getFooterContent,
    createFooterMedia
}