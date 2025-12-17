const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Notification = require('../models/Notification');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Verify Payment
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment Success - Create Order in DB
            const userId = req.headers['x-user-id'];

            const newOrder = await Order.create({
                user: userId,
                items: orderData.items,
                totalAmount: orderData.totalAmount,
                deliveryLocation: orderData.deliveryLocation,
                orderType: orderData.orderType,
                canteen: orderData.canteen,
                transactionId: razorpay_payment_id,
                status: 'pending'
            });

            // Create Notification
            await Notification.create({
                userId: userId,
                message: `Order Placed Successfully! Transaction ID: ${razorpay_payment_id}`,
                read: false
            });

            return res.status(200).json({ message: "Payment verified successfully", orderId: newOrder._id });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Bypass Payment (For Demo)
router.post('/bypass-order', async (req, res) => {
    try {
        const { orderData, transactionId } = req.body;
        const userId = req.headers['x-user-id'];

        const newOrder = await Order.create({
            user: userId,
            items: orderData.items,
            totalAmount: orderData.totalAmount,
            deliveryLocation: orderData.deliveryLocation,
            orderType: orderData.orderType,
            canteen: orderData.canteen,
            transactionId: transactionId || "demo_txn_" + Date.now(),
            status: 'pending'
        });

        // Create Notification
        await Notification.create({
            userId: userId,
            message: `Order Placed Successfully! Transaction ID: ${newOrder.transactionId}`,
            read: false
        });

        res.status(200).json({ message: "Order placed successfully (Demo)", orderId: newOrder._id });
    } catch (error) {
        console.error("Bypass Order Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
