const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    },
    returnProduct: [
        {
          orderItemsId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Order.orderItems',
            required: [true, 'OrderItemsId is required']
          },
          reason: {
            type: String,
          },
          status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'], 
            default: 'Pending'
          },
          requestDate: { type: Date, default: Date.now },
          resolutionDate: { type: Date },
          resolution: { type: String },
        }
      ],
    orderStatus: {
        status: {
            type: String,
            required: true,
            default: 'Processing'
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
},
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order