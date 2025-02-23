import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Timer, Star } from 'lucide-react';
import { flashSales } from '../data/menu';
import toast from 'react-hot-toast';

interface Props {
  onAddToCart: (item: any) => void;
}

export const FlashSales = ({ onAddToCart }: Props) => {
  const handleAddToCart = (sale: any) => {
    onAddToCart({
      id: `flash-${sale.id}`,
      name: sale.title,
      price: sale.salePrice,
      quantity: 1
    });
    toast.success(`Added ${sale.title} to cart!`);
  };

  return (
    <div className="w-full overflow-hidden py-6">
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-red-500 w-6 h-6" />
          <h2 className="text-xl font-bold">Special Offers</h2>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">Limited Time Only!</span>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x">
        {flashSales.map((sale) => (
          <motion.div
            key={sale.id}
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-lg snap-center"
          >
            <div className="relative">
              <img 
                src={sale.image} 
                alt={sale.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {sale.discount}
              </div>
              {sale.id === 1 && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Best Seller
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{sale.title}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through text-sm">
                    ${sale.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-primary font-bold text-lg">
                    ${sale.salePrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>2h left</span>
                </div>
              </div>
              
              <button
                onClick={() => handleAddToCart(sale)}
                className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AR Menu Preview */}
      <div className="mt-8 px-4">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400"
              alt="Coffee AR"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">AR Menu Coming Soon!</h3>
            <p className="text-gray-600 mb-4">
              Experience our menu in augmented reality. See your food in 3D before ordering!
            </p>
            <div className="flex items-center gap-2 text-primary font-medium">
              <Star className="w-5 h-5" />
              <span>Join the waitlist for early access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};