import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Order, ReportFilter } from '../../types';

interface ItemReportProps {
  orders: Order[];
  filters: ReportFilter;
}

const ItemReport: React.FC<ItemReportProps> = ({ orders, filters }) => {
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    
    return orderDate >= startDate && 
           orderDate <= endDate &&
           (filters.channel === 'All' || order.channel === filters.channel) &&
           (filters.paymentMethod === 'All' || order.paymentMethod === filters.paymentMethod);
  });

  const itemSales = filteredOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      if (!acc[item.name]) {
        acc[item.name] = { name: item.name, quantity: 0, revenue: 0 };
      }
      acc[item.name].quantity += item.quantity;
      acc[item.name].revenue += item.price * item.quantity;
    });
    return acc;
  }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

  const data = Object.values(itemSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)
    .map(item => ({
      ...item,
      revenue: parseFloat(item.revenue.toFixed(2))
    }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-6">Top 10 Items by Revenue</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'revenue' ? `$${value}` : value,
                name === 'revenue' ? 'Revenue' : 'Quantity'
              ]}
            />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ItemReport;