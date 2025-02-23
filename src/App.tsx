import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MenuMaster from './components/menu/MenuMaster';
import SettlementMaster from './components/settlement/SettlementMaster';
import UserMaster from './components/user/UserMaster';
import TagMaster from './components/tags/TagMaster';
import TimelineMaster from './components/timeline/TimelineMaster';
import InventoryMaster from './components/inventory/InventoryMaster';
import ReportMaster from './components/reports/ReportMaster';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/animations/PageTransition';
import './styles/animations.css';

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <AnimatePresence mode="wait">
          <main 
            className={`flex-1 ${sidebarExpanded ? 'ml-[280px]' : 'ml-[64px]'} 
            transition-all duration-300 custom-scrollbar`}
          >
            <PageTransition>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/menu" element={<MenuMaster />} />
                <Route path="/settlement" element={<SettlementMaster />} />
                <Route path="/users" element={<UserMaster />} />
                <Route path="/tags" element={<TagMaster />} />
                <Route path="/timeline" element={<TimelineMaster />} />
                <Route path="/inventory" element={<InventoryMaster />} />
                <Route path="/reports" element={<ReportMaster />} />
              </Routes>
            </PageTransition>
          </main>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;