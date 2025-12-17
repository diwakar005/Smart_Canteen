const menuItems = [
    // Hot Beverages
    { name: 'Tea', category: 'Beverages', price: 10, description: 'Classic hot tea.', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=60' },
    { name: 'Coffee', category: 'Beverages', price: 20, description: 'Hot instant coffee.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60' },
    { name: 'Coffee Black', category: 'Beverages', price: 25, description: 'Strong black coffee.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60' },
    { name: 'Manchaw Soup', category: 'Beverages', price: 30, description: 'Spicy and tangy vegetable soup.', image: 'https://images.unsplash.com/photo-1603064750589-395905f6784c?auto=format&fit=crop&w=800&q=60' },
    { name: 'Cardamom Tea', category: 'Beverages', price: 15, description: 'Tea flavored with fresh cardamom.', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=60' },

    // Snacks
    { name: 'Samosa', category: 'Snacks', price: 15, description: 'Crispy pastry with savory potato filling.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=60' },
    { name: 'Bread Roll', category: 'Snacks', price: 15, description: 'Deep fried bread roll with potato filling.', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=60' },
    { name: 'Bread Pakoda', category: 'Snacks', price: 20, description: 'Batter fried bread stuffed with potato.', image: 'https://images.unsplash.com/photo-1605433247501-698725862ea7?auto=format&fit=crop&w=800&q=60' },
    { name: 'Aaloo Pattie', category: 'Snacks', price: 25, description: 'Puff pastry with spicy potato filling.', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=60' },
    { name: 'Paneer Pattie', category: 'Snacks', price: 35, description: 'Puff pastry with spiced paneer filling.', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=60' },
    { name: 'Veg. Hot Dog', category: 'Snacks', price: 50, description: 'Bun filled with veg sausage and sauces.', image: 'https://images.unsplash.com/photo-1619740455993-9e612b4af657?auto=format&fit=crop&w=800&q=60' },
    { name: 'Cream Roll', category: 'Snacks', price: 30, description: 'Crispy roll filled with sweet cream.', image: 'https://images.unsplash.com/photo-1621221460346-014546505c4b?auto=format&fit=crop&w=800&q=60' },
    { name: 'Paneer Kulcha', category: 'Snacks', price: 50, description: 'Soft bread stuffed with paneer.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=60' },
    { name: 'Poha', category: 'Snacks', price: 50, description: 'Flattened rice cooked with onions and spices.', image: 'https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=800&q=60' },

    // Cool Refreshers
    { name: 'Cold Coffee (300 ml)', category: 'Beverages', price: 60, description: 'Chilled creamy coffee.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?auto=format&fit=crop&w=800&q=60' },
    { name: 'Spl. Modinagar Jain Shikanji', category: 'Beverages', price: 50, description: 'Special spiced lemonade.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Lassi', category: 'Beverages', price: 60, description: 'Sweet yogurt drink.', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=60' },

    // Shakes
    { name: 'Pan Shake', category: 'Beverages', price: 60, description: 'Refreshing paan flavored milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },
    { name: 'Strawberry Shake', category: 'Beverages', price: 60, description: 'Classic strawberry milkshake.', image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=60' },
    { name: 'Chocolate Shake', category: 'Beverages', price: 60, description: 'Rich chocolate milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },
    { name: 'Green Apple Shake', category: 'Beverages', price: 60, description: 'Tangy green apple milkshake.', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=60' },
    { name: 'Kiwi Shake', category: 'Beverages', price: 60, description: 'Exotic kiwi fruit milkshake.', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=60' },
    { name: 'Vanilla Shake', category: 'Beverages', price: 60, description: 'Smooth vanilla milkshake.', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=60' },
    { name: 'Butter Scotch Shake', category: 'Beverages', price: 60, description: 'Butterscotch flavored milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },
    { name: 'Oreo Shake', category: 'Beverages', price: 80, description: 'Milkshake with crushed Oreo cookies.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },
    { name: 'Kitkat Shake', category: 'Beverages', price: 80, description: 'Milkshake with Kitkat chocolate.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },
    { name: 'Black Current Shake', category: 'Beverages', price: 70, description: 'Berry flavored milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },

    // Mocktails
    { name: 'Mojito', category: 'Beverages', price: 50, description: 'Mint and lemon refreshing drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Fresh Lime Soda', category: 'Beverages', price: 50, description: 'Sparkling lime drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Fruit Punch', category: 'Beverages', price: 50, description: 'Mixed fruit mocktail.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Masala Lemonade', category: 'Beverages', price: 50, description: 'Spiced indian lemonade.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Strawberry Crush', category: 'Beverages', price: 50, description: 'Icy strawberry drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Green Apple Crush', category: 'Beverages', price: 50, description: 'Icy green apple drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Black Current Crush', category: 'Beverages', price: 50, description: 'Icy berry drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Pineapple Crush', category: 'Beverages', price: 50, description: 'Icy pineapple drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Orange Crush', category: 'Beverages', price: 50, description: 'Icy orange drink.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=60' },

    // Maggi
    { name: 'Veg. Maggi', category: 'Snacks', price: 50, description: 'Maggi noodles with vegetables.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=60' },
    { name: 'Cheese Maggi', category: 'Snacks', price: 60, description: 'Maggi noodles topped with cheese.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=60' },
    { name: 'Paneer Maggi', category: 'Snacks', price: 70, description: 'Maggi noodles with paneer cubes.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=60' },

    // Burgers
    { name: 'Veg. Burger', category: 'Fast Food', price: 50, description: 'Classic vegetable burger.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Mexican Burger', category: 'Fast Food', price: 60, description: 'Spicy mexican style burger.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Tandoori Burger', category: 'Fast Food', price: 60, description: 'Burger with tandoori sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Achaari Burger', category: 'Fast Food', price: 60, description: 'Burger with tangy pickle flavor.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60' },
    { name: 'Schezwan Burger', category: 'Fast Food', price: 60, description: 'Burger with spicy schezwan sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60' },

    // Sandwich
    { name: 'Veg. Sandwich', category: 'Fast Food', price: 35, description: 'Simple vegetable sandwich.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=60' },
    { name: 'Grilled Veg. Sandwich', category: 'Fast Food', price: 60, description: 'Toasted sandwich with veggies.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=60' },
    { name: 'Mexican Sandwich', category: 'Fast Food', price: 60, description: 'Spicy sandwich with mexican filling.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=60' },
    { name: 'Corn & Peas Sandwich', category: 'Fast Food', price: 60, description: 'Sandwich with corn and peas.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=60' },

    // Chinese
    { name: 'Momos', category: 'Chinese', price: 60, description: 'Steamed vegetable dumplings.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },
    { name: 'Spring Roll', category: 'Chinese', price: 60, description: 'Fried rolls with veg filling.', image: 'https://images.unsplash.com/photo-1544025162-d76690b68f11?auto=format&fit=crop&w=800&q=60' },
    { name: 'Chilli Potato', category: 'Chinese', price: 70, description: 'Crispy potatoes in chilli sauce.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },
    { name: 'Honey Chilli Potato', category: 'Chinese', price: 80, description: 'Sweet and spicy potato fries.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },
    { name: 'White Sauce Pasta', category: 'Fast Food', price: 80, description: 'Pasta in creamy white sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e9dbc9201280?auto=format&fit=crop&w=800&q=60' },
    { name: 'Red Sauce Pasta', category: 'Fast Food', price: 80, description: 'Pasta in tomato red sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e9dbc9201280?auto=format&fit=crop&w=800&q=60' },
    { name: 'Mix Sauce Pasta', category: 'Fast Food', price: 100, description: 'Pasta in pink sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e9dbc9201280?auto=format&fit=crop&w=800&q=60' },
    { name: 'Garlic Bread (4 pcs)', category: 'Fast Food', price: 100, description: 'Toasted garlic bread.', image: 'https://images.unsplash.com/photo-1573140247632-f84660f67627?auto=format&fit=crop&w=800&q=60' },
    { name: 'Noodles', category: 'Chinese', price: 60, description: 'Stir fried veg noodles.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=60' },
    { name: 'French Fries', category: 'Fast Food', price: 60, description: 'Crispy salted potato fries.', image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=60' },
    { name: 'Singapore Noodles', category: 'Chinese', price: 90, description: 'Spicy singapore style noodles.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=60' },
    { name: 'Hakka Noodles', category: 'Chinese', price: 90, description: 'Classic hakka noodles.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=60' },
    { name: 'Chilli Paneer', category: 'Chinese', price: 150, description: 'Paneer cubes in spicy sauce.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },
    { name: 'Gravy Momos', category: 'Chinese', price: 80, description: 'Momos in spicy gravy.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },
    { name: 'Tanduri Momos', category: 'Chinese', price: 90, description: 'Tandoori roasted momos.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },
    { name: 'Manchurian (6 pcs)', category: 'Chinese', price: 90, description: 'Veg manchurian balls in gravy.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=60' },

    // Just Foodie
    { name: 'Pav Bhaji', category: 'Lunch', price: 60, description: 'Spicy veg mash with buns.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Chole Bhature', category: 'Lunch', price: 70, description: 'Chickpeas with fried bread.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Chole Kulche', category: 'Lunch', price: 60, description: 'Chickpeas with soft bread.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Masala Kulche', category: 'Lunch', price: 70, description: 'Spiced stuffed kulcha.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Poori Sabzi', category: 'Lunch', price: 60, description: 'Fried bread with potato curry.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Fried Rice', category: 'Chinese', price: 60, description: 'Veg fried rice.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=60' },
    { name: 'Chole + Rice', category: 'Lunch', price: 70, description: 'Chickpeas curry with rice.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Rice + Rajma', category: 'Lunch', price: 70, description: 'Kidney beans curry with rice.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },
    { name: 'Thali', category: 'Lunch', price: 100, description: 'Complete meal platter.', image: 'https://images.unsplash.com/photo-1626776491513-46325519d186?auto=format&fit=crop&w=800&q=60' },

    // Parantha
    { name: 'Aloo Parantha', category: 'Lunch', price: 50, description: 'Potato stuffed flatbread.', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=60' },
    { name: 'Aloo Onion Parantha', category: 'Lunch', price: 50, description: 'Potato and onion stuffed flatbread.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgyteC_WEbDoJKlCtk-jnU2YH50HQSv3iTA&s' },
    { name: 'Onion Parantha', category: 'Lunch', price: 60, description: 'Onion stuffed flatbread.', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=60' },
    { name: 'Paneer Pyaaz Parantha', category: 'Lunch', price: 70, description: 'Paneer and onion stuffed flatbread.', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=60' },
    { name: 'Paneer Parantha', category: 'Lunch', price: 70, description: 'Paneer stuffed flatbread.', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=60' },

    // Pastries
    { name: 'Pineapple Pastry', category: 'Desserts', price: 50, description: 'Pineapple cake slice.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60' },
    { name: 'Butter Scotch Pastry', category: 'Desserts', price: 60, description: 'Butterscotch cake slice.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60' },
    { name: 'Choco Chips Pastry', category: 'Desserts', price: 70, description: 'Chocolate chip cake slice.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60' },
    { name: 'Red Velvet Pastry', category: 'Desserts', price: 60, description: 'Red velvet cake slice.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60' },
    { name: 'Truffle Pastry', category: 'Desserts', price: 70, description: 'Chocolate truffle cake slice.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60' }
];

module.exports = menuItems;
