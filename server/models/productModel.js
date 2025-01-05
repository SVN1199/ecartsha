const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true,
        maxLength: [120, "Product name cannot exceed more 120 characters"]
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description']
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    details: [
        {
            key: { type: String, required: true },
            value: { type: String, required: true }
        }
    ],
    price: {
        type: Number,
        default: 0.0
    },
    ratings: {
        type: Number,
        default: 0
    },
    noOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            reviewedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    warranty: {
        available: {
            type: Boolean,
            default: true
        },
        expires: { 
            type: Number,
            default  : 0
        }
    },
    returnPolicy: {
        available: {
            type: Boolean,
            default: true
        },
        expires: { 
            type: Number,
            default  : 0
        }
    },
    shippingFrom: {
        placeName: {
            type: String
        },
        location: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        }
    },
    hide: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        discriminatorKey: 'productType',
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema)
module.exports = Product