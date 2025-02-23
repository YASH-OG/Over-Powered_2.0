import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Upload } from 'lucide-react';
import { MenuItem } from '../../types';
import MenuItemForm from './MenuItemForm';
import { parseMenuCSV } from '../../utils/csvHelper';

const initialItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Pizza',
    subCategory: 'Vegetarian',
    tax: 5,
    packagingCharge: 2,
    productCost: 8,
    variations: [
      { name: 'Small', price: 12.99 },
      { name: 'Medium', price: 15.99 },
      { name: 'Large', price: 18.99 },
    ],
  },
  {
    id: '2',
    name: 'Chicken Burger',
    category: 'Burgers',
    subCategory: 'Non-Vegetarian',
    tax: 5,
    packagingCharge: 1.5,
    productCost: 6,
    variations: [
      { name: 'Classic', price: 9.99 },
      { name: 'Double', price: 13.99 },
    ],
  },
  {
    id: '3',
    name: 'Caesar Salad',
    category: 'Salads',
    subCategory: 'Vegetarian',
    tax: 5,
    packagingCharge: 1,
    productCost: 4,
    variations: [
      { name: 'Regular', price: 8.99 },
      { name: 'Large', price: 11.99 },
    ],
  },
  {
    id: '4',
    name: 'Spicy Chicken Wings',
    category: 'Appetizers',
    subCategory: 'Non-Vegetarian',
    tax: 5,
    packagingCharge: 1.5,
    productCost: 7,
    variations: [
      { name: '6 pieces', price: 9.99 },
      { name: '12 pieces', price: 17.99 },
      { name: '18 pieces', price: 24.99 },
    ],
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    subCategory: 'Vegetarian',
    tax: 5,
    packagingCharge: 1,
    productCost: 3,
    variations: [
      { name: 'Single', price: 5.99 },
      { name: 'With Ice Cream', price: 7.99 },
    ],
  },
  {
    id: '6',
    name: 'Grilled Salmon',
    category: 'Main Course',
    subCategory: 'Non-Vegetarian',
    tax: 5,
    packagingCharge: 2,
    productCost: 12,
    variations: [
      { name: 'Regular', price: 22.99 },
      { name: 'Large', price: 28.99 },
    ],
  },
  {
    id: '7',
    name: 'Mushroom Risotto',
    category: 'Main Course',
    subCategory: 'Vegetarian',
    tax: 5,
    packagingCharge: 1.5,
    productCost: 7,
    variations: [
      { name: 'Regular', price: 14.99 },
      { name: 'Large', price: 18.99 },
    ],
  }
];

const MenuMaster: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [csvUploadError, setCsvUploadError] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (newItem: MenuItem) => {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleUpdateItem = (updatedItem: MenuItem) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCsvUploadError('');

    if (file) {
      try {
        const text = await file.text();
        const newItems = parseMenuCSV(text);
        
        if (newItems.length === 0) {
          setCsvUploadError('No valid items found in CSV file');
          return;
        }

        // Add default variations and IDs
        const itemsWithVariations = newItems.map(item => ({
          ...item,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          variations: [
            { 
              name: 'Regular', 
              price: Math.round((item.productCost || 0) * 2.5) // Example markup
            }
          ]
        })) as MenuItem[];

        setItems(prev => [...prev, ...itemsWithVariations]);
        event.target.value = ''; // Reset input
        
        // Show success message or notification
        console.log(`Added ${itemsWithVariations.length} items successfully`);
        
      } catch (error) {
        setCsvUploadError('Error processing CSV file. Please check the format.');
        console.error('CSV Processing Error:', error);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Master</h1>
        <div className="flex space-x-4">
          {/* CSV Upload Button */}
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5 mr-2" />
              Add Menu With CSV
            </label>
            {csvUploadError && (
              <div className="absolute top-full mt-2 w-full bg-red-50 text-red-600 text-sm p-2 rounded">
                {csvUploadError}
              </div>
            )}
          </div>

          {/* Existing Add New Item button */}
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
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.subCategory}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tax}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${Math.min(...item.variations.map(v => v.price))} - ${Math.max(...item.variations.map(v => v.price))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditItem(item)}
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
            <MenuItemForm
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

export default MenuMaster;