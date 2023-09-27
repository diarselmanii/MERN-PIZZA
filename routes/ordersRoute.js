const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderModel')
const stripe = require("stripe")("sk_test_51MXC6UH4yJErZSA7bxFU0NyPV68ZT1OR8GodRuKVttokLJTPsYCKNb8GzkW5HKNB4ZDWlBMBsVyklFqzEGQRb4Tv00L1nlRe28")

router.post("/placeorder", async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'EUR',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        if (payment) {
            const newOrder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userId: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: payment.source.id
            })

            newOrder.save();
            res.send('Order placed successfully')
        } else {
            res.send('Payment Failed')
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' + error });
    }
})

router.post("/getuserorders", async (req, res) => {
    const { userid } = req.body

    try {
        const orders = await Order.find({ userid: userid }).sort({ _id: -1 })
        res.send(orders)

    } catch (error) {
        return res.status(400).json({ message: ' something went wrong' })

    }
})

router.get("/getallorders", async (req, res) => {
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: ' something went wrong' })

    }

})

router.post("/deliverorder", async (req, res) => {

    const orderid = req.body.orderid

    try {
        const order = await Order.findOne({ _id: orderid })
        order.isDelivered = true
        await order.save()
        res.send('Order Deliverd successfully')
    } catch (error) {
        return res.status(400).json({ message: ' something went wrong' })

    }
})

module.exports = router