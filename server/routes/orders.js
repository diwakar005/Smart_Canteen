const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

// Middleware to simulate auth (getting user from header or body for now, or assume context sent it)
// In a real app, we'd use a proper auth middleware extracting ID from JWT.
// For this prototype, let's assume the client sends the User ID in a header 'x-user-id'
// or we can just trust the body for the prototype speed.
// Let's make a simple middleware here.

const mockAuth = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { _id: userId };
    next();
};

router.post('/', mockAuth, createOrder);
router.get('/', getOrders);
router.get('/my-orders', mockAuth, require('../controllers/orderController').getUserOrders);
router.get('/notifications', mockAuth, require('../controllers/orderController').getNotifications);
router.put('/:id/status', require('../controllers/orderController').updateOrderStatus);

module.exports = router;
