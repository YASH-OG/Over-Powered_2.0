import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, Sunrise, Coffee, Sun, Moon, ChefHat, Star, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { getTimeBasedRecommendations } from '../utils/recommendations';

interface TrendingItem {
  name: string;
  orders: number;
  change: number;
  image: string;
  rating: number;
  timeLeft?: string;
}

export const Recommendations = () => {
  const currentHour = new Date().getHours();
  const recommendations = getTimeBasedRecommendations(currentHour);
  
  const [trendingItems] = useState<TrendingItem[]>([
    {
      name: "Margherita Pizza",
      orders: 142,
      change: 12,
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400",
      rating: 4.8,
      timeLeft: "2h"
    },
    {
      name: "Classic Burger",
      orders: 98,
      change: 8,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400",
      rating: 4.6
    },
    {
      name: "Vanilla Latte",
      orders: 86,
      change: -3,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400",
      rating: 4.7,
      timeLeft: "1h"
    }
  ]);

  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? trendingItems : trendingItems.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Trending Items */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold">Trending</h2>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'today'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'week'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.timeLeft && (
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs px-1.5 py-0.5 rounded-bl-lg">
                        {item.timeLeft}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {item.orders} orders
                        </span>
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        item.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change > 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        <span>{Math.abs(item.change)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-transparent h-1">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.orders / 150) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {trendingItems.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-2 text-sm text-primary hover:text-primary/80 font-medium"
            >
              {showAll ? 'Show Less' : 'View All Trending Items'}
            </button>
          )}
        </div>
      </div>

      {/* Time-based Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">Perfect for Now</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 flex items-center gap-4"
            >
              {item.icon === 'sunrise' && <Sunrise className="w-5 h-5 text-orange-500" />}
              {item.icon === 'coffee' && <Coffee className="w-5 h-5 text-brown-500" />}
              {item.icon === 'sun' && <Sun className="w-5 h-5 text-yellow-500" />}
              {item.icon === 'moon' && <Moon className="w-5 h-5 text-blue-500" />}
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Coming Soon!</h2>
        <p className="text-gray-600 mb-4">
          We're bringing the future of dining to your table.
        </p>
        <div className="bg-white/80 backdrop-blur rounded-lg p-4">
          <h3 className="font-medium mb-1">Smart Recommendations</h3>
          <p className="text-sm text-gray-600">
            AI-powered suggestions based on your taste
          </p>
        </div>
      </div>
    </div>
  );
};