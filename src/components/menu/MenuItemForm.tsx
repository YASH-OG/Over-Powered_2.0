import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem, Variation } from '../../types';

interface MenuItemFormProps {
  onSubmit: (item: MenuItem) => void;
  onCancel: () => void;
  initialData?: MenuItem | null;
}

const emptyVariation: Variation = { name: '', price: 0 };

const MenuItemForm: React.FC<MenuItemFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<MenuItem>({
    id: initialData?.id || '',
    name: '',
    category: '',
    subCategory: '',
    tax: 0,
    packagingCharge: 0,
    productCost: 0,
    variations: [{ ...emptyVariation }],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tax' || name === 'packagingCharge' || name === 'productCost'
        ? parseFloat(value)
        : value,
    }));
  };

  const handleVariationChange = (index: number, field: keyof Variation, value: string) => {
    const newVariations = [...formData.variations];
    newVariations[index] = {
      ...newVariations[index],
      [field]: field === 'price' ? parseFloat(value) : value,
    };
    setFormData((prev) => ({ ...prev, variations: newVariations }));
  };

  const addVariation = () => {
    setFormData((prev) => ({
      ...prev,
      variations: [...prev.variations, { ...emptyVariation }],
    }));
  };

  const removeVariation = (index: number) => {
    if (formData.variations.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variations: prev.variations.filter((_, i) => i !== index),
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
          {initialData ? 'Edit Menu Item' : 'Add New Menu Item'}
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
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sub Category</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tax (%)</label>
          <input
            type="number"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Packaging Charge</label>
          <input
            type="number"
            name="packagingCharge"
            value={formData.packagingCharge}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Cost</label>
          <input
            type="number"
            name="productCost"
            value={formData.productCost}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Variations</label>
          <button
            type="button"
            onClick={addVariation}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Variation
          </button>
        </div>

        {formData.variations.map((variation, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={variation.name}
                onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                placeholder="Variation Name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={variation.price}
                onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                placeholder="Price"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <button
              type="button"
              onClick={() => removeVariation(index)}
              className="text-red-600 hover:text-red-700"
              disabled={formData.variations.length === 1}
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
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

export default MenuItemForm;