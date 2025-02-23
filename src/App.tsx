import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { FlashSales } from './components/FlashSales';
import { MenuCategories } from './components/MenuCategories';
import { ShoppingCart } from './components/ShoppingCart';
import { OrderStatus } from './components/OrderStatus';
import { SocialFeatures } from './components/SocialFeatures';
import { TableGames } from './components/TableGames';
import { Recommendations } from './components/Recommendations';
import { Coffee } from 'lucide-react';
import { cartOffers } from './data/menu';
import { motion } from 'framer-motion';

function App() {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [socialTaskCompleted, setSocialTaskCompleted] = useState(false);

  const handleAddToCart = (item: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const eligibleOffer = cartOffers.find(offer => cartTotal >= offer.minAmount);

  if (currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <OrderStatus 
            order={currentOrder} 
            onBack={() => setCurrentOrder(null)} 
          />
          <div className="space-y-6">
            <TableGames />
            <SocialFeatures 
              onTaskComplete={() => setSocialTaskCompleted(true)} 
              showReward={socialTaskCompleted}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Coffee className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.h1 
                className="text-2xl font-bold text-gray-900"
                whileHover={{ y: [-1, 1, -1, 1, 0] }}
                transition={{ duration: 0.3 }}
              >
                Café Digital Menu
              </motion.h1>
            </motion.div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-primary">
                Table #42
              </button>
              <ShoppingCart 
                onOrderPlaced={(order) => setCurrentOrder(order)}
                items={cartItems}
                setItems={setCartItems}
                eligibleOffer={eligibleOffer}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SearchBar />
            <FlashSales onAddToCart={handleAddToCart} />
            <MenuCategories onAddToCart={handleAddToCart} />
          </div>
          <div>
            <Recommendations />
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-inner mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SocialFeatures 
                onTaskComplete={() => setSocialTaskCompleted(true)}
                showReward={socialTaskCompleted}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact & Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>123 Main Street</p>
                <p>New York, NY 10001</p>
                <p>+1 (555) 123-4567</p>
                <p className="mt-4">
                  <strong>Hours:</strong><br />
                  Mon-Fri: 7am - 10pm<br />
                  Sat-Sun: 8am - 11pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;