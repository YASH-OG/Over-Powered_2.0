import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, BarChart2, PieChart } from 'lucide-react';
import { Order, ReportFilter } from '../../types';
import ReportFilters from './ReportFilters';
import SalesReport from './SalesReport';
import ItemReport from './ItemReport';

// Generate realistic sample data
const generateSampleOrders = (): Order[] => {
  const orders: Order[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Last 30 days

  const menuItems = [
    { id: '1', name: 'Margherita Pizza', basePrice: 12.99, category: 'Pizza' },
    { id: '2', name: 'Pepperoni Pizza', basePrice: 14.99, category: 'Pizza' },
    { id: '3', name: 'Chicken Burger', basePrice: 9.99, category: 'Burger' },
    { id: '4', name: 'French Fries', basePrice: 3.99, category: 'Sides' },
    { id: '5', name: 'Pasta Alfredo', basePrice: 14.99, category: 'Pasta' },
    { id: '6', name: 'Coca Cola', basePrice: 2.50, category: 'Beverages' },
  ];

  // Generate 100 sample orders
  for (let i = 0; i < 100; i++) {
    const orderDate = new Date(startDate);
    orderDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
    
    const items = [];
    const itemCount = Math.floor(Math.random() * 4) + 1; // 1-4 items per order
    
    let total = 0;
    for (let j = 0; j < itemCount; j++) {
      const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const variations = menuItem.category === 'Pizza' 
        ? [['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)]]
        : [];
      
      const price = menuItem.basePrice * (variations[0] === 'Large' ? 1.5 : variations[0] === 'Medium' ? 1.2 : 1);
      total += price * quantity;

      items.push({
        id: `item-${i}-${j}`,
        menuItemId: menuItem.id,
        name: menuItem.name,
        quantity,
        price,
        variations,
      });
    }

    orders.push({
      id: `order-${i}`,
      items,
      total: parseFloat(total.toFixed(2)),
      status: 'completed',
      channel: ['Dine In', 'Takeaway', 'Delivery'][Math.floor(Math.random() * 3)],
      paymentMethod: ['Cash', 'Credit Card', 'Debit Card', 'UPI'][Math.floor(Math.random() * 4)],
      createdAt: orderDate.toISOString(),
    });
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const categories = ['All', 'Pizza', 'Burger', 'Pasta', 'Beverages', 'Sides'];
const channels = ['All', 'Dine In', 'Takeaway', 'Delivery'];
const paymentMethods = ['All', 'Cash', 'Credit Card', 'Debit Card', 'UPI'];

const ReportMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'items'>('sales');
  const [filters, setFilters] = useState<ReportFilter>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    category: 'All',
    channel: 'All',
    paymentMethod: 'All',
  });

  const sampleOrders = generateSampleOrders();

  const handleExport = () => {
    const filteredData = sampleOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      
      return orderDate >= startDate && 
             orderDate <= endDate &&
             (filters.channel === 'All' || order.channel === filters.channel) &&
             (filters.paymentMethod === 'All' || order.paymentMethod === filters.paymentMethod);
    });

    // Create CSV content
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Order ID,Date,Channel,Payment Method,Items,Total\n' +
      filteredData.map(order => {
        return `${order.id},${new Date(order.createdAt).toLocaleDateString()},${order.channel},${order.paymentMethod},"${order.items.map(item => `${item.quantity}x ${item.name}`).join('; ')}",$${order.total}`;
      }).join('\n');

    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">View and analyze sales data and performance metrics</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Export Report
        </motion.button>
      </div>

      <ReportFilters
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
        channels={channels}
        paymentMethods={paymentMethods}
      />

      <div className="mb-6">
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('sales')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'sales' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Sales Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('items')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'items' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PieChart className="w-5 h-5 mr-2" />
            Item Report
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'sales' && <SalesReport orders={sampleOrders} filters={filters} />}
          {activeTab === 'items' && <ItemReport orders={sampleOrders} filters={filters} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ReportMaster;