import type {FoodItem, FoodType, MenuCategory} from "./Type.ts";

export const foodItems:FoodItem[] = [
    { id: 1, name: 'Burger', price: 5.59,
        image: 'https://static.toiimg.com/thumb/83565509.cms?width=1200&height=900',
        rating: 3, discount: 15 },
    { id: 2, name: 'Double Patty Burger', price: 5.59, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvBSYpdrmjC6s63P5oWgTiU4gPl36dkdVfQ&s', rating: 5, discount: 15 },
    { id: 3, name: 'Cheese Burger', price: 5.59, image: 'https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger.jpg', rating: 4, discount: 15 },
]

export const foodTypeList:FoodType[]=[
    { id: 1, name: 'Bakery', image: "/images/baked.png" },
    { id: 2, name: 'Burger', image: "/images/burger.png" },
    { id: 3, name: 'Beverage', image: "/images/coffee.png" },
    { id: 4, name: 'Chicken', image: "/images/chicken.png" },
    { id: 5, name: 'Pizza', image: "/images/fast.png" },
    { id: 6, name: 'Seafood', image: "/images/fish.png" },
]

export const sortOptions = [
    { id: 'rating', name: 'Rating (High to Low)' },
    { id: 'deliveryTime', name: 'Delivery Time (Low to High)' },
    { id: 'minOrder', name: 'Minimum Order (Low to High)' }
];


export const menuCategories: Record<number, MenuCategory[]> = {
    // Restaurant ID 1 (Tasty Delights)
    1: [
        {
            id: 1,
            name: 'Appetizers',
            items: [
                { id: 101, name: 'Garlic Bread', description: 'Freshly baked bread with garlic butter and herbs', price: 4.99, image: 'https://images.unsplash.com/photo-1619535860434-cf9b902a0a14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80', rating: 4.5 },
                { id: 102, name: 'Mozzarella Sticks', description: 'Breaded mozzarella sticks with marinara sauce', price: 6.99, image: 'https://images.unsplash.com/photo-1548340748-6d98e4415356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.2 },
                { id: 103, name: 'Bruschetta', description: 'Toasted bread topped with tomatoes, basil, and olive oil', price: 5.99, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.7, discount: 10 }
            ]
        },
        {
            id: 2,
            name: 'Main Courses',
            items: [
                { id: 201, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and basil', price: 12.99, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.8, discount: 15 },
                { id: 202, name: 'Spaghetti Carbonara', description: 'Spaghetti with creamy sauce, pancetta, and parmesan', price: 14.99, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80', rating: 4.6 },
                { id: 203, name: 'Chicken Parmesan', description: 'Breaded chicken topped with marinara sauce and melted cheese', price: 16.99, image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.9 }
            ]
        },
        {
            id: 3,
            name: 'Desserts',
            items: [
                { id: 301, name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers', price: 7.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80', rating: 4.7 },
                { id: 302, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center', price: 8.99, image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.8, discount: 10 }
            ]
        },
        {
            id: 4,
            name: 'Beverages',
            items: [
                { id: 401, name: 'Soft Drinks', description: 'Assorted soft drinks', price: 2.99, image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.0 },
                { id: 402, name: 'Italian Soda', description: 'Flavored soda with cream', price: 4.99, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.3 }
            ]
        }
    ],
    // Restaurant ID 2 (Burger Palace)
    2: [
        {
            id: 1,
            name: 'Starters',
            items: [
                { id: 101, name: 'Onion Rings', description: 'Crispy battered onion rings with dipping sauce', price: 5.99, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.3 },
                { id: 102, name: 'Loaded Fries', description: 'French fries topped with cheese, bacon, and sour cream', price: 7.99, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.6, discount: 10 }
            ]
        },
        {
            id: 2,
            name: 'Burgers',
            items: [
                { id: 201, name: 'Classic Cheeseburger', description: 'Beef patty with cheese, lettuce, tomato, and special sauce', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1299&q=80', rating: 4.7 },
                { id: 202, name: 'Double Bacon Burger', description: 'Two beef patties with bacon, cheese, and all the fixings', price: 13.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1368&q=80', rating: 4.9, discount: 5 },
                { id: 203, name: 'Veggie Burger', description: 'Plant-based patty with avocado, sprouts, and vegan mayo', price: 10.99, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1490&q=80', rating: 4.4 }
            ]
        },
        {
            id: 3,
            name: 'Sides',
            items: [
                { id: 301, name: 'French Fries', description: 'Crispy golden fries with sea salt', price: 3.99, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80', rating: 4.5 },
                { id: 302, name: 'Coleslaw', description: 'Fresh cabbage slaw with creamy dressing', price: 2.99, image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.2 }
            ]
        },
        {
            id: 4,
            name: 'Shakes',
            items: [
                { id: 401, name: 'Chocolate Shake', description: 'Rich chocolate milkshake topped with whipped cream', price: 5.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.8, discount: 10 },
                { id: 402, name: 'Strawberry Shake', description: 'Creamy strawberry milkshake with fresh berries', price: 5.99, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.6 }
            ]
        }
    ],
    // Restaurant ID 3 (Sushi Express)
    3: [
        {
            id: 1,
            name: 'Appetizers',
            items: [
                { id: 101, name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 4.99, image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.4 },
                { id: 102, name: 'Miso Soup', description: 'Traditional Japanese soup with tofu and seaweed', price: 3.99, image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.5 }
            ]
        },
        {
            id: 2,
            name: 'Sushi Rolls',
            items: [
                { id: 201, name: 'California Roll', description: 'Crab, avocado, and cucumber roll', price: 8.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.6 },
                { id: 202, name: 'Spicy Tuna Roll', description: 'Spicy tuna and cucumber roll', price: 10.99, image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.8, discount: 5 },
                { id: 203, name: 'Dragon Roll', description: 'Eel and cucumber roll topped with avocado', price: 13.99, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.9 }
            ]
        },
        {
            id: 3,
            name: 'Sashimi',
            items: [
                { id: 301, name: 'Salmon Sashimi', description: 'Fresh sliced salmon (5 pieces)', price: 12.99, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.7, discount: 10 },
                { id: 302, name: 'Tuna Sashimi', description: 'Premium tuna slices (5 pieces)', price: 14.99, image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', rating: 4.8 }
            ]
        },
        {
            id: 4,
            name: 'Drinks',
            items: [
                { id: 401, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 2.99, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.5 },
                { id: 402, name: 'Sake', description: 'Japanese rice wine (small)', price: 7.99, image: 'https://images.unsplash.com/photo-1627435601433-c22f465e243a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4.7 }
            ]
        }
    ]
};



export const NationalFoodTypeMap = {
    "VIETNAMESE": "Việt Nam",
    "CHINESE": "Trung Quốc",
    "JAPANESE": "Nhật Bản",
    "KOREAN": "Hàn Quốc",
    "THAI": "Thái Lan",
    "INDIAN": "Ấn Độ",
    "WESTERN": "Âu Mỹ",
    "MIDDLE_EASTERN": "Trung Đông",
    "MEXICAN": "Mexico",
    "ITALIAN": "Ý"
}