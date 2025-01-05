const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv').config({ path: path.join(__dirname, 'config/.env') })
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const authRouter = require('./routers/authRouters')
const userRouter = require('./routers/userRouters')
const categoryRouter = require('./routers/categoryRouters')
const productRouter = require('./routers/productRouters')
const adminRouter = require('./routers/adminRouters')
const ordersRouter = require('./routers/orderRoutes')
const paymentRouter = require('./routers/paymentRouters')
const orderRouter = require('./routers/orderRoutes')
const websiteRouter = require('./routers/websiteRouters')
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/website', websiteRouter)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const errorMiddleware = require('./middlewares/error')
app.use(errorMiddleware)

module.exports = app