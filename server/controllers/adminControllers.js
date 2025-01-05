const { default: mongoose } = require("mongoose");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { ChildCategory, Category, SubCategory } = require("../models/categoryModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const Order = require("../models/orderModel");
const UserFeedback = require("../models/userFeedbackModel");

const getAllUsers = catchAsyncError(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = req.query.search || '';

    const regex = new RegExp(searchQuery, 'i'); 

    let query = {
        role: { $ne: 'admin' },
    };

    if (mongoose.Types.ObjectId.isValid(searchQuery)) {
        query = {
            ...query,
            $or: [
                { _id: mongoose.Types.ObjectId(searchQuery) }, 
                { name: regex } 
            ]
        };
    } else {
        query = {
            ...query,
            name: regex
        };
    }

    const users = await User.find(query)
        .select('-myWishList') 
        .skip(skip)
        .limit(limit);

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
        success: true,
        data: users,
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit)
    });
});


const getSingleUser = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})



const deleteUserProfile = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new ErrorHandler(`UserId is Invalid`))
    }

    let user = await User.findById(userId).select('password')

    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`, 404))
    }

    await User.findByIdAndDelete(userId)

    res.status(200).json({
        success: true,
        message: 'User Profile has been deleted'
    })

})


const getAllProducts = catchAsyncError(async (req, res, next) => {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let searchCondition = {};

    if (search) {
        searchCondition = {
            $or: [
                { name: { $regex: search, $options: 'i' } }
            ]
        };

        searchCondition.$or = searchCondition.$or.filter(cond => Object.keys(cond).length > 0);
    }

    const totalProducts = await Product.countDocuments(searchCondition);

    const productsData = await Product.find(searchCondition)
        .select('-description -details -productInventory -returnPolicy -warranty -reviews')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

    const products = await Promise.all(
        productsData.map(async (item, index) => {
            const productObj = item.toObject();
            productObj.sino = skip + index + 1; 
            productObj.image = productObj.images[0]?.image; 

            const categoriesData = await Category.find().populate('subCategories.childCategories');
            let matchedCategory = null;
            let matchedSubCategory = null;
            let childCategoryId = null;

            categoriesData.forEach(cat => {
                cat.subCategories.forEach(sub => {
                    sub.childCategories.forEach(child => {
                        if (child.childCategory.toString() === item.category.toString()) {
                            matchedCategory = cat;
                            matchedSubCategory = sub;
                            childCategoryId = child.childCategory.toString();
                        }
                    });
                });
            });

            // Get category names
            const mainCategory = matchedCategory ? matchedCategory.name : null;
            const subCategoryId = matchedSubCategory ? matchedSubCategory.subCategory : null;
            const subcategoryName = subCategoryId ? await SubCategory.findById(subCategoryId) : null;
            const childCategoryName = childCategoryId ? await ChildCategory.findById(childCategoryId) : null;

            productObj.category = [
                mainCategory,
                subcategoryName ? subcategoryName.name : null,
                childCategoryName ? childCategoryName.name : null
            ].filter(Boolean).join(' | ');

            delete productObj.images; 

            return productObj;
        })
    );

    res.status(200).json({
        success: true,
        products,
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
    });
});


const deleteProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.query.productId;

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    if (product.category) {
        const category = await ChildCategory.findById(product.category);
        if (category) {
            category.products.pull(productId);
            await category.save();
        }
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});


const addProductInventory = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const { size, qty, price, discount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    let productData = await Product.findById(productId).select('productInventory');

    const isSizeExists = productData.productInventory.some(item => item.size === size);

    if (isSizeExists) {
        return next(new ErrorHandler('Given Size Already Exists'));
    }

    const productInventoryData = {
        size: size,
        qty: qty,
        price: price,
        discount: discount,
        finalPrice: price - (price * (discount / 100))
    };

    productData.productInventory.push(productInventoryData);

    await productData.save();

    res.status(200).json({
        success: true,
        product: productData.productInventory
    });
});


const getProductInventory = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId


    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    const productData = await Product.findById(productId)

    let productInventory = productData.productInventory

    res.status(200).json({
        success: true,
        product: productInventory
    })
})


const updateProductInventory = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const { inventoryId } = req.query;
    const { size, qty, price, discount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }


    const product = await Product.findById(productId).select('productInventory');

    const inventoryItem = product.productInventory.find(item => item.id === inventoryId);

    if (!inventoryItem) {
        return next(new ErrorHandler('Product inventory not found', 404));
    }

    if (size) inventoryItem.size = size;
    if (qty) inventoryItem.qty = qty;
    if (price) inventoryItem.price = price;
    if (discount) inventoryItem.discount = discount;

    if (inventoryItem.price && inventoryItem.discount) {
        inventoryItem.finalPrice = inventoryItem.price - (inventoryItem.price * (inventoryItem.discount / 100));
    }

    await product.save();

    res.status(200).json({
        success: true,
        product: product.productInventory
    });
});


const deleteProductInventory = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const { inventoryId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(inventoryId)) {
        return next(new ErrorHandler('Inventory ID is invalid', 400));
    }

    const product = await Product.findById(productId).select('productInventory');

    product.productInventory = product.productInventory.filter(item => item.id !== inventoryId);

    await product.save();

    res.status(200).json({
        success: true,
        product: product.productInventory
    });
});


const getProductDetail = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    let productData = await Product.findById(productId).select('details');

    res.status(200).json({
        success: true,
        product: productData.details
    });
})


const getProductUpdate = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    let productData = await Product.findById(productId).select('name images category');

    res.status(200).json({
        success: true,
        product: productData
    });
})



const addProductDetail = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId
    const { detailKey, detailValue } = req.body

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    if (!detailKey || !detailValue) {
        return next(new ErrorHandler('Key and Value are required', 400));
    }

    let productData = await Product.findById(productId).select('details');

    const isKeyExists = productData.details.some(item => item.key.toLowerCase() === detailKey.toLowerCase());

    if (isKeyExists) {
        return next(new ErrorHandler('Given Field Already Exists'));
    }

    const detailData = {
        key: detailKey,
        value: detailValue
    };

    productData.details.push(detailData);

    await productData.save();

    res.status(200).json({
        success: true,
        product: productData.details
    });
})


const deleteProductDetail = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const { detailId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(detailId)) {
        return next(new ErrorHandler('Detail Field ID is invalid', 400));
    }

    const product = await Product.findById(productId).select('details');

    product.details = product.details.filter(item => item.id !== detailId);

    await product.save();

    res.status(200).json({
        success: true,
        product: product.details
    });
});


const getProductDescriptionAndHide = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    const product = await Product.findById(productId).select('description hide')

    res.status(200).json({
        success: true,
        product
    })
})


const updateProductDescriptionAndHide = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId

    const { description, hide } = req.body

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {
            description: description,
            hide: hide
        },
        { new: true }
    ).select('description hide');

    res.status(200).json({
        success: true,
        product
    })
})


const updateProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Invalid Product ID', 400));
    }

    let product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const { name, category } = req.body;

    if (category) {
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return next(new ErrorHandler('Invalid Category ID', 400));
        }

        const newCategory = await ChildCategory.findById(category).populate('products');
        if (!newCategory) {
            return next(new ErrorHandler('Category does not exist', 404));
        }

        const currentCategory = await ChildCategory.findById(product.category);
        if (currentCategory) {
            currentCategory.products.pull(productId);
            await currentCategory.save();
        }

        newCategory.products.push(productId);
        await newCategory.save();

        product.category = category;
    }

    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map((file) => {
            const fileName = file.originalname.split(' ').join('');
            return { image: `${BASE_URL}/uploads/product/${fileName}` };
        });
    } else {
        images = product.images; // Keep existing images if no new images provided
    }

    // Update the product
    product.name = name || product.name;
    product.images = images;
    await product.save();

    // Send response
    res.status(200).json({
        success: true,
        product,
    });
});

const getProductsWithStocks = catchAsyncError(async (req, res, next) => {
    const { status, page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit; 

    const products = await Product.find()
        .select('name images productCode productColor productInventory')
        .skip(skip)
        .limit(Number(limit));

    let productInventoryList = [];
    let increment = skip; 

    products.forEach(product => {
        product.productInventory.forEach(item => {
            const itemStatus = item.qty === 0
                ? 'out of stock'
                : item.qty < 5
                    ? 'min qty avl'
                    : 'available';

            if (!status || status === 'all' || status === itemStatus) {
                productInventoryList.push({
                    sino: ++increment,
                    id: product._id,
                    name: product.name,
                    image: product.images[0].image,
                    productCode: product.productCode,
                    productColor: product.productColor,
                    size: item.size,
                    qty: item.qty,
                    status: itemStatus
                });
            }
        });
    });

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
        success: true,
        products: productInventoryList,
        totalProducts,
        page, 
        totalPages: Math.ceil(totalProducts / limit), 
        limit 
    });
});



const getAllOrders = catchAsyncError(async (req, res, next) => {
    const { orderStatus, page = 1, limit = 3 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const query = orderStatus === 'All' ? {} : { 'orderStatus.status': orderStatus };

    const totalOrders = await Order.countDocuments(query);

    const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .select('-shippingInfo -taxPrice -paymentInfo')
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const paginatedOrders = orders.map((order, index) => ({
        sino: (pageNumber - 1) * limitNumber + index + 1,
        ...order.toObject(),
        orderItems: order.orderItems.length,
    }));

    let totalPrice = 0;
    orders.forEach(order => {
        totalPrice += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalPrice,
        orders: paginatedOrders,
        orderCount: totalOrders,
        page: pageNumber,
        totalPages: Math.ceil(totalOrders / limitNumber),
    });
});



const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const orderId = req.params.orderid

    const order = await Order.findById(orderId)
        .populate('user', 'name email');


    res.status(200).json({
        success: true,
        order
    })
})


const orderStatusModified = catchAsyncError(async (req, res, next) => {
    const { orderStatus } = req.query;
    const { orderid: orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return next(new ErrorHandler('Order ID is not valid', 400));
    }

    if (!['Processing', 'Shipped', 'Out Of Delivery', 'Delivered'].includes(orderStatus)) {
        return next(new ErrorHandler('Please select a valid Order Status', 400));
    }

    const order = await Order.findByIdAndUpdate(
        orderId,
        {
            orderStatus: {
                status: orderStatus,
                updatedAt: Date.now()
            }
        },
        { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler(`Order not found with this ID: ${orderId}`, 404));
    }

    res.status(200).json({
        success: true,
        message: `Order status updated to ${orderStatus}`,
        order,
    });
});


const getAllReturnOrders = catchAsyncError(async (req, res, next) => {
    const { status, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const matchStage = status ? { "returnProduct.status": status } : {};

    const [returnOrderData, totalReturnOrders] = await Promise.all([
        Order.aggregate([
            { $unwind: '$returnProduct' },
            { $match: matchStage },
            {
                $project: {
                    orderId: '$_id',
                    orderItemsId: '$returnProduct.orderItemsId',
                    status: '$returnProduct.status',
                    _id: '$returnProduct._id',
                    requestDate: '$returnProduct.requestDate',
                },
            },
            {
                $setWindowFields: {
                    sortBy: { requestDate: 1 },
                    output: {
                        sino: { $rank: {} },
                    },
                },
            },
            { $skip: (pageNumber - 1) * limitNumber },
            { $limit: limitNumber },
        ]),
        Order.aggregate([
            { $unwind: '$returnProduct' },
            { $match: matchStage },
            { $count: "total" },
        ]),
    ]);

    const totalCount = totalReturnOrders[0]?.total || 0;

    res.status(200).json({
        success: true,
        data: returnOrderData,
        page: pageNumber,
        limit: limitNumber,
        totalReturnOrders: totalCount,
        totalPages: Math.ceil(totalCount / limitNumber),
        returnOrderCount : returnOrderData.length
    });
});




const getSingleReturnOrder = catchAsyncError(async (req, res, next) => {
    const { orderId, orderItemId } = req.params;

    const order = await Order.findById(orderId)
        .populate('user', 'name email')
        .select('returnProduct shippingPrice orderItems totalPrice user shippingInfo')
        .lean();

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    const orderItem = order.returnProduct.find(
        (item) => item.orderItemsId.toString() === orderItemId
    );

    if (!orderItem) {
        return next(new ErrorHandler('Order item not found in returnProduct', 404));
    }

    const returnProductCost = order.totalPrice - order.shippingPrice;

    const returnOrderData = {
        user: order.user,
        orderItem,
        returnProductCost,
        shippingPrice: order.shippingPrice,
        shippingInfo: order.shippingInfo,
    };

    res.status(200).json({
        success: true,
        data: returnOrderData,
    });
});


const updateReturnOrderStatus = catchAsyncError(async (req, res, next) => {
    const { orderId, orderItemId } = req.params;
    const { status } = req.query;

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
        return next(new ErrorHandler('Invalid status provided', 400));
    }

    const order = await Order.findById(orderId)
        .populate('user', 'name email')
        .select('returnProduct shippingPrice orderItems totalPrice user shippingInfo');

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    const orderItem = order.returnProduct.find(
        (item) => item.orderItemsId.toString() === orderItemId
    );

    if (!orderItem) {
        return next(new ErrorHandler('Order item not found in returnProduct', 404));
    }

    orderItem.status = status;

    await order.save();

    const returnProductCost = order.totalPrice - order.shippingPrice;

    const returnOrderData = {
        user: order.user,
        orderItem,
        returnProductCost,
        shippingPrice: order.shippingPrice,
        shippingInfo: order.shippingInfo,
    };

    res.status(200).json({
        success: true,
        data: returnOrderData,
    });
});

const getUsersFeedbacks = catchAsyncError(async (req, res, next) => {
    const { search = '', page = 1, limit = 10 } = req.query;

    const searchFilter = search
        ? { message: { $regex: search, $options: 'i' } }
        : {};

    const skip = (page - 1) * limit;

    const totalFeedbacks = await UserFeedback.countDocuments(searchFilter);

    const userFeedbacks = await UserFeedback.find(searchFilter)
        .populate('user', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    res.status(200).json({
        success: true,
        total: totalFeedbacks,
        currentPage: Number(page),
        totalPages: Math.ceil(totalFeedbacks / limit),
        data: userFeedbacks,
    });
});


const getOffersProduct = catchAsyncError(async (req, res, next) => {
    const { page = 1, limit = 1, minDiscount = 0, maxDiscount = 100 } = req.query;

    const products = await Product.find()
        .select('name productInventory images category productCode productColor')
        .populate('category', 'name');

    const productsData = products.flatMap(product =>
        product.productInventory.map(item => ({
            productId: product._id,
            name: product.name,
            productCode: product.productCode,
            color: product.productColor,
            category: product.category.name,
            image: product.images?.[0]?.image || '',
            size: item.size,
            price: item.price,
            discount: item.discount || 0,
            finalPrice: item.finalPrice || 0
        }))
    );

    const uniqueOffersMap = new Map();

    for (const item of productsData) {
        if (item.discount >= minDiscount && item.discount <= maxDiscount) { 
            const existing = uniqueOffersMap.get(item.productId);

            if (!existing || item.discount > existing.discount) {
                uniqueOffersMap.set(item.productId, item);
            }
        }
    }

    const offersData = Array.from(uniqueOffersMap.values())
        .sort((a, b) => b.discount - a.discount);

    const totalOffers = offersData.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedOffers = offersData.slice(startIndex, endIndex);

    res.status(200).json({
        success: true,
        totalOffers,
        totalPages: Math.ceil(totalOffers / limit),
        currentPage: parseInt(page),
        data: paginatedOffers,
    });
});


module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUserProfile,
    getAllProducts,
    addProductInventory,
    getProductInventory,
    updateProductInventory,
    deleteProductInventory,
    getProductDetail,
    addProductDetail,
    deleteProductDetail,
    getProductDescriptionAndHide,
    updateProductDescriptionAndHide,
    updateProduct,
    getProductsWithStocks,
    getAllOrders,
    orderStatusModified,
    getSingleOrder,
    getAllReturnOrders,
    getSingleReturnOrder,
    updateReturnOrderStatus,
    getProductUpdate,
    deleteProduct,
    getUsersFeedbacks,
    getOffersProduct
}