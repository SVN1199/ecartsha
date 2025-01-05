const catchAsyncError = require("../middlewares/catchAsyncError");
const { Category, SubCategory, ChildCategory } = require('../models/categoryModel');
const ErrorHandler = require("../utils/errorHandler");
const Product = require('../models/productModel');
const { default: mongoose } = require("mongoose");

const createMainCategory = catchAsyncError(async (req, res, next) => {
    const { categoryname } = req.body

    const normalizedCategoryName = categoryname.toLowerCase()

    const categoryExists = await Category.findOne({ name: normalizedCategoryName })

    if (categoryExists) {
        return next(new ErrorHandler('Category Already Exists', 400))
    }

    const category = await Category.create({
        name: normalizedCategoryName
    })

    res.status(201).json({
        success: true,
        category
    })

})

const createSubCategory = catchAsyncError(async (req, res, next) => {
    const { subcategoryname, categoryId } = req.body;

    if (!subcategoryname || !categoryId) {
        return next(new ErrorHandler('Both subcategory name and category ID are required', 400));
    }

    const normalizedCategoryName = subcategoryname.trim().toLowerCase();

    // Find category and populate subCategories if they are references
    const category = await Category.findById(categoryId).populate('subCategories.subCategory');

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    const subCategoryExists = category.subCategories.some(
        (item) => item.subCategory && item.subCategory.name &&
            item.subCategory.name.toLowerCase() === normalizedCategoryName
    );

    if (subCategoryExists) {
        return next(new ErrorHandler('Subcategory already exists within this category', 400));
    }

    const subcategory = await SubCategory.create({
        name: normalizedCategoryName,
    });

    category.subCategories.push({ subCategory: subcategory._id });
    await category.save();

    res.status(201).json({
        success: true,
        subcategory
    });
});


const createChildCategory = catchAsyncError(async (req, res, next) => {
    const { childcategoryname, subCategoryId, categoryId } = req.body;

    // Validate input
    if (!childcategoryname || !subCategoryId || !categoryId) {
        return next(new ErrorHandler('Child category name, subcategory ID, and category ID are required', 400));
    }

    const normalizedChildCategoryName = childcategoryname.trim().toLowerCase();

    // Find the main category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    // Find the subcategory within the category
    const subcategory = category.subCategories.find(sub => sub.subCategory.toString() === subCategoryId);
    if (!subcategory) {
        return next(new ErrorHandler('Subcategory not found', 404));
    }

    // Check if the child category already exists within the subcategory
    const childCategories = await Promise.all(
        subcategory.childCategories.map(item => ChildCategory.findById(item.childCategory))
    );

    const childCategoryExists = childCategories.some(item => item && item.name.toLowerCase() === normalizedChildCategoryName);

    if (childCategoryExists) {
        return next(new ErrorHandler('Child category already exists', 400));
    }

    // Create the new child category
    const newChildCategory = await ChildCategory.create({
        name: normalizedChildCategoryName,
    });

    // Add the new child category to the subcategory and save the category
    subcategory.childCategories.push({ childCategory: newChildCategory._id });
    await category.save(); // Save the parent category (which includes the updated subcategory)

    res.status(200).json({
        success: true,
        subcategory
    });
});



const getCategory = catchAsyncError(async (req, res, next) => {
    const category = await Category.find()
        .populate({
            path: 'subCategories.subCategory',
            select: 'name'
        })
        .populate({
            path: 'subCategories.childCategories.childCategory',
            select: 'name'
        })

    let price = await Product.find();

    const producePrice = {
        min: Number.MAX_VALUE,
        max: Number.MIN_VALUE
    };

    price.forEach(item => {
        if (item.price < producePrice.min) {
            producePrice.min = item.price;
        }
        if (item.price > producePrice.max) {
            producePrice.max = item.price;
        }
    });

    const minPrice = Math.ceil(producePrice.min);
    const maxPrice = Math.ceil(producePrice.max);


    res.status(200).json({
        success: true,
        category,
        price: { minPrice, maxPrice }
    });
});

const getSubCategory = catchAsyncError(async (req, res, next) => {
    const category = await SubCategory.find()

    res.status(200).json({
        success: true,
        category
    })
})

const getChildCategory = catchAsyncError(async (req, res, next) => {
    const category = await ChildCategory.find()

    res.status(200).json({
        success: true,
        category
    })
})


const updateCategory = catchAsyncError(async (req, res, next) => {
    const { categoryId, categoryname } = req.body

    const category = await Category.findByIdAndUpdate(categoryId, { name: categoryname }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });


    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        category
    });
})

const updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { subCategoryId, subcategoryname } = req.body

    const subCategory = await SubCategory.findByIdAndUpdate(subCategoryId, { name: subcategoryname }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!subCategory) {
        return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        subCategory
    });
})

const updateChildCategory = catchAsyncError(async (req, res, next) => {
    const { childCategoryId, childcategoryname } = req.body

    const childCategory = await ChildCategory.findByIdAndUpdate(childCategoryId, { name: childcategoryname }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!childCategory) {
        return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        childCategory
    });
})



const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { categoryId } = req.body;

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    });
})


const deleteSubCategory = catchAsyncError(async (req, res, next) => {
    const { categoryId } = req.body;

    const category = await SubCategory.findByIdAndDelete(categoryId);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    });
})

const deleteChildCategory = catchAsyncError(async (req, res, next) => {
    const { categoryId } = req.body;

    const category = await ChildCategory.findByIdAndDelete(categoryId);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    });
})



const getCategoryForCreateProduct = catchAsyncError(async (req, res, next) => {
    const categoriesList = [];

    const mainCategories = await Category.find().populate({
        path: 'subCategories.subCategory',
        select: 'name'
    }).populate({
        path: 'subCategories.childCategories.childCategory',
        select: 'name'
    }).select('name subCategories');

    mainCategories.forEach(mainCat => {
        mainCat.subCategories.forEach(subCat => {
            const subCatName = subCat.subCategory.name;

            if (subCat.childCategories && subCat.childCategories.length > 0) {
                subCat.childCategories.forEach(child => {
                    const childCatName = child.childCategory.name;
                    const childCatId = child.childCategory._id;

                    categoriesList.push({
                        categoryId: childCatId,
                        categoryName: `${mainCat.name} | ${subCatName} | ${childCatName}`
                    });
                });
            } else {
                categoriesList.push({
                    "no-child-category": `${mainCat.name}-${subCatName}`
                });
            }
        });
    });

    res.status(200).json({
        success: true,
        categories: categoriesList
    });
});



const getAvailableCategory = catchAsyncError(async (req, res, next) => {
    const categories = await Category.find()
        .populate('subCategories.subCategory', 'name')
        .populate('subCategories.childCategories.childCategory', 'name')
        .populate({
            path: 'subCategories.childCategories.childCategory',
            select: 'name',
            populate: {
                path: 'products',
                select: 'images',
            },
        });

    const categoryList = categories.map((cat) => {
        const categoryId = cat._id;
        const categoryName = cat.name;
        const subCatList = cat.subCategories.map((subCat) => {
            const subCatName = subCat.subCategory?.name || '';
            const subCatImg = 
                subCat.childCategories[0]?.childCategory?.products[0]?.images[0]?.image || '';
            return {
                subCatName,
                subCatImg,
            };
        });

        return {
            categoryId,
            categoryName,
            subCatList,
        };
    });

    res.status(200).json({
        success: true,
        data: categoryList,
    });
});



module.exports = {
    createMainCategory,
    createSubCategory,
    createChildCategory,
    getCategory,
    getSubCategory,
    getChildCategory,
    updateCategory,
    updateSubCategory,
    updateChildCategory,
    deleteCategory,
    deleteSubCategory,
    deleteChildCategory,
    getCategoryForCreateProduct,
    getAvailableCategory,
}