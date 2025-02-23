export const menuItems = [
  // Beverages
  {
    id: "espresso-1",
    name: "Classic Espresso",
    description: "Rich and bold single-shot espresso",
    price: 3.99,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=400",
    dietary: ["Vegan"],
    isPopular: true,
    funQuote: "Rocket fuel for your day!",
    cuisine: "Beverages",
    addOns: [
      { id: "extra-shot", name: "Extra Shot", price: 0.99 },
      { id: "caramel", name: "Caramel Syrup", price: 0.75 }
    ]
  },
  {
    id: "latte-1",
    name: "Vanilla Latte",
    description: "Smooth espresso with steamed milk and vanilla",
    price: 4.99,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400",
    cuisine: "Beverages",
    addOns: [
      { id: "extra-shot", name: "Extra Shot", price: 0.99 },
      { id: "whipped-cream", name: "Whipped Cream", price: 0.75 }
    ]
  },
  {
    id: "frappe-1",
    name: "Caramel Frappe",
    description: "Blended coffee with caramel and whipped cream",
    price: 5.99,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400",
    cuisine: "Beverages",
    addOns: [
      { id: "extra-caramel", name: "Extra Caramel", price: 0.75 },
      { id: "chocolate-chips", name: "Chocolate Chips", price: 0.50 }
    ]
  },
  // Indian
  {
    id: "curry-1",
    name: "Butter Chicken",
    description: "Creamy tomato curry with tender chicken",
    price: 14.99,
    category: "indian",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400",
    isPopular: true,
    cuisine: "Indian",
    addOns: [
      { id: "naan", name: "Butter Naan", price: 2.99 },
      { id: "raita", name: "Raita", price: 1.99 }
    ]
  },
  {
    id: "curry-2",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in spiced curry sauce",
    price: 13.99,
    category: "indian",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400",
    cuisine: "Indian",
    dietary: ["Vegetarian"],
    addOns: [
      { id: "naan", name: "Garlic Naan", price: 3.49 },
      { id: "rice", name: "Jeera Rice", price: 2.99 }
    ]
  },
  {
    id: "biryani-1",
    name: "Chicken Biryani",
    description: "Aromatic rice with spiced chicken and saffron",
    price: 15.99,
    category: "indian",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400",
    cuisine: "Indian",
    addOns: [
      { id: "raita", name: "Raita", price: 1.99 },
      { id: "salan", name: "Mirchi Salan", price: 2.49 }
    ]
  },
  // Italian
  {
    id: "pasta-1",
    name: "Fettuccine Alfredo",
    description: "Creamy pasta with parmesan",
    price: 13.99,
    category: "italian",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400",
    cuisine: "Italian",
    addOns: [
      { id: "chicken", name: "Grilled Chicken", price: 3.99 },
      { id: "mushrooms", name: "Sautéed Mushrooms", price: 2.49 }
    ]
  },
  {
    id: "pizza-1",
    name: "Margherita Pizza",
    description: "Classic tomato, mozzarella, and basil",
    price: 12.99,
    category: "italian",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400",
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 2.49 },
      { id: "truffle-oil", name: "Truffle Oil", price: 3.99 }
    ]
  },
  {
    id: "pizza-2",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella",
    price: 14.99,
    category: "italian",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400",
    cuisine: "Italian",
    addOns: [
      { id: "extra-pepperoni", name: "Extra Pepperoni", price: 2.99 },
      { id: "extra-cheese", name: "Extra Cheese", price: 2.49 }
    ]
  },
  // Japanese
  {
    id: "sushi-1",
    name: "Dragon Roll",
    description: "Eel and cucumber roll with avocado",
    price: 16.99,
    category: "japanese",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400",
    cuisine: "Japanese",
    addOns: [
      { id: "extra-eel", name: "Extra Eel", price: 4.99 },
      { id: "spicy-mayo", name: "Spicy Mayo", price: 0.75 }
    ]
  },
  {
    id: "ramen-1",
    name: "Tonkotsu Ramen",
    description: "Rich pork broth with noodles and chashu",
    price: 15.99,
    category: "japanese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400",
    cuisine: "Japanese",
    addOns: [
      { id: "extra-chashu", name: "Extra Chashu", price: 3.99 },
      { id: "extra-egg", name: "Extra Marinated Egg", price: 1.99 }
    ]
  },
  {
    id: "bento-1",
    name: "Teriyaki Chicken Bento",
    description: "Grilled chicken with rice and sides",
    price: 14.99,
    category: "japanese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400",
    cuisine: "Japanese",
    addOns: [
      { id: "miso-soup", name: "Miso Soup", price: 2.49 },
      { id: "extra-rice", name: "Extra Rice", price: 1.99 }
    ]
  },
  // Mexican
  {
    id: "taco-1",
    name: "Street Tacos",
    description: "Authentic Mexican tacos",
    price: 11.99,
    category: "mexican",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400",
    cuisine: "Mexican",
    addOns: [
      { id: "guacamole", name: "Guacamole", price: 1.99 },
      { id: "extra-salsa", name: "Extra Salsa", price: 0.99 }
    ]
  },
  {
    id: "burrito-1",
    name: "Carne Asada Burrito",
    description: "Grilled steak with rice and beans",
    price: 13.99,
    category: "mexican",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400",
    cuisine: "Mexican",
    addOns: [
      { id: "queso", name: "Queso Dip", price: 2.49 },
      { id: "extra-meat", name: "Extra Meat", price: 3.99 }
    ]
  },
  {
    id: "quesadilla-1",
    name: "Chicken Quesadilla",
    description: "Grilled chicken and cheese in tortilla",
    price: 12.99,
    category: "mexican",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=400",
    cuisine: "Mexican",
    addOns: [
      { id: "sour-cream", name: "Sour Cream", price: 0.99 },
      { id: "pico", name: "Pico de Gallo", price: 1.49 }
    ]
  }
];

export const categories = [
  { 
    id: "beverages",
    name: "Beverages",
    icon: "coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400",
    description: "Hot and cold drinks"
  },
  { 
    id: "indian", 
    name: "Indian", 
    icon: "utensils",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400",
    description: "Authentic Indian cuisine"
  },
  { 
    id: "italian", 
    name: "Italian", 
    icon: "pizza",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400",
    description: "Pizza and pasta specialties"
  },
  { 
    id: "japanese", 
    name: "Japanese", 
    icon: "fish",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400",
    description: "Sushi and more"
  },
  { 
    id: "mexican", 
    name: "Mexican", 
    icon: "chili",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400",
    description: "Authentic Mexican flavors"
  }
];

export const flashSales = [
  {
    id: 1,
    title: "Espresso + Croissant Combo",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400",
    originalPrice: 7.48,
    salePrice: 5.99
  },
  {
    id: 2,
    title: "Vanilla Latte Special",
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400",
    originalPrice: 4.99,
    salePrice: 4.24
  },
  {
    id: 3,
    title: "Garlic Bread Combo",
    discount: "25% OFF",
    image: "https://imgs.search.brave.com/Q0CNoxPFsu7J2_PGezhuL2VDjUoxVR3qAK7GaPYyBuQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9vZGllY3J1c2gu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzA5L0dhcmxp/Yy1CcmVhZC1mb29k/aWVjcnVzaC5jb20t/MDA3LTcyOHgxMDky/LmpwZw",
    originalPrice: 6.99,
    salePrice: 5.24
  }
];

export const cartOffers = [
  {
    id: 1,
    title: "Special Discount",
    description: "Get ₹80 off on orders above ₹500!",
    minAmount: 500,
    discountAmount: 80,
    type: "amount"
  },
  {
    id: 2,
    title: "Add ₹80 more for 10% off",
    description: "Add items worth ₹80 more to get 10% off on your entire order!",
    minAmount: 800,
    discountAmount: 0.1,
    type: "percentage"
  }
];