import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Share2, Calculator, DollarSign } from 'lucide-react';
import type { TableInfo } from '../types';

interface Props {
  tableInfo: TableInfo;
}

export const TableFeatures = ({ tableInfo }: Props) => {
  const [showBillSplit, setShowBillSplit] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const currentTotal = tableInfo.currentOrder?.total || 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Table #{tableInfo.number}</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setShowBillSplit(true)}
          className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Calculator className="w-5 h-5 text-primary" />
          <span className="font-medium">Split Bill</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-medium">Share Table</span>
        </button>
      </div>

      {/* Bill Split Modal */}
      <AnimatePresence>
        {showBillSplit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowBillSplit(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl z-50 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold mb-4">Split Bill</h3>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setSplitCount(Math.max(2, splitCount - 1))}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  -
                </button>
                <span className="text-2xl font-semibold">{splitCount}</span>
                <button
                  onClick={() => setSplitCount(splitCount + 1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  +
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Bill</span>
                  <span className="font-semibold">${currentTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-primary font-medium">
                  <span>Each Person Pays</span>
                  <span>${(currentTotal / splitCount).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowBillSplit(false)}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Done
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Previous Orders */}
      {tableInfo.previousOrders.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Previous Orders</h3>
          <div className="space-y-3">
            {tableInfo.previousOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {order.items.length} items
                    </p>
                  </div>
                </div>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};