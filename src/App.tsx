import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CaptainDashboard from './pages/CaptainDashboard';
import KitchenDisplay from './pages/KitchenDisplay';
import WaiterDashboard from './pages/WaiterDashboard';
import logo from './logo.png'; // Import the logo

// Create a separate component for the routes
function AppRoutes() {
  // Navigation logic can go here since it's inside Router context
  React.useEffect(() => {
    const currentPath = sessionStorage.getItem('currentPath');
    if (currentPath) {
      // Use navigate here
    }
  }, []);

  const handleRouteChange = (path: string) => {
    sessionStorage.setItem('currentPath', path);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-2"> {/* Centered content */}
          <img src={logo} alt="RMS Logo" className="h-40" /> {/* Increased logo size */}
          <h1 className="text-4xl font-semibold">Restaurant Management System</h1> {/* Increased text size */}
        </div>
      </header>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage />} 
          onEnter={() => handleRouteChange('/')}
        />
        <Route 
          path="/captain" 
          element={<CaptainDashboard />} 
          onEnter={() => handleRouteChange('/captain')}
        />
        <Route 
          path="/kds" 
          element={<KitchenDisplay />} 
          onEnter={() => handleRouteChange('/kds')}
        />
        <Route 
          path="/waiter" 
          element={<WaiterDashboard />} 
          onEnter={() => handleRouteChange('/waiter')}
        />
      </Routes>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;