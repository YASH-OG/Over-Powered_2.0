import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Utensils, Pizza, Fish, Hotel as ChiliHot, Star, Clock, Tag } from 'lucide-react';
import { menuItems, categories } from '../data/menu';
import toast from 'react-hot-toast';

const icons = {
  coffee: Coffee,
  utensils: Utensils,
  pizza: Pizza,
  fish: Fish,
  chili: ChiliHot,
};

interface Props {
  onAddToCart: (item: any) => void;
}

export const MenuCategories = ({ onAddToCart }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredItems = menuItems.filter(item => 
    (!selectedCategory || item.category === selectedCategory) &&
    (activeFilters.length === 0 || 
      (activeFilters.includes('popular') && item.isPopular) ||
      (activeFilters.includes('limited') && item.isLimited))
  );

  const handleAddToCart = (item: any) => {
    onAddToCart(item);
    toast.success(`Added ${item.name} to cart!`, {
      icon: '🛒',
      position: 'bottom-center',
    });
  };

  if (!selectedCategory) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = icons[category.icon as keyof typeof icons];
            return (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(category.id)}
                className="cursor-pointer overflow-hidden rounded-xl shadow-lg bg-white"
              >
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-5 h-5" />
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                    <p className="text-sm text-white/90">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-primary hover:text-primary/80"
        >
          Back to Categories
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveFilters(prev => 
            prev.includes('popular') 
              ? prev.filter(f => f !== 'popular')
              : [...prev, 'popular']
          )}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
            activeFilters.includes('popular')
              ? 'bg-yellow-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Star className="w-4 h-4" />
          Popular
        </button>
        <button
          onClick={() => setActiveFilters(prev => 
            prev.includes('limited') 
              ? prev.filter(f => f !== 'limited')
              : [...prev, 'limited']
          )}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
            activeFilters.includes('limited')
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          Limited Time
        </button>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.isPopular && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}
              {item.isLimited && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Limited
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                {item.description}
              </p>
              
              {item.funQuote && (
                <p className="text-sm text-primary italic mb-3">
                  "{item.funQuote}"
                </p>
              )}
              
              {item.dietary && item.dietary.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {item.dietary.map((diet) => (
                    <span
                      key={diet}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};