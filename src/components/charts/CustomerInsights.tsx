import React from 'react';

const CustomerInsights: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Customer Insights</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-semibold text-blue-600">247</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-xl font-semibold text-green-600">$32.50</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;