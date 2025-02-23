import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, Bell, Check, Timer, ArrowLeft } from 'lucide-react';
import type { Order } from '../types';

const stages = [
  { id: 'pending', icon: Clock, label: 'Order Pending' },
  { id: 'confirmed', icon: Check, label: 'Order Confirmed' },
  { id: 'preparing', icon: ChefHat, label: 'Preparing' },
  { id: 'ready', icon: Bell, label: 'Ready to Serve' },
  { id: 'delivered', icon: Timer, label: 'Delivered' },
];

interface Props {
  order: Order;
  onBack: () => void;
}

export const OrderStatus = ({ order, onBack }: Props) => {
  const currentStageIndex = stages.findIndex(stage => stage.id === order.status);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-8">Order Status</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Stages */}
            <div className="relative flex justify-between">
              {stages.map((stage, index) => {
                const isCompleted = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;
                
                return (
                  <div key={stage.id} className="flex flex-col items-center">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                      animate={{
                        scale: isCurrent ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        repeat: isCurrent ? Infinity : 0,
                        duration: 2,
                      }}
                    >
                      <stage.icon className="w-6 h-6" />
                    </motion.div>
                    <span className={`mt-2 text-sm ${
                      isCompleted ? 'text-primary font-medium' : 'text-gray-400'
                    }`}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details */}
          <div className="mt-12 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">Order ID</span>
                <p className="font-medium">{order.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">Table Number</span>
                <p className="font-medium">{order.tableNumber}</p>
              </div>
            </div>

            {/* Items */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500"> × {item.quantity}</span>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};