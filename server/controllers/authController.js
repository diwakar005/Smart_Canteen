const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Assuming you want to use real JWT later, but for now keeping mock token or simple logic

exports.login = async (req, res) => {
    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({ message: 'Identifier is required' });
    }

    try {
        let user = await User.findOne({ identifier });

        if (!user) {
            // Auto-signup logic
            let role = '';
            const upperId = identifier.toUpperCase();

            if (identifier === 'A1' || identifier === 'A2') {
                role = 'admin';
            } else if (upperId.startsWith('T')) {
                role = 'teacher';
            } else if (upperId.startsWith('S')) {
                role = 'student';
            } else {
                return res.status(400).json({ message: 'Invalid ID format. Students must start with "S", Teachers with "T".' });
            }

            let canteen = '';
            if (identifier === 'A1') canteen = 'GF';
            if (identifier === 'A2') canteen = '1st F';

            user = await User.create({
                identifier,
                name: role === 'teacher' ? `Teacher ${identifier}` : `Student ${identifier}`,
                role,
                canteen: canteen || undefined, // Only for admins
                department: 'CS', // Default
                building: '',
                classroom: '101'
            });
        }

        res.json({
            _id: user._id,
            identifier: user.identifier,
            name: user.name,
            role: user.role,
            token: 'mock-jwt-token', // You should implement real JWT here for production
            department: user.department,
            building: user.building,
            classroom: user.classroom,
            canteen: user.canteen
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
