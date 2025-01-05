const multer = require('multer')
const path = require('path')


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/product'))
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split(' ').join('')
            cb(null, fileName)
        }
    })
})


const fileUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..' , 'uploads/excel'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});


const homeUIUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..' , 'uploads/homeui'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
})




const OffersAdsUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..' , 'uploads/offers'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
})


module.exports = {
    upload,
    fileUpload,
    homeUIUpload,
    OffersAdsUpload
}