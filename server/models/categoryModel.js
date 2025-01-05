const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter subcategory name'],
        trim: true,
        maxLength: [50, "Subcategory name cannot exceed 50 characters"],
    },
});

const childcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter child category name'],
        trim: true,
        maxLength: [50, "Child category name cannot exceed 50 characters"],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter category name'],
        trim: true,
        unique: true,
        maxLength: [50, "Category name cannot exceed 50 characters"],
    },
    subCategories: [
        {
            subCategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubCategory',
                required: true,
            },
            childCategories: [
                {
                    childCategory: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'ChildCategory',
                        required: true,

                    }
                }
            ]
        }
    ]
},{
    timestamps : true
});

const Category = mongoose.model('Category', categorySchema);
const SubCategory = mongoose.model('SubCategory', subcategorySchema);
const ChildCategory = mongoose.model('ChildCategory', childcategorySchema);

module.exports = {
    Category,
    SubCategory,
    ChildCategory
};
