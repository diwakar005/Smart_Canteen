const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ identifier: '2023b1541161' });
        console.log('User found:', user);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connectDB();
