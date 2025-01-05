const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    email : {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    phoneNo: {
        type: String,
    },
    password : {
        type: String,
        maxlength: [6, 'Password cannot be exceeed 6 characters'],
        select: false
    },
    avatar: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    isVerifiedEmail: {
        type: Boolean,
        default: false
    },
    otpToken: String,
    otpTokenExpire: Date,
    myWishList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    isActive : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
})


userSchema.pre('save', async function (next) {
        if(!this.isModified('password')){
            next()
        }

        this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this.id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password )
}


userSchema.methods.getResetToken = function(){
    const token = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

    this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000

    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User