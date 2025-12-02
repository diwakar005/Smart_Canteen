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

exports.seedProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        if (count > 0) {
            return res.json({ message: 'Products already seeded' });
        }

        const products = [
            // Fast Food (Burgers, Sandwiches, Pasta)
            { name: 'Veg Burger', category: 'Fast Food', price: 50, description: 'Classic burger with veg patty and fresh veggies.', image: 'https://image.pollinations.ai/prompt/veg%20burger%20fast%20food%20realistic%20hd' },
            { name: 'Mexican Burger', category: 'Fast Food', price: 60, description: 'Spicy burger with mexican salsa and jalapenos.', image: 'https://image.pollinations.ai/prompt/mexican%20burger%20spicy%20realistic%20hd' },
            { name: 'Veg Sandwich', category: 'Fast Food', price: 35, description: 'Fresh vegetable sandwich with mint chutney.', image: 'https://image.pollinations.ai/prompt/veg%20sandwich%20grilled%20realistic%20hd' },
            { name: 'Grilled Veg Sandwich', category: 'Fast Food', price: 60, description: 'Crispy grilled sandwich loaded with veggies and cheese.', image: 'https://image.pollinations.ai/prompt/grilled%20cheese%20sandwich%20realistic%20hd' },
            { name: 'White Sauce Pasta', category: 'Fast Food', price: 80, description: 'Creamy penne pasta in rich white sauce with corn.', image: 'https://image.pollinations.ai/prompt/white%20sauce%20pasta%20creamy%20realistic%20hd' },
            { name: 'Red Sauce Pasta', category: 'Fast Food', price: 80, description: 'Tangy tomato basil pasta with italian herbs.', image: 'https://image.pollinations.ai/prompt/red%20sauce%20pasta%20tomato%20realistic%20hd' },
            { name: 'Garlic Bread (4 pcs)', category: 'Fast Food', price: 100, description: 'Buttery toasted bread with garlic and herbs.', image: 'https://image.pollinations.ai/prompt/garlic%20bread%20sticks%20realistic%20hd' },

            // Chinese
            { name: 'Veg Momos', category: 'Chinese', price: 60, description: 'Steamed dumplings filled with minced vegetables.', image: 'https://image.pollinations.ai/prompt/veg%20momos%20steamed%20plate%20realistic%20hd' },
            { name: 'Fried Momos', category: 'Chinese', price: 70, description: 'Crispy fried dumplings served with spicy chutney.', image: 'https://image.pollinations.ai/prompt/fried%20momos%20plate%20realistic%20hd' },
            { name: 'Spring Roll', category: 'Chinese', price: 60, description: 'Crispy rolls filled with noodles and veggies.', image: 'https://image.pollinations.ai/prompt/spring%20rolls%20chinese%20food%20realistic%20hd' },
            { name: 'Chilli Potato', category: 'Chinese', price: 70, description: 'Crispy potatoes tossed in spicy chilli sauce.', image: 'https://image.pollinations.ai/prompt/chilli%20potato%20chinese%20dish%20realistic%20hd' },
            { name: 'Hakka Noodles', category: 'Chinese', price: 90, description: 'Stir-fried noodles with crunchy vegetables.', image: 'https://image.pollinations.ai/prompt/veg%20hakka%20noodles%20chinese%20realistic%20hd' },
            { name: 'Manchurian Dry', category: 'Chinese', price: 90, description: 'Veg balls tossed in tangy manchurian sauce.', image: 'https://image.pollinations.ai/prompt/veg%20manchurian%20dry%20realistic%20hd' },

            // Lunch
            { name: 'Chole Bhature', category: 'Lunch', price: 70, description: 'Spicy chickpeas served with fluffy fried bread.', image: 'https://image.pollinations.ai/prompt/chole%20bhature%20indian%20food%20plate%20realistic%20hd' },
            { name: 'Pav Bhaji', category: 'Lunch', price: 60, description: 'Buttery vegetable mash served with toasted soft buns.', image: 'https://image.pollinations.ai/prompt/pav%20bhaji%20mumbai%20street%20food%20realistic%20hd' },
            { name: 'Rajma Rice', category: 'Lunch', price: 70, description: 'Comforting kidney beans curry with steamed rice.', image: 'https://image.pollinations.ai/prompt/rajma%20chawal%20indian%20food%20realistic%20hd' },
            { name: 'Veg Thali', category: 'Lunch', price: 100, description: 'Complete meal with dal, sabzi, roti, rice, and salad.', image: 'https://image.pollinations.ai/prompt/indian%20veg%20thali%20food%20plate%20realistic%20hd' },
            { name: 'Aloo Parantha', category: 'Lunch', price: 50, description: 'Stuffed potato flatbread served with butter and pickle.', image: 'https://image.pollinations.ai/prompt/aloo%20paratha%20with%20butter%20realistic%20hd' },
            { name: 'Paneer Parantha', category: 'Lunch', price: 70, description: 'Stuffed cottage cheese flatbread served with curd.', image: 'https://image.pollinations.ai/prompt/paneer%20paratha%20indian%20breakfast%20realistic%20hd' },

            // Snacks
            { name: 'Samosa', category: 'Snacks', price: 15, description: 'Crispy fried pastry with savory potato filling.', image: 'https://image.pollinations.ai/prompt/samosa%20indian%20snack%20plate%20realistic%20hd' },
            { name: 'Bread Pakoda', category: 'Snacks', price: 20, description: 'Deep-fried bread slices stuffed with spiced potato.', image: 'https://image.pollinations.ai/prompt/bread%20pakora%20indian%20snack%20realistic%20hd' },
            { name: 'Veg Hot Dog', category: 'Snacks', price: 50, description: 'Soft bun filled with veg sausage and sauces.', image: 'https://image.pollinations.ai/prompt/veg%20hot%20dog%20fast%20food%20realistic%20hd' },
            { name: 'Paneer Kulcha', category: 'Snacks', price: 50, description: 'Soft leavened bread stuffed with spiced paneer.', image: 'https://image.pollinations.ai/prompt/paneer%20kulcha%20amritsari%20realistic%20hd' },
            { name: 'Veg Maggi', category: 'Snacks', price: 50, description: 'Classic masala noodles with vegetables.', image: 'https://image.pollinations.ai/prompt/veg%20maggi%20noodles%20bowl%20realistic%20hd' },

            // Beverages (Hot & Cold)
            { name: 'Masala Chai', category: 'Beverages', price: 10, description: 'Hot spiced tea.', image: 'https://image.pollinations.ai/prompt/indian%20masala%20chai%20tea%20cup%20realistic%20hd' },
            { name: 'Hot Coffee', category: 'Beverages', price: 20, description: 'Steaming hot instant coffee.', image: 'https://image.pollinations.ai/prompt/hot%20coffee%20cup%20steam%20realistic%20hd' },
            { name: 'Cold Coffee', category: 'Beverages', price: 60, description: 'Chilled creamy coffee with chocolate topping.', image: 'https://image.pollinations.ai/prompt/cold%20coffee%20glass%20cafe%20realistic%20hd' },
            { name: 'Oreo Shake', category: 'Beverages', price: 80, description: 'Thick milkshake blended with Oreo cookies.', image: 'https://image.pollinations.ai/prompt/oreo%20milkshake%20glass%20realistic%20hd' },
            { name: 'Kitkat Shake', category: 'Beverages', price: 80, description: 'Chocolate milkshake with Kitkat crunch.', image: 'https://image.pollinations.ai/prompt/kitkat%20milkshake%20glass%20realistic%20hd' },
            { name: 'Mojito', category: 'Beverages', price: 50, description: 'Refreshing mint and lemon mocktail.', image: 'https://image.pollinations.ai/prompt/virgin%20mojito%20drink%20glass%20realistic%20hd' },
            { name: 'Fruit Punch', category: 'Beverages', price: 50, description: 'Mixed fruit juice mocktail.', image: 'https://image.pollinations.ai/prompt/fruit%20punch%20mocktail%20glass%20realistic%20hd' },

            // Desserts
            { name: 'Pineapple Pastry', category: 'Desserts', price: 50, description: 'Soft sponge cake with fresh pineapple cream.', image: 'https://image.pollinations.ai/prompt/pineapple%20pastry%20slice%20cake%20realistic%20hd' },
            { name: 'Truffle Pastry', category: 'Desserts', price: 70, description: 'Rich dark chocolate truffle cake slice.', image: 'https://image.pollinations.ai/prompt/chocolate%20truffle%20pastry%20realistic%20hd' },
            { name: 'Red Velvet Pastry', category: 'Desserts', price: 60, description: 'Classic red velvet cake with cream cheese frosting.', image: 'https://image.pollinations.ai/prompt/red%20velvet%20pastry%20slice%20realistic%20hd' },

            // South Indian (Keeping existing)
            { name: 'Masala Dosa', category: 'South Indian', price: 60, description: 'Crispy rice crepe filled with spiced potato masala.', image: 'https://image.pollinations.ai/prompt/masala%20dosa%20south%20indian%20food%20plate%20realistic%20hd' },
            { name: 'Idli Sambhar', category: 'South Indian', price: 50, description: 'Steamed rice cakes served with lentil soup.', image: 'https://image.pollinations.ai/prompt/idli%20sambhar%20south%20indian%20food%20plate%20realistic%20hd' },
        ];

        await Product.insertMany(products);
        res.json({ message: 'Products seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
