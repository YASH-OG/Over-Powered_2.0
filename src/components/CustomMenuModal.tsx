import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../types';

interface CustomMenuModalProps {
  onClose: () => void;
  onAdd: (menuItem: MenuItem) => void;
}

export function CustomMenuModal({ onClose, onAdd }: CustomMenuModalProps) {
  const [menuItem, setMenuItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: '',
    section: 'cafe',
    preparationTime: 15,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...menuItem,
      id: `custom-${Date.now()}`,
      isCustom: true
    } as MenuItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add Custom Menu Item</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                required
                value={menuItem.name}
                onChange={(e) => setMenuItem(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={menuItem.price}
                onChange={(e) => setMenuItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                required
                value={menuItem.category}
                onChange={(e) => setMenuItem(prev => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                required
                min="1"
                value={menuItem.preparationTime}
                onChange={(e) => setMenuItem(prev => ({ ...prev, preparationTime: parseInt(e.target.value) }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={menuItem.description}
                onChange={(e) => setMenuItem(prev => ({ ...prev, description: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}