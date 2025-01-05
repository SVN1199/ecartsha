const catchAsyncError = require('../middlewares/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userModel')
const sendToken = require('../middlewares/jwt')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserFeedback = require('../models/userFeedbackModel')

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpires = Date.now() + 10 * 60 * 1000

    return { otp, otpExpires }
}

const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, emailOTP } = req.body;

    let avatar;
    let BASE_URL = process.env.BACKEND_URL;

    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    if (req.file) {
        avatar = `${BASE_URL}/uploads/user/${req.file.filename}`;
    }

    const tempUser = await User.findOne({ email });

    if (!tempUser) {
        return next(new ErrorHandler('Invalid email or OTP', 400));
    }

    const isOtpExpired = Date.now() > tempUser.otpTokenExpire;
    if (isOtpExpired || tempUser.otpToken !== emailOTP) {
        await User.deleteOne({ email: tempUser.email });
        return next(new ErrorHandler('Invalid email or OTP', 400));
    }

    tempUser.otpToken = undefined;
    tempUser.otpTokenExpire = undefined;

    tempUser.name = name;
    tempUser.password = password;
    tempUser.avatar = avatar;
    tempUser.isVerifiedEmail = true

    await tempUser.save();

    sendToken(tempUser, 201, res);
});


const sendOtpViaEmail = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new ErrorHandler('User Already Exists', 400));
    }

    const { otp, otpExpires } = generateOTP();

    const options = {
        to: email,
        subject: 'Verify Email - ShaNaBotique',
        message: `
            <h3>Welcome to ShanNa Botique</h3>
            <h5>Thank you for trying to register</h5>
            <p>Your OTP is ${otp}</p> <br/>
            <p>Kindly verify your email within 10 minutes. Otherwise, the OTP will expire soon.</p> <br/>
        `,
    };


    await sendEmail(options);

    const tempUser = await User.create({
        email,
        otpToken: otp,
        otpTokenExpire: otpExpires,
    });

    res.status(200).json({
        success: true,
        message: 'Email OTP has been sent successfully',
        tempUser,
    });
});


const verifyEmail = catchAsyncError(async (req, res, next) => {
    const otp = req.body.otp
    const otpFromToken = req.params.otp

    if (otpFromToken === otp) {
        console.log('ok')
    }
})

const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email or password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('User not found and Please SIGN UP', 404))
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res)
})


const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-myWishList')
    res.status(200).json({
        success: true,
        user
    })
})

const updatePassword = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
        return next(new ErrorHandler('Please enter old Password or new Password'))
    }

    const user = await User.findById(userId).select('+password');

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        user
    });
});

const forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetToken()

    await user.save({ validateBeforeSave: false })

    let BASE_URL = process.env.FRONTEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;


    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;


    const options = {
        to: user.email,
        subject: 'Password Recovery Request - ShaNa Botique',
        message: message
    }

    try {
        sendEmail(options)

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message), 500)
    }

})

const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    if (!resetPasswordToken || resetPasswordToken === undefined) {
        return next(new ErrorHandler('Token Expire or Invalid. Please request another time'))
    }

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt: Date.now()
        }
    })

    if (!user) {
        return next(new ErrorHandler('Token Expire or Invalid. Please request again'))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({ validateBeforeSave: false })
    sendToken(user, 201, res)
})

const updateUserProfile = catchAsyncError(async (req, res, next) => {
    const { name, address } = req.body;
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new ErrorHandler('UserId is Invalid'));
    }

    let user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${userId}`));
    }

    let avatar = user.avatar;
    let BASE_URL = process.env.BACKEND_URL;

    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    if (req.file) {
        avatar = `${BASE_URL}/uploads/user/${req.file.filename}`;
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (avatar !== user.avatar) updateData.avatar = avatar;

    user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new ErrorHandler(`Failed to update user with id ${userId}`));
    }

    res.status(200).json({
        success: true,
        user
    });
});


const deleteUserProfile = catchAsyncError(async (req, res, next) => {
    const password = req.body.password
    const userId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new ErrorHandler(`UserId is Invalid`))
    }

    let user = await User.findById(userId).select('password')

    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`, 404))
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Password is incorrect', 400));
    }

    await User.findByIdAndDelete(userId)

    res.status(200).json({
        success: true,
        message: 'User Profile has been deleted'
    })

})

const userFeedbackPost = catchAsyncError(async (req, res, next) => {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message || message.trim() === "") {
        return next(new ErrorHandler("Message cannot be empty", 400));
    }

    let userFeedback = await UserFeedback.findOne({ user: userId });

    if (userFeedback) {
        userFeedback = await UserFeedback.findOneAndUpdate(
            { user: userId },
            { message: message.trim() },
            { new: true } 
        );
    } else {
        userFeedback = await UserFeedback.create({
            message: message.trim(),
            user: userId,
        });
    }

    res.status(201).json({
        success: true,
        data: userFeedback,
    });
});



module.exports = {
    register,
    sendOtpViaEmail,
    login,
    getUser,
    verifyEmail,
    updatePassword,
    forgotPassword,
    resetPassword,
    updateUserProfile,
    deleteUserProfile,
    userFeedbackPost
}