require('../mockData');

exports.login = async (req, res) => {
    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({ message: 'Identifier is required' });
    }

    try {
        let user = global.mockUsers.find(u => u.identifier === identifier);

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

            user = {
                _id: Date.now().toString(),
                identifier,
                name: role === 'teacher' ? `Teacher ${identifier}` : `Student ${identifier}`,
                role,
                canteen, // Assign canteen
                department: 'CS', // Default
                building: '',
                classroom: '101'
            };
            global.mockUsers.push(user);
        }

        res.json({
            _id: user._id,
            identifier: user.identifier,
            name: user.name,
            role: user.role,
            token: 'mock-jwt-token',
            department: user.department,
            building: user.building,
            classroom: user.classroom,
            canteen: user.canteen // Return canteen
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
