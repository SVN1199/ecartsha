const { default: mongoose } = require("mongoose");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const updateStocks = async (productId, productSize, productQty) => {
    const product = await Product.findById(productId);

    product.productInventory.forEach(inventory => {
        if (inventory.size === productSize) {
            inventory.qty -= productQty;
        }
    });

    await product.save({ validateBeforeSave: false });
};


const newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    });

    await Promise.all(orderItems.map(async orderItem => {
        const { product, size, quantity } = orderItem;
        await updateStocks(product, size, quantity);
    }));

    res.status(201).json({
        success: true,
        order
    });
});


const getSingleOrder  =  catchAsyncError(async(req, res, next) => {

    const orderId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return next(new ErrorHandler('order Id is not valid', 400));
    }

    const order = await Order.findById(orderId).populate(
            {select : 'user', path : 'name email'},
            {select : 'product', path : 'returnPolicy'}
    )

    if(!order){
        return next(new ErrorHandler(`Order not found with this id : ${orderId}`))
    }

    res.status(200).json({
        success : true,
        order
    })
})




const getMyOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
        .select('orderItems orderStatus')
        .populate({
            path: 'orderItems.product',
            select: '_id productColor', 
        })
        .sort({ createdAt: -1 });

    const userOrders = orders.flatMap(order =>
        order.orderItems.map(item => ({
            ...item._doc,
            orderId : order._id,
            color: item.product?.productColor || null,
            orderStatus: order.orderStatus  
        }))
    );

    
    res.status(200).json({
        success: true,
        userOrders
    });
});

const getSingleProductOrder = catchAsyncError(async (req, res, next) => {
    const { orderId, singleOrderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return next(new ErrorHandler('Order ID is not valid', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(singleOrderId)) {
        return next(new ErrorHandler('Order Item ID is not valid', 400));
    }

    const order = await Order.findOne({ user: req.user.id, _id: orderId })
        .populate({
            path: 'user',
            select: 'name email',
        })
        .populate({
            path: 'orderItems.product',
            select: 'returnPolicy',
        });

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    const singleOrderItem = order.orderItems.find(
        item => item._id.toString() === singleOrderId
    );

    if (!singleOrderItem) {
        return next(new ErrorHandler('Order Item not found', 404));
    }

    const singleOrder = {
        orderId: order._id,
        user: {
            userId: order.user._id,
            name: order.user.name,
            email: order.user.email,
        },
        shippingInfo: order.shippingInfo,
        shippingPrice: order.shippingPrice,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        paymentInfo: {
            payInfoId: order.paymentInfo?.id,
            payInfoStatus: order.paymentInfo?.status,
            paidAt: order.paidAt,
        },
        createdAt: order.createdAt,
        singleOrderItem: singleOrderItem.toObject(), 
    };

    res.status(200).json({
        success: true,
        singleOrder,
    });
});


const returnOrder = catchAsyncError(async (req, res, next) => {
    const { orderId, orderItemId } = req.query;
    const { reason } = req.body;

    const order = await Order.findById(orderId);
    
    const orderItemExists = order.returnProduct.some(
        (item) => item.orderItemsId.toString() === orderItemId
    );

    if (orderItemExists) {
        return next(new ErrorHandler('Item return process already initiated', 400));
    }
    
    order.returnProduct.push({
        orderItemsId: orderItemId,
        reason: reason || "No reason provided",
    });

    await order.save(); 

    res.status(200).json({
        success: true,
        message: "Return request added successfully.",
        data: order.returnProduct,
    });
});


const getReturnOrderStatus = catchAsyncError(async(req, res, next) => {
    const { orderId, orderItemId } = req.query;

    const order = await Order.findById(orderId);
    
    const orderItem = order.returnProduct.find(
        (item) => item.orderItemsId.toString() === orderItemId
    );

    res.status(200).json({
        success : true,
        data : orderItem
    })
})

const cancelReturnOrder = catchAsyncError(async (req, res, next) => {
    const { orderId, orderItemId } = req.query;

    const order = await Order.findById(orderId);

    const orderItem = order.returnProduct.find(
        (item) => item.orderItemsId.toString() === orderItemId
    );

    orderItem.status = "Cancelled";
    orderItem.resolutionDate = new Date();
    
    await order.save();

    res.status(200).json({
        success: true,
        data: orderItem,
    });
});


module.exports = {
    newOrder,
    getSingleOrder,
    getMyOrders,
    getSingleProductOrder,
    returnOrder,
    getReturnOrderStatus,
    cancelReturnOrder
}