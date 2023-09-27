const mongoose = require("mongoose");

const shortid = require("shortid"); // Import the shortid library

const orderSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    userId: { type: String, default: shortid.generate }, // Use shortid to generate random user IDs
 
    orderItems: [],
    shippingAddress: { type: Object },
    orderAmount: { type: Number, require },
    isDelivered: { type: Boolean, require, default: false },
    transactionId: { type: String }

}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)


