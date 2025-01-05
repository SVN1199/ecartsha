const mongoose = require('mongoose')

const connectDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(`MongoDB Connected Successfully`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDatabase