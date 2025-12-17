const Order = require('../models/Order');
const User = require('../models/User');
const Notification = require('../models/Notification');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryLocation, orderType, canteen, transactionId } = req.body;
        const userId = req.headers['x-user-id'] || req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = await Order.create({
            user: userId,
            items,
            totalAmount,
            deliveryLocation,
            orderType: orderType || 'dine-in',
            canteen,
            transactionId,
            status: 'pending'
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, estimatedTime } = req.body;

        const updateData = { status };
        if (estimatedTime) updateData.estimatedTime = estimatedTime;

        const order = await Order.findByIdAndUpdate(id, updateData, { new: true }).populate('user');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create Notification
        await Notification.create({
            userId: order.user._id,
            message: `Your order for ${order.items[0].name} ${order.items.length > 1 ? `and ${order.items.length - 1} other items` : ''} is now ${status.toUpperCase()}.`,
            read: false
        });

        // Send Email Notification
        if (order.user.email) {
            const { sendOrderStatusEmail } = require('../utils/emailService');
            sendOrderStatusEmail(order.user.email, status, order);
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.user?._id;
        const userOrders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.user?._id;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
