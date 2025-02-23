import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Tag as TagIcon, Flame, Leaf, Wheat, Milk, Egg, Fish, Heart } from 'lucide-react';
import { Tag } from '../../types';
import TagForm from './TagForm';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'flame':
      return Flame;
    case 'leaf':
      return Leaf;
    case 'wheat':
      return Wheat;
    case 'milk':
      return Milk;
    case 'egg':
      return Egg;
    case 'fish':
      return Fish;
    case 'heart':
      return Heart;
    default:
      return TagIcon;
  }
};

const initialTags: Tag[] = [
  {
    id: '1',
    name: 'Spicy',
    color: '#EF4444',
    icon: 'flame',
    description: 'Indicates spicy dishes',
  },
  {
    id: '2',
    name: 'Vegan',
    color: '#10B981',
    icon: 'leaf',
    description: 'Suitable for vegans',
  },
  {
    id: '3',
    name: 'Gluten Free',
    color: '#F59E0B',
    icon: 'wheat',
    description: 'Contains no gluten',
  },
  {
    id: '4',
    name: 'Contains Dairy',
    color: '#3B82F6',
    icon: 'milk',
    description: 'Contains dairy products',
  },
];

const TagMaster: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTag = (newTag: Tag) => {
    setTags([...tags, { ...newTag, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const handleUpdateTag = (updatedTag: Tag) => {
    setTags(tags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag)));
    setShowForm(false);
    setEditingTag(null);
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tags Master</h1>
          <p className="mt-1 text-sm text-gray-500">Manage tags for menu items</p>
        </div>
        <button
          onClick={() => {
            setEditingTag(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Tag
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tags by name or description..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTags.map((tag) => {
          const IconComponent = getIconComponent(tag.icon);
          return (
            <div
              key={tag.id}
              className="bg-white rounded-lg shadow p-4 flex items-start justify-between"
              style={{ borderLeft: `4px solid ${tag.color}` }}
            >
              <div className="flex items-start space-x-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${tag.color}20` }}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: tag.color }}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{tag.name}</h3>
                  <p className="text-sm text-gray-500">{tag.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingTag(tag);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <TagForm
              onSubmit={editingTag ? handleUpdateTag : handleAddTag}
              onCancel={() => {
                setShowForm(false);
                setEditingTag(null);
              }}
              initialData={editingTag}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagMaster;