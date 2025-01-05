const mongoose = require('mongoose');
const Product = require('./productModel');

const garmentsSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChildCategory',
        required: [true, 'Please select product category']
    },
    productInventory: [
        {
            size: { type: String, required: true },
            qty: { type: Number, required: true , default : 0},
            price: { type: Number, required: true, default : 0.0},
            discount: { type: Number, required: true , default : 0.0},
            gst: { type: Number, required: true , default : 0.0},
            finalPrice: { type: Number, required: true, default : 0.0 }
        }
    ]
});

const Garments = Product.discriminator('Garments', garmentsSchema);
module.exports = Garments;