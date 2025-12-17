const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    deliveryLocation: {
        department: { type: String, required: true },
        building: { type: String },
        classroom: { type: String },
        contactNo: { type: String }
    },
    orderType: { type: String, enum: ['dine-in', 'pre-order'], default: 'dine-in' },
    transactionId: { type: String },
    estimatedTime: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'preparing', 'ready', 'delivered'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
