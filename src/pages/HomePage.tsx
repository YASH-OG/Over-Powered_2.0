import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, UserCog, Clipboard } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* <h1 className="text-3xl font-bold text-gray-900">Restaurant Management System</h1> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Captain Management Tile */}
          <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
            onClick={() => navigate('/captain')}
          >
            <div className="p-8">
              <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <Clipboard className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Captain Dashboard</h2>
              <p className="text-gray-600">
                Manage digital orders, review customer preferences, and provide personalized recommendations.
              </p>
              <div className="mt-6 flex items-center text-purple-600">
                <span className="font-medium">Enter System</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Kitchen Display System Tile */}
          <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
            onClick={() => navigate('/kds')}
          >
            <div className="p-8">
              <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kitchen Display System</h2>
              <p className="text-gray-600">
                Section-wise order management, real-time updates, and kitchen workflow optimization.
              </p>
              <div className="mt-6 flex items-center text-orange-600">
                <span className="font-medium">Enter System</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Waiter Management Tile */}
          <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
            onClick={() => navigate('/waiter')}
          >
            <div className="p-8">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <UserCog className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Waiter Management</h2>
              <p className="text-gray-600">
                Automated order assignment, table management, and service tracking system.
              </p>
              <div className="mt-6 flex items-center text-blue-600">
                <span className="font-medium">Enter System</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;