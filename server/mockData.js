// Simple in-memory store for prototype
global.mockUsers = [];
global.mockProducts = [
    { _id: '1', name: 'Masala Dosa', category: 'South Indian', price: 60, description: 'Crispy rice crepe filled with spiced potato masala.', image: 'https://image.pollinations.ai/prompt/masala%20dosa%20south%20indian%20food%20plate%20realistic%20hd' },
    { _id: '2', name: 'Samosa', category: 'Snacks', price: 15, description: 'Crispy fried pastry with savory potato filling.', image: 'https://image.pollinations.ai/prompt/samosa%20indian%20snack%20plate%20realistic%20hd' },
    { _id: '3', name: 'Veg Thali', category: 'Lunch', price: 120, description: 'Complete meal with roti, rice, dal, and sabzi.', image: 'https://image.pollinations.ai/prompt/indian%20veg%20thali%20food%20plate%20realistic%20hd' },
    { _id: '4', name: 'Cold Coffee', category: 'Beverages', price: 50, description: 'Chilled creamy coffee with chocolate topping.', image: 'https://image.pollinations.ai/prompt/cold%20coffee%20glass%20cafe%20realistic%20hd' },
    { _id: '5', name: 'Fried Rice', category: 'Chinese', price: 80, description: 'Wok-tossed rice with fresh vegetables.', image: 'https://image.pollinations.ai/prompt/veg%20fried%20rice%20chinese%20food%20plate%20realistic%20hd' },
    { _id: '6', name: 'Tea', category: 'Beverages', price: 10, description: 'Hot masala chai.', image: 'https://image.pollinations.ai/prompt/indian%20masala%20chai%20tea%20cup%20realistic%20hd' },
    { _id: '7', name: 'Chole Bhature', category: 'Lunch', price: 90, description: 'Spicy chickpeas served with fluffy fried bread.', image: 'https://image.pollinations.ai/prompt/chole%20bhature%20indian%20food%20plate%20realistic%20hd' },
    { _id: '8', name: 'Idli Sambhar', category: 'South Indian', price: 50, description: 'Steamed rice cakes served with lentil soup.', image: 'https://image.pollinations.ai/prompt/idli%20sambhar%20south%20indian%20food%20plate%20realistic%20hd' },
    { _id: '9', name: 'Paneer Tikka Roll', category: 'Snacks', price: 100, description: 'Grilled paneer wrapped in a paratha.', image: 'https://image.pollinations.ai/prompt/paneer%20tikka%20roll%20indian%20street%20food%20realistic%20hd' },
    { _id: '10', name: 'Veg Burger', category: 'Snacks', price: 60, description: 'Classic burger with veg patty and fresh veggies.', image: 'https://image.pollinations.ai/prompt/veg%20burger%20fast%20food%20realistic%20hd' },
    { _id: '11', name: 'Mango Shake', category: 'Beverages', price: 70, description: 'Fresh mango milkshake.', image: 'https://image.pollinations.ai/prompt/mango%20milkshake%20glass%20realistic%20hd' },
    { _id: '12', name: 'Lassi', category: 'Beverages', price: 40, description: 'Sweet yogurt drink.', image: 'https://image.pollinations.ai/prompt/punjabi%20lassi%20glass%20realistic%20hd' },
];
global.mockOrders = [];
global.mockNotifications = [];
