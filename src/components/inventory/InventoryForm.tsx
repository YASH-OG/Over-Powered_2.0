import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { InventoryItem } from '../../types';

interface InventoryFormProps {
  onSubmit: (item: InventoryItem) => void;
  onCancel: () => void;
  initialData?: InventoryItem | null;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<InventoryItem>({
    id: initialData?.id || '',
    name: '',
    category: '',
    quantity: 0,
    unit: 'pieces',
    reorderLevel: 0,
    supplier: {
      name: '',
      contact: '',
    },
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
    cost: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('supplier.')) {
      const supplierField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        supplier: {
          ...prev.supplier,
          [supplierField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'quantity' || name === 'reorderLevel' || name === 'cost'
          ? parseFloat(value)
          : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          {initialData ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Ingredients">Ingredients</option>
            <option value="Packaging">Packaging</option>
            <option value="Beverages">Beverages</option>
            <option value="Equipment">Equipment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="pieces">Pieces</option>
            <option value="kg">Kilograms</option>
            <option value="liters">Liters</option>
            <option value="boxes">Boxes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reorder Level</label>
          <input
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cost per Unit</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
          <input
            type="text"
            name="supplier.name"
            value={formData.supplier.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier Contact</label>
          <input
            type="text"
            name="supplier.contact"
            value={formData.supplier.contact}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          {initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;