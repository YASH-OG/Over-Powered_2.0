import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate last 7 days of sample data
const generateSampleData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random sales between 2000 and 5000
    const sales = Math.floor(Math.random() * (5000 - 2000) + 2000);
    
    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      sales,
      transactions: Math.floor(sales / 25), // Approximate number of transactions
    });
  }
  
  return data;
};

const data = generateSampleData();

const DailySalesTrend: React.FC = () => {
  return (
    <div className="h-[400px] w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Daily Sales Trend</h3>
          <p className="text-sm text-gray-500">Last 7 days performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Transactions</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="transactionsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#6b7280' }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#6b7280' }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem'
            }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            fill="url(#salesGradient)"
            strokeWidth={2}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="transactions"
            stroke="#22c55e"
            fill="url(#transactionsGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySalesTrend;