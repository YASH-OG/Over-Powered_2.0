import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, Bell, Check, Timer } from 'lucide-react';
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
}

export const OrderTracking = ({ order }: Props) => {
  const currentStageIndex = stages.findIndex(stage => stage.id === order.status);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Order Status</h2>
      
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                  <stage.icon className="w-5 h-5" />
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
      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order ID</span>
          <span className="font-medium">{order.id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Table Number</span>
          <span className="font-medium">{order.tableNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Amount</span>
          <span className="font-medium">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Items</h3>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};