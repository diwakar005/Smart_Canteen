require('../mockData');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryLocation, orderType, canteen, transactionId } = req.body;
        const userId = req.user._id;

        const user = global.mockUsers.find(u => u._id === userId);

        const newOrder = {
            _id: Date.now().toString(),
            user: user || { name: 'Unknown', role: 'student' }, // Fallback
            items,
            totalAmount,
            deliveryLocation,
            orderType: orderType || 'dine-in',
            canteen,
            transactionId,
            status: 'pending',
            createdAt: new Date()
        };

        global.mockOrders.push(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = global.mockOrders.sort((a, b) => b.createdAt - a.createdAt);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = global.mockOrders.find(o => o._id === id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;

        // Create Notification
        const notification = {
            _id: Date.now().toString(),
            userId: order.user._id,
            message: `Your order for ${order.items[0].name} ${order.items.length > 1 ? `and ${order.items.length - 1} other items` : ''} is now ${status.toUpperCase()}.`,
            read: false,
            createdAt: new Date()
        };
        global.mockNotifications.push(notification);

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const userOrders = global.mockOrders
            .filter(o => o.user._id === userId)
            .sort((a, b) => b.createdAt - a.createdAt);
        res.json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = global.mockNotifications
            .filter(n => n.userId === userId)
            .sort((a, b) => b.createdAt - a.createdAt);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
