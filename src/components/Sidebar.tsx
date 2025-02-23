import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutDashboard, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  CreditCard,
  Users,
  Tags,
  Clock,
  Package,
  BarChart3,
  Settings,
} from 'lucide-react';

// Separate master modules
const masterModules = [
  {
    id: 'menu',
    title: 'Menu Master',
    icon: Menu,
    path: '/menu',
  },
  {
    id: 'settlement',
    title: 'Settlement Master',
    icon: CreditCard,
    path: '/settlement',
  },
  {
    id: 'users',
    title: 'User Master',
    icon: Users,
    path: '/users',
  },
  {
    id: 'tags',
    title: 'Tags Master',
    icon: Tags,
    path: '/tags',
  },
  {
    id: 'timeline',
    title: 'Timeline Master',
    icon: Clock,
    path: '/timeline',
  },
];

// Other modules
const mainModules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: Package,
    path: '/inventory',
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: BarChart3,
    path: '/reports',
  },
];

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isMasterActive = masterModules.some(module => isActive(module.path));

  // Enhanced dropdown animations
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      scale: 0.95,
      transition: {
        duration: 0.15, // Reduced from 0.2
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.02, // Reduced from 0.05
        when: "beforeChildren"
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      scale: 1,
      transition: {
        duration: 0.2, // Reduced from 0.3
        ease: [0, 0.71, 0.2, 1.01],
        staggerChildren: 0.03, // Reduced from 0.07
        when: "beforeChildren",
        delayChildren: 0.05 // Reduced from 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -10,
      transition: {
        duration: 0.1 // Reduced from 0.2
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.15 // Reduced from 0.3
      }
    }
  };

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isExpanded ? 280 : 64 }}
      className="h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-20 overflow-y-auto"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="p-4">
        {/* Logo Section */}
        <div className={`mb-6 ${isExpanded ? 'px-2' : 'flex justify-center'}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            {isExpanded ? (
              <div className="flex flex-col items-center space-y-2">
                <img 
                  src="/assets/logo.png" 
                  alt="POS System Logo" 
                  className="w-40 h-40 object-contain"
                />
                <span className="font-medium text-gray-700 text-2xl">POS System</span> 
              </div>
            ) : (
              <img 
                src="/assets/logo.png" 
                alt="POS System Logo" 
                className="w-12 h-12 object-contain"
              />
            )}
          </motion.div>
        </div>

        {isExpanded ? (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-4">NAVIGATION</h3>
            <div className="space-y-1">
              {/* Main Modules */}
              {mainModules.map((module) => (
                <motion.button
                  key={module.id}
                  onClick={() => navigate(module.path)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(module.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <module.icon size={20} />
                  <span className="text-sm font-medium">{module.title}</span>
                </motion.button>
              ))}

              {/* Enhanced Master Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsMasterOpen(!isMasterOpen)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isMasterActive || isMasterOpen
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Settings size={20} />
                    <span className="text-sm font-medium">Masters</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isMasterOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isMasterOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {masterModules.map((module) => (
                        <motion.button
                          key={module.id}
                          variants={itemVariants}
                          onClick={() => navigate(module.path)}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive(module.path)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <module.icon size={20} />
                          <span className="text-sm font-medium">{module.title}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col items-center">
            {/* Collapsed view with enhanced animations */}
            {mainModules.map((module) => (
              <motion.button
                key={module.id}
                onClick={() => navigate(module.path)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  isActive(module.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <module.icon size={20} />
              </motion.button>
            ))}
            <motion.button
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                isMasterActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings size={20} />
            </motion.button>
            <AnimatePresence>
              {isMasterOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="space-y-2"
                >
                  {masterModules.map((module) => (
                    <motion.button
                      key={module.id}
                      variants={itemVariants}
                      onClick={() => navigate(module.path)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-lg transition-colors ${
                        isActive(module.path)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <module.icon size={20} />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;