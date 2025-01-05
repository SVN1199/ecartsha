const mongoose = require("mongoose");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Category, ChildCategory, SubCategory } = require("../models/categoryModel");
const Garments = require("../models/garmentsModel");
const Product = require("../models/productModel");
const User = require('../models/userModel')
const ErrorHandler = require("../utils/errorHandler");
const xlsx = require('xlsx')

const newProduct = catchAsyncError(async (req, res, next) => {
    let inventory = [];
    let productDetails = [];

    const {
        name,
        description,
        category,
        productCode,
        productColor,
        details,
        productInventory,
        shippingFrom, 
        warrantyExpires,
        warrantyAvailable,
        returnPolicyExpires,
        returnPolicyAvailable,
        hide,
    } = req.body;

    productInventory.split('|').map(item => {
        const [size, qty, price, discount, gst] = item.trim().split('-');
        const priceNum = parseFloat(price);
        const discountNum = parseFloat(discount);
        const gstNum = parseFloat(gst);
        const qtyNum = parseInt(qty, 10);
        const discountedPrice = priceNum - (priceNum * (discountNum / 100));
        const finalPrice = discountedPrice + (discountedPrice * (gstNum / 100));
        inventory.push({ size, qtyNum, price, discount, gst, finalPrice });
    });

    const maximumPrice = inventory.length > 0
        ? Math.max(...inventory.map(item => item.finalPrice)).toFixed(2)
        : 0;

    details.split(',').map(item => {
        const [key, value] = item.trim().split('-');
        productDetails.push({ key: key, value: value });
    });

    const [city, lat, long] = shippingFrom.split(',')

    const shippingFromData = {
        placeName: city,
        location: {
            latitude: lat,
            longitude: long
        }
    }

    const categoryId = category;
    const categoryExists = await ChildCategory.findById(categoryId);
    if (!categoryExists) {
        return next(new ErrorHandler('Category does not exist', 404));
    }

    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    let images = [];
    if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
            const fileName = file.originalname;
            const url = `${BASE_URL}/uploads/product/${fileName}`;
            images.push({ image: url });
        });
    }

    let product = await Garments.create({
        name,
        description,
        images,
        category: categoryId,
        productCode,
        productColor,
        details: productDetails,
        price: maximumPrice,
        productInventory: inventory,
        shippingFrom: shippingFromData,
        warranty: {
            available: warrantyAvailable,
            expires: warrantyExpires,
        },
        returnPolicy: {
            available: returnPolicyAvailable,
            expires: returnPolicyExpires,
        },
        hide,
        user: req.user.id,
    });

    categoryExists.products.push(product._id);
    await categoryExists.save();

    res.status(201).json({
        success: true,
        product,
    });
});

const addMultipleProduct = catchAsyncError(async (req, res, next) => {
    const checkFormat = /^[A-Z]+-\d{2,3}-\d{2,3}-\d{2}-\d{2}$/;
    const checkImageFormat = /\.(jpg|jpeg|png)$/i;

    if (!req.file || !req.file.path) {
        throw new ErrorHandler('File path is missing', 400);
    }

    const filePath = req.file.path;

    const workBook = xlsx.readFile(filePath);
    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);


    const userId = req.user.id;

    const productData = await Promise.all(data.map(async (item) => {
        const {
            name, description, productCode, productColor, shippingFrom, warrantyAvailable, warrantyExpires,
            returnPolicyAvailable, returnPolicyExpires, productInventory, images, productDetails, category
        } = item;

        if (!name || !description || !productCode || !productColor || !warrantyExpires || !returnPolicyExpires) {
            throw new ErrorHandler("All required fields must be provided", 400);
        }

        const code = productCode
        const color = productColor.trim()

        const [categoryName, subCategoryName, childCategoryName] = category.split('|').map(c => c.trim().toLowerCase());

        const categoryNameCheck = await Category.findOne({ name: categoryName });
        const subCategoryNameCheck = await SubCategory.findOne({ name: subCategoryName });
        const childCategoryNameCheck = await ChildCategory.findOne({ name: childCategoryName });

        if (!categoryNameCheck || !subCategoryNameCheck || !childCategoryNameCheck) {
            throw new ErrorHandler('Category hierarchy not found', 404);
        }

        const childCategoryId = childCategoryNameCheck._id;

        const inventoryData = productInventory.split('|').map(product => {
            product = product.trim().replace(/\s+/g, '');

            if (!checkFormat.test(product)) {
                throw new ErrorHandler(`Invalid product format: ${product}`, 400);
            }

            const [size, qty, price, discount, gst] = product.split('-').map(value => value.trim());

            const priceNum = parseFloat(price);
            const discountNum = parseFloat(discount);
            const gstNum = parseFloat(gst);
            const qtyNum = parseInt(qty, 10);

            if (isNaN(priceNum) || isNaN(discountNum) || isNaN(gstNum) || isNaN(qtyNum)) {
                throw new ErrorHandler(`Invalid numerical values in product inventory: ${product}`, 400);
            }

            if (priceNum < 0 || discountNum < 0 || gstNum < 0 || qtyNum < 0 || discountNum > 100 || gstNum > 100) {
                throw new ErrorHandler(`Invalid range for values in product inventory: ${product}`, 400);
            }

            const discountedPrice = priceNum - (priceNum * (discountNum / 100));
            const finalPrice = discountedPrice + (discountedPrice * (gstNum / 100));

            return {
                size,
                qty: qtyNum,
                price: priceNum,
                discount: discountNum,
                gst: gstNum,
                finalPrice: parseFloat(finalPrice.toFixed(2))
            };
        });


        const [ city, lat, long ] = shippingFrom.split(',')

        if(city === '' || lat === '' || long === ''){
            return next(new ErrorHandler('Please give valid shipping from details', 400))   
        }

        const shippingFromData = {
            placeName: city,
            location: {
                latitude: lat,
                longitude: long
            }
        }

        const imageData = images.split('|').map(img => {
            const trimImage = img.trim();
            if (!checkImageFormat.test(trimImage)) {
                throw new ErrorHandler('Invalid image format.', 400);
            }
            return { image: trimImage };
        });

        const detailsData = productDetails.split(',').map(detail => {
            const [key, value] = detail.split('-').map(part => part.trim());
            return { key, value };
        });


        const maximumPrice = inventoryData.length > 0
            ? Math.max(...inventoryData.map(item => item.finalPrice)).toFixed(2)
            : 0;

        return {
            name,
            description,
            images: imageData,
            productCode: code,
            productColor: color,
            category: childCategoryId,
            productInventory: inventoryData,
            price: maximumPrice,
            details: detailsData,
            shippingFrom : shippingFromData,
            warranty: { available: warrantyAvailable, expires: Number(warrantyExpires) },
            returnPolicy: { available: returnPolicyAvailable, expires: Number(returnPolicyExpires) },
            user: userId
        };
    }));

    const products = await Garments.insertMany(productData)

    await Promise.all(products.map(async (product) => {
        await ChildCategory.findByIdAndUpdate(product.category, {
            $push: { products: product._id }
        });
    }));

    res.status(200).json({
        success: true,
        message: "Products added successfully",
        data: products
    });
});


const getUpdatedProducts = async (products, next) => {
    const updatedProducts = await Promise.all(products.map(async (product) => {
        const fullProduct = await Product.findById(product._id).select('productInventory images');

        const sampleProductInventory = fullProduct.productInventory.findIndex(item => Math.max(item.finalPrice))

        const productInventory = fullProduct?.productInventory?.[sampleProductInventory] || {};
        const { price = 0, finalPrice = 0, discount = 0 } = productInventory;

        const sizes = fullProduct?.productInventory?.map(sizeInv => sizeInv.size) || [];
        const images = fullProduct?.images?.[0] || null;

        return {
            ...product.toObject(),
            sizes,
            images,
            price,
            finalPrice: finalPrice.toFixed(2),
            discount,
        };
    }));


    return updatedProducts
}


const getProducts = catchAsyncError(async (req, res, next) => {
    const { sort, category, minPrice, maxPrice, page, limit = 12 } = req.query;

    let query = {};

    if (category) {
        const categoryArray = category.split(',').map(id => new mongoose.Types.ObjectId(id.trim())); 
        query.category = { $in: categoryArray };
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const currentPage = Number(page);
    const productPerPage = Number(limit);
    const skipProduct = (currentPage - 1) * productPerPage;

    query.hide = false;

    let products = await Product.find(query)
        .sort(sort ? { [sort]: 1 } : { createdAt: -1 })
        .select('-details -description -warranty -productInventory -images -reviews -user -shippingFrom -returnPolicy')
        .populate('category', 'name')
        .limit(productPerPage)
        .skip(skipProduct);

    const updatedProducts = await getUpdatedProducts(products, next);

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / productPerPage);

    const productLength = updatedProducts.length

    res.status(200).json({
        success: true,
        updatedProducts,
        totalProducts,
        totalPages,
        productLength
    });
});


const viewedProducts = catchAsyncError(async (req, res, next) => {
    let recent = req.query.recent;

    if (recent && typeof recent === 'string') {
        recent = recent.split(',').filter(item => mongoose.Types.ObjectId.isValid(item));
    }

    if (!recent || recent.length === 0) {
        return res.status(200).json({
            success: true,
            recentProducts: []
        });
    }

    const products = await Product.find({
        _id: { $in: recent }
    }).select('-details -description -warranty -productInventory -images -reviews -user -shippingFrom -returnPolicy')
        .populate('category', 'name');

    const updatedProducts = await getUpdatedProducts(products);

    res.status(200).json({
        success: true,
        recentProducts: updatedProducts
    });
});


const searchProducts = catchAsyncError(async (req, res, next) => {
    let keyword = req.query.keyword || "";

    let query = {};

    if (keyword) {
        query.name = { $regex: keyword, $options: 'i' };
    }

    const products = await Product.find(query)
        .select('-details -description -warranty -productInventory -images -reviews -user -shippingFrom -returnPolicy')
        .populate('category', 'name');


    const updatedProducts = await Promise.all(products.map(async (product) => {
        const fullProduct = await Product.findById(product._id).select('productInventory images');

        const sampleProductInventory = fullProduct.productInventory.findIndex(item => Math.max(item.finalPrice))

        const productInventory = fullProduct?.productInventory?.[sampleProductInventory] || {};
        const { price = 0, finalPrice = 0, discount = 0 } = productInventory;

        const sizes = fullProduct?.productInventory?.map(sizeInv => sizeInv.size) || [];
        const images = fullProduct?.images?.[0] || null;

        return {
            ...product.toObject(),
            sizes,
            images,
            price,
            finalPrice: finalPrice.toFixed(2),
            discount,
        };
    }));

    if (updatedProducts.length === 0) {
        return next(new ErrorHandler('No Product Found', 404));
    }

    res.status(200).json({
        success: true,
        updatedProducts
    });

});


const getProductByCategory = catchAsyncError(async (req, res, next) => {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return next(new ErrorHandler('product id is not valid', 400));
    }

    const categoryDB = await ChildCategory.findById(categoryId)
        .populate({
            path: 'products',
            select: '-details -description -warranty -productInventory -images -reviews -user -shippingFrom -returnPolicy'
        });

    if (!categoryDB || categoryDB.products.length === 0) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const products = categoryDB.products;

    const updatedProducts = await Promise.all(products.map(async (product) => {
        const fullProduct = await Product.findById(product._id).select('productInventory images');

        const sampleProductInventory = fullProduct.productInventory.findIndex(item => Math.max(item.finalPrice))

        const productInventory = fullProduct?.productInventory?.[sampleProductInventory] || {};
        const { price = 0, finalPrice = 0, discount = 0 } = productInventory;

        const sizes = fullProduct?.productInventory?.map(sizeInv => sizeInv.size) || [];
        const images = fullProduct?.images?.[0] || null;

        return {
            ...product.toObject(),
            sizes,
            images,
            price,
            finalPrice: finalPrice.toFixed(2),
            discount,
        };

    }));

    if (updatedProducts.length === 0) {
        return next(new ErrorHandler('No Product Found', 404));
    }

    res.status(200).json({
        success: true,
        updatedProducts
    });
});


const getSingleProducts = catchAsyncError(async (req, res, next) => {

    const { productId, productName, productCode } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('product id is not valid', 400));
    }

    let normalizedProductName = productName.split('-').join('').toLowerCase();

    let product = await Product.findById(productId)
        .populate('category', 'name')
        .populate('reviews.user', 'name');

    if (!product) {
        return next(new ErrorHandler('product not found', 404));
    }

    let normalizedDbProductName = product.name.trim().toLowerCase().split(' ').join('-');
    normalizedDbProductName = normalizedDbProductName.split('-').join('')

    const isProductNameMismatch = normalizedDbProductName !== normalizedProductName.toLowerCase();
    const isProductCodeMismatch = product.productCode !== productCode

    if (isProductNameMismatch || isProductCodeMismatch) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    const recentReviews = product.reviews.slice(-5).reverse();

    let allProducts = await Product.find({ productCode: productCode })
        .select('name productCode productColor images')

    let productsColor = allProducts.map(item => ({
        name: item.name,
        code: item.productCode,
        prdId: item._id.toString(),
        color: item.productColor,
        image: item.images[0].image
    }));

    product = { ...product.toObject(), productsColor, reviews: recentReviews }

    res.status(200).json({
        success: true,
        product
    });
});

const deleteProductInventory = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const { inventoryId } = req.body;

    let product = await Product.findById(productId).select('productInventory');

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const inventoryItem = product.productInventory.find(item => item._id.toString() === inventoryId);

    if (!inventoryItem) {
        return next(new ErrorHandler('Inventory item not found', 404));
    }

    product.productInventory = product.productInventory.filter(item => item._id.toString() !== inventoryId);

    await product.save();

    res.status(200).json({
        success: true,
        message: 'Inventory item deleted successfully',
        product
    });
});


const updateProductFields = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId
    const { name, description, productColor, productCode, category } = req.body

    let product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    let images = [];

    if (req.body.imageCleared === false) {
        images = product.images;
    }

    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
            let fileName = file.originalname;
            let url = `${BASE_URL}/uploads/products/${fileName}`;
            images.push({ image: url });
        });
    }

    req.body.images = images

    product = await Product.findByIdAndUpdate(productId, {
        name, description, productColor, productCode, category, images
    }, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        product
    });

})

const updateProductPolicies = catchAsyncError(async (req, res, next) => {
    const { productId, warrantyAvailable, warrantyExpires, returnPolicyAvailable, returnPolicyExpires, hide } = req.body

    let product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }


    product = await Product.findByIdAndUpdate(productId, {
        warrantyAvailable, warrantyExpires, returnPolicyAvailable, returnPolicyExpires, hide
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    });
})



const updateProductDetails = catchAsyncError(async (req, res, next) => {
    const productId = req.params.productId
    const { productKey, productValue, productDetailId } = req.body

    let product = await Product.findById(productId).select('details')

    let findId = product.details.find(item => item._id.toString() === productDetailId)

    if (!findId) {
        return next(new ErrorHandler('Product Detail not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

const updateProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.params.id;

    let product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    let images = [];

    if (req.body.imageCleared === false) {
        images = product.images;
    }

    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    if (req.files.length > 0) {
        req.files.forEach((file) => {
            let fileName = file.originalname.split(' ').join('')
            let url = `${BASE_URL}/uploads/product/${fileName}`;
            images.push({ image: url });
        });
    }

    const categories = await Category.find();
    const category = categories.find(cat => cat.name === req.body.category);

    if (!category) {
        return next(new ErrorHandler('Incorrect category', 400));
    }

    req.body.category = category.name;
    req.body.images = images;

    product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        product
    });
});


const createReview = catchAsyncError(async (req, res, next) => {
    const { comment, rating } = req.body

    const productId = req.params.productId

    let product;

    product = await Product.findById(productId)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    if (rating && (rating < 1 || rating > 5)) {
        return next(new ErrorHandler('Rating must be between 1 and 5', 400))
    }

    const existingReviewIndex = product.reviews.findIndex(
        review => review.user.toString() === req.user.id
    )

    if (existingReviewIndex !== -1) {
        product.reviews[existingReviewIndex].comment = comment
        product.reviews[existingReviewIndex].rating = rating
    } else {
        product.reviews.push({
            user: req.user.id,
            rating: rating || 0,
            comment: comment || '',
        });
    }

    product.noOfReviews = Number(product.reviews.length);

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.noOfReviews;

    await product.save({ validateBeforeSave: false });

    const productReviews = await Product.findById(productId).populate('reviews.user', 'name reviewedAt')

    res.status(200).json({
        success: true,
        reviews: productReviews.reviews
    })
})

const getAllReviews = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('product id is not valid', 400));
    }

    let product = await Product.findById(productId)
        .select('_id name images noOfReviews ratings reviews ')
        .populate('reviews.user', 'name')
        .sort({ createdAt: -1 });

    if (!product) {
        return next(new ErrorHandler('product not found', 404));
    }

    const productDetails = {
        name: product.name,
        image: product.images[0].image,
        reviews: product.reviews,
        ratings: product.ratings,
        noOfReviews: product.noOfReviews
    }

    res.status(200).json({
        success: true,
        reviews: productDetails
    });
})


const getCartProducts = catchAsyncError(async (req, res, next) => {
    const { carts } = req.query;

    const cartItems = Array.isArray(carts) ? carts : [carts];

    const splitCartQuery = await Promise.all(
        cartItems.map(async (item) => {
            try {
                const [productId, productSize] = item.split('|');
                const product = await Product.findById(productId)
                    .select('name images deliveryCharge productInventory shippingFrom');

                if (!product) {
                    throw new ErrorHandler('Product not found', 404);
                }

                const inventory = product.productInventory.find(inv =>
                    inv.size.toLowerCase() === productSize.toLowerCase()
                );

                if (!inventory) {
                    throw new ErrorHandler('Size not available', 404);
                }

                const { size, qty, price, discount, gst, finalPrice } = inventory;

                return {
                    productId,
                    name: product.name,
                    image: product.images[0]?.image || '',
                    deliveryCharge: product.deliveryCharge,
                    shippingFrom  : product.shippingFrom,
                    size,
                    qty,
                    price,
                    gst,
                    discount,
                    finalPrice
                };
            } catch (err) {
                return null;
            }
        })
    );

    const validCartItems = splitCartQuery.filter(item => item !== null);

    res.status(200).json({
        success: true,
        items: validCartItems
    });
});



const getProductsName = catchAsyncError(async (req, res, next) => {
    const { productName } = req.query;

    let products;

    if (productName !== '') {
        products = await Product.find({ name: { $regex: productName, $options: 'i' } }).select('name');
    } else {
        products = [];
    }

    res.status(200).json({
        success: true,
        products
    });
});


const getOffersProduct = catchAsyncError(async (req, res, next) => {
    const products = await Product.find()
        .select('name productInventory images category productCode productColor')
        .populate('category', 'name');

    const productsData = products.flatMap(product =>
        product.productInventory.map(item => ({
            _id: product._id, 
            name: product.name,
            productCode : product.productCode,
            color : product.productColor,
            category: product.category.name,
            images: { image : product.images?.[0]?.image || ''},
            size: item.size,
            price: item.price,
            discount: item.discount || 0,
            finalPrice: item.finalPrice || 0
        }))
    );

    const uniqueOffersMap = new Map();

    for (const item of productsData) {
        const existing = uniqueOffersMap.get(item._id);

        if (!existing || item.discount > existing.discount) {
            uniqueOffersMap.set(item._id, item);
        }
    }

    const offersData = Array.from(uniqueOffersMap.values())
        .sort((a, b) => b.discount - a.discount)
        .slice(0,16)

    res.status(200).json({
        success: true,
        data: offersData,
    });
});


const pushAddToWishList = catchAsyncError(async (req, res, next) => {
    const productId = req.query.productId;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    let user = await User.findById(userId).select('myWishList')

    if (!user.myWishList.includes(productId)) {
        user.myWishList.push(productId);
        await user.save();
    }

    res.status(200).json({
        success: true,
        data : user.myWishList
    });
});


const pullRemoveFromWishList = catchAsyncError(async (req, res, next) => {
    const productId = req.query.productId;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Product ID is invalid', 400));
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { myWishList: productId } },
        { new: true } 
    ).populate('myWishList', 'name images ratings price productCode');

    res.status(200).json({
        success: true,
        data: user.myWishList, 
    });
});

const getWishList = catchAsyncError(async(req, res, next) => {
    const userId = req.user.id
    let user = await User.findById(userId).select('myWishList').populate('myWishList', 'name images ratings price productCode')

    const sortedWishList = user.myWishList?.slice().reverse() || [];

    res.status(200).json({
        success : true,
        data : sortedWishList
    })

})


const getProductsByMainCategory = catchAsyncError(async (req, res, next) => {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return next(new ErrorHandler('Category ID is not valid', 400));
    }

    const category = await Category.findById(categoryId)
        .populate({
            path: 'subCategories.childCategories',
            populate: {
                path: 'childCategory',
                select: 'name',
                populate: {
                    path: 'products',
                    select: 'name price ratings noOfReviews hide images productCode productColor',
                },
            },
        });

    const products = [];
    category.subCategories.forEach((subCat) => {
        subCat.childCategories.forEach((childCat) => {
            childCat.childCategory.products.forEach((product) => {
                if (!product.hide) {
                    products.push({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        ratings: product.ratings,
                        noOfReviews: product.noOfReviews,
                        images: product.images,
                        productColor: product.productColor,
                        productCode: product.productCode,
                        category: {
                            _id: childCat.childCategory._id,
                            name: childCat.childCategory.name,
                        },
                    });
                }
            });
        });
    });

    const updatedProducts = await Promise.all(
        products.map(async (product) => {
            const fullProduct = await Product.findById(product._id).select('productInventory images');

            if (!fullProduct?.productInventory) {
                return product; 
            }

            const maxFinalPriceIndex = fullProduct.productInventory.reduce(
                (maxIndex, item, currentIndex) =>
                    item.finalPrice > (fullProduct.productInventory[maxIndex]?.finalPrice || 0)
                        ? currentIndex
                        : maxIndex,
                0
            );

            const productInventory = fullProduct.productInventory[maxFinalPriceIndex] || {};
            const { price = 0, finalPrice = 0, discount = 0 } = productInventory;

            const sizes = fullProduct.productInventory.map((sizeInv) => sizeInv.size) || [];
            const images = fullProduct.images?.[0] || null;

            return {
                ...product,
                sizes,
                images,
                price,
                finalPrice: parseFloat(finalPrice).toFixed(2),
                discount,
            };
        })
    );

    if (updatedProducts.length === 0) {
        return next(new ErrorHandler('No Product Found', 404));
    }

    res.status(200).json({
        success: true,
        categoryName : category.name,
        data: updatedProducts,
    });
});



module.exports = {
    newProduct,
    addMultipleProduct,
    getProducts,
    searchProducts,
    getSingleProducts,
    getProductByCategory,
    updateProduct,
    createReview,
    getAllReviews,
    viewedProducts,
    deleteProductInventory,
    updateProductFields,
    updateProductDetails,
    updateProductPolicies,
    getCartProducts,
    getProductsName,
    pushAddToWishList,
    getWishList,
    pullRemoveFromWishList,
    getOffersProduct,
    getProductsByMainCategory
}