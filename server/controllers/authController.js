const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role, identifier: user.identifier },
        process.env.JWT_SECRET || 'secret_key_change_me',
        { expiresIn: '30d' }
    );
};

exports.register = async (req, res) => {
    try {
        const { identifier, email, password, name } = req.body;

        // 1. Validate Admission Number Format
        // Format: 2022b0101509 (4 digits + letter + digits) - roughly
        // The user asked for "2022b0101509" format. Let's use a regex that matches this pattern.
        // ^\d{4}[a-zA-Z]\d+$ seems appropriate based on the example.
        const idRegex = /^\d{4}[a-zA-Z]\d+$/;
        if (!idRegex.test(identifier)) {
            return res.status(400).json({ message: 'Invalid Admission Number format. Example: 2022b0101509' });
        }

        // 2. Check if user exists
        let user = await User.findOne({ identifier });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User
        user = await User.create({
            identifier,
            email,
            password: hashedPassword,
            name,
            role: 'student',
            department: 'CS', // Default
            classroom: '101' // Default
        });

        // 5. Return Token
        const token = generateToken(user);
        res.status(201).json({
            _id: user._id,
            identifier: user.identifier,
            name: user.name,
            role: user.role,
            token,
            department: user.department,
            building: user.building,
            classroom: user.classroom,
            canteen: user.canteen
        });

    } catch (error) {
        console.error("Register Error:", error);
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (error.keyPattern.identifier) {
                return res.status(400).json({ message: 'User already exists' });
            }
        }
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

exports.login = async (req, res) => {
    const { identifier, password } = req.body;
    console.log("Login Attempt:", { identifier, passwordProvided: !!password });

    if (!identifier) {
        return res.status(400).json({ message: 'Identifier is required' });
    }

    try {
        // Check for Admin/Teacher legacy login (no password)
        // Or if it's a student with password
        let user = await User.findOne({ identifier });

        if (!user) {
            // Legacy Auto-signup for Teachers/Admins ONLY
            // Students MUST register now
            let role = '';
            const upperId = identifier.toUpperCase();

            if (identifier === 'A1' || identifier === 'A2') {
                role = 'admin';
            } else if (upperId.startsWith('T')) {
                role = 'teacher';
            } else {
                return res.status(400).json({ message: 'Student not found. Please Register first.' });
            }

            let canteen = '';
            if (identifier === 'A1') canteen = 'GF';
            if (identifier === 'A2') canteen = '1st F';

            user = await User.create({
                identifier,
                name: role === 'teacher' ? `Teacher ${identifier}` : `Admin ${identifier}`,
                role,
                canteen: canteen || undefined,
                department: 'CS',
                classroom: '101'
            });
        }

        // If user exists and has a password (Student), verify it
        if (user.password) {
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }

        const token = generateToken(user);

        res.json({
            _id: user._id,
            identifier: user.identifier,
            name: user.name,
            role: user.role,
            token,
            department: user.department,
            building: user.building,
            classroom: user.classroom,
            canteen: user.canteen
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};
