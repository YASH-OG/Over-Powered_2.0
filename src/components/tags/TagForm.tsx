import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Tag } from '../../types';

interface TagFormProps {
  onSubmit: (tag: Tag) => void;
  onCancel: () => void;
  initialData?: Tag | null;
}

const TagForm: React.FC<TagFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Tag>({
    id: initialData?.id || '',
    name: '',
    color: '#3B82F6',
    icon: 'tag',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const iconOptions = [
    { value: 'tag', label: 'Tag' },
    { value: 'flame', label: 'Spicy' },
    { value: 'leaf', label: 'Vegan' },
    { value: 'wheat', label: 'Gluten' },
    { value: 'milk', label: 'Dairy' },
    { value: 'egg', label: 'Egg' },
    { value: 'fish', label: 'Seafood' },
    { value: 'heart', label: 'Healthy' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          {initialData ? 'Edit Tag' : 'Add New Tag'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
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
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={formData.color}
              onChange={handleChange}
              name="color"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Icon</label>
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {iconOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          {initialData ? 'Update Tag' : 'Add Tag'}
        </button>
      </div>
    </form>
  );
};

export default TagForm;