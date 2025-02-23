import React from 'react';
import { motion } from 'framer-motion';
import SalesChart from './charts/SalesChart';
import CustomerInsights from './charts/CustomerInsights';
import AnimatedContainer from './animations/AnimatedContainer';
import DailySalesTrend from './charts/DailySalesTrend';

const Dashboard: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-6 custom-scrollbar"
    >
      {/* Key Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <AnimatedContainer delay={0.1}>
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-xl shadow-sm hover-card"
            variants={cardVariants}
          >
            <h3 className="text-sm font-medium text-gray-500">Daily Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$2,390</p>
            <span className="text-sm text-green-500">+12.5% from yesterday</span>
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2}>
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-xl shadow-sm hover-card"
            variants={cardVariants}
          >
            <h3 className="text-sm font-medium text-gray-500">Orders Today</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">247</p>
            <span className="text-sm text-green-500">+5.3% from yesterday</span>
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3}>
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-xl shadow-sm hover-card"
            variants={cardVariants}
          >
            <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$32.50</p>
            <span className="text-sm text-red-500">-2.1% from yesterday</span>
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.4}>
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-xl shadow-sm hover-card"
            variants={cardVariants}
          >
            <h3 className="text-sm font-medium text-gray-500">Active Tables</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">18/24</p>
            <span className="text-sm text-gray-500">75% occupancy</span>
          </motion.div>
        </AnimatedContainer>
      </motion.div>

      {/* Add Daily Sales Trend Chart */}
      <AnimatedContainer delay={0.4}>
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm"
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
          }}
          variants={cardVariants}
        >
          <DailySalesTrend />
        </motion.div>
      </AnimatedContainer>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedContainer delay={0.5}>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="chart-container"
            >
              <SalesChart />
            </motion.div>
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.6}>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold mb-4">Customer Insights</h3>
            <CustomerInsights />
          </motion.div>
        </AnimatedContainer>
      </div>

      {/* Additional Analytics */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <AnimatedContainer delay={0.7}>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Margherita Pizza</span>
                <span className="text-gray-900 font-medium">142 orders</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chicken Wings</span>
                <span className="text-gray-900 font-medium">98 orders</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Caesar Salad</span>
                <span className="text-gray-900 font-medium">76 orders</span>
              </div>
            </div>
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.8}>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold mb-4">Service Time Analysis</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Preparation Time</span>
                <span className="text-gray-900 font-medium">18 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Service Time</span>
                <span className="text-gray-900 font-medium">25 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Table Turnover</span>
                <span className="text-gray-900 font-medium">45 mins</span>
              </div>
            </div>
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.9}>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold mb-4">Inventory Alerts</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-red-500">
                <span>Mozzarella Cheese</span>
                <span>Low Stock (2kg)</span>
              </div>
              <div className="flex justify-between items-center text-yellow-500">
                <span>Tomato Sauce</span>
                <span>Medium Stock (5L)</span>
              </div>
              <div className="flex justify-between items-center text-green-500">
                <span>Olive Oil</span>
                <span>Sufficient (8L)</span>
              </div>
            </div>
          </motion.div>
        </AnimatedContainer>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
