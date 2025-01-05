const User = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const ErrorHandler = require("../utils/errorHandler");

const isAuthenticateUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to handle this resource', 401))
    }


    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)
    next()
})


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} not allowed`, 401))
        }
        next()
    }
}

const logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Loggedout"
        })
}


module.exports = {
    isAuthenticateUser,
    authorizeRoles,
    logoutUser
}