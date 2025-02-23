import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  CreditCard,
  Users,
  Tags,
  Clock,
  Package,
  BarChart3,
} from 'lucide-react';

const modules = [
  {
    id: 'menu',
    title: 'Menu Master',
    description: 'Manage menu items, categories, and pricing',
    icon: Menu,
    path: '/menu',
  },
  {
    id: 'settlement',
    title: 'Settlement Master',
    description: 'Handle payment methods & commissions',
    icon: CreditCard,
    path: '/settlement',
  },
  {
    id: 'users',
    title: 'User Master',
    description: 'Manage roles and permissions',
    icon: Users,
    path: '/users',
  },
  {
    id: 'tags',
    title: 'Tags Master',
    description: 'Categorize items with custom tags',
    icon: Tags,
    path: '/tags',
  },
  {
    id: 'timeline',
    title: 'Timeline Master',
    description: 'Track orders and service times',
    icon: Clock,
    path: '/timeline',
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: 'Manage stock levels and alerts',
    icon: Package,
    path: '/inventory',
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'View analytics and insights',
    icon: BarChart3,
    path: '/reports',
  },
];

const ModuleTiles: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {modules.map((module) => (
        <motion.div
          key={module.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          onClick={() => navigate(module.path)}
        >
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <module.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{module.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ModuleTiles;