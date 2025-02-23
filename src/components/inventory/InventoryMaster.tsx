import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { InventoryItem } from '../../types';
import InventoryForm from './InventoryForm';

const initialItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Rice',
    category: 'Ingredients',
    quantity: 50,
    unit: 'kg',
    reorderLevel: 20,
    supplier: {
      name: 'Global Foods Inc.',
      contact: '+1-234-567-8900',
    },
    lastUpdated: '2024-03-15T10:00:00Z',
    status: 'in-stock',
    cost: 2.5,
  },
  {
    id: '2',
    name: 'Takeaway Boxes',
    category: 'Packaging',
    quantity: 150,
    unit: 'pieces',
    reorderLevel: 100,
    supplier: {
      name: 'Package Solutions Ltd.',
      contact: '+1-234-567-8901',
    },
    lastUpdated: '2024-03-15T09:30:00Z',
    status: 'low-stock',
    cost: 0.5,
  },
  {
    id: '3',
    name: 'Cooking Oil',
    category: 'Ingredients',
    quantity: 25,
    unit: 'liters',
    reorderLevel: 30,
    supplier: {
      name: 'Quality Oils Co.',
      contact: '+1-234-567-8902',
    },
    lastUpdated: '2024-03-15T08:45:00Z',
    status: 'low-stock',
    cost: 3.75,
  },
];

const InventoryMaster: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return selectedCategory === 'all' ? matchesSearch : matchesSearch && item.category === selectedCategory;
  });

  const handleAddItem = (newItem: InventoryItem) => {
    const status = newItem.quantity <= newItem.reorderLevel
      ? newItem.quantity === 0 ? 'out-of-stock' : 'low-stock'
      : 'in-stock';

    setItems([...items, { 
      ...newItem, 
      id: Date.now().toString(),
      status,
      lastUpdated: new Date().toISOString()
    }]);
    setShowForm(false);
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    const status = updatedItem.quantity <= updatedItem.reorderLevel
      ? updatedItem.quantity === 0 ? 'out-of-stock' : 'low-stock'
      : 'in-stock';

    setItems(items.map((item) => 
      item.id === updatedItem.id 
        ? { ...updatedItem, status, lastUpdated: new Date().toISOString() }
        : item
    ));
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['all', ...new Set(items.map(item => item.category))];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Master</h1>
          <p className="mt-1 text-sm text-gray-500">Manage inventory items and stock levels</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Item
        </button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, category, or supplier..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">Last updated: {new Date(item.lastUpdated).toLocaleString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                  <div className="text-sm text-gray-500">Reorder at: {item.reorderLevel} {item.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status === 'in-stock' && <RefreshCw className="w-4 h-4 mr-1" />}
                    {item.status === 'low-stock' && <AlertTriangle className="w-4 h-4 mr-1" />}
                    {item.status === 'out-of-stock' && <AlertTriangle className="w-4 h-4 mr-1" />}
                    {item.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.supplier.name}</div>
                  <div className="text-sm text-gray-500">{item.supplier.contact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <InventoryForm
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              initialData={editingItem}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryMaster;