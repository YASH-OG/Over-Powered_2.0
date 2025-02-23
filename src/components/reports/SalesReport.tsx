import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Order, ReportFilter } from '../../types';

interface SalesReportProps {
  orders: Order[];
  filters: ReportFilter;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SalesReport: React.FC<SalesReportProps> = ({ orders, filters }) => {
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    
    return orderDate >= startDate && 
           orderDate <= endDate &&
           (filters.channel === 'All' || order.channel === filters.channel) &&
           (filters.paymentMethod === 'All' || order.paymentMethod === filters.paymentMethod);
  });

  // Process data for daily sales chart
  const dailySales = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const dailySalesData = Object.entries(dailySales).map(([date, total]) => ({
    date,
    total: parseFloat(total.toFixed(2))
  }));

  // Process data for payment methods
  const paymentMethodData = filteredOrders.reduce((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  // Channel-wise sales
  const channelSales = filteredOrders.reduce((acc: { [key: string]: number }, order) => {
    acc[order.channel] = (acc[order.channel] || 0) + order.total;
    return acc;
  }, {});

  const channelData = Object.entries(channelSales).map(([channel, total]) => ({
    channel,
    total,
  }));

  // Payment method distribution
  const paymentData = filteredOrders.reduce((acc: { [key: string]: number }, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const paymentChartData = Object.entries(paymentData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* Daily Sales Trend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Sales Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailySalesData}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                fill="url(#totalGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Channel</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(paymentMethodData).map(([method, total]) => ({
                method,
                total: parseFloat(total.toFixed(2))
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']} />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;