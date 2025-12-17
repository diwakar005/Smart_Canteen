const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const menuItems = require('../data/menu');

exports.seedProducts = async (req, res) => {
    try {
        const { force } = req.query;

        if (force === 'true') {
            await Product.deleteMany({});
        } else {
            const count = await Product.countDocuments();
            if (count > 0) {
                return res.json({ message: 'Products already seeded. Use ?force=true to overwrite.' });
            }
        }

        await Product.insertMany(menuItems);
        res.json({ message: 'Products seeded successfully', count: menuItems.length });
    } catch (error) {
        console.error("Seeding error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
