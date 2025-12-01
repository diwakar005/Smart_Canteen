const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // 'Chinese', 'Fast Food', 'South Indian', 'Beverages', 'Snacks'
    price: { type: Number, required: true },
    image: { type: String }, // URL or placeholder
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
