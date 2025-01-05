const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
        websiteName: {
                type: String
        },
        offers: [{
                image: {
                        type: String
                },
                heading: {
                        type: String
                },
                description: {
                        type: String
                }
        }],
        deliveryChargeDist: [{
                distanceStart: { type: Number },
                distanceEnd: { type: Number },
                distancePrice: { type: Number }
        }],
        homeUI: [{
                image: {
                        type: String
                }
        }],
        contentDisplay: {
                offers: { type: Boolean },
                category: { type: Boolean },
                offersAd: { type: Boolean },
                codOptionDisplay: { type: Boolean }
        },
        homePageContent: {
                services: {

                        type: String
                },
                about: {
                        type: String
                },
                footerContent: {
                        address: {
                                type: String
                        },
                        contact: {
                                type: String
                        },
                        copyright: {
                                type: String
                        },
                        mediasurl: [{
                                icon: {
                                        type: String
                                },
                                name: {
                                        type: String
                                },
                                link: {
                                        type: String
                                },
                        }]
                },
        },
});

const Website = mongoose.model('Website', websiteSchema)
module.exports = Website;