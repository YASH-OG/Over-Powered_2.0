import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChefHat,
  Utensils,
  BarChart,
  Bell,
  Send
} from 'lucide-react';
import { useKitchenStore } from '../store/kitchenStore';
import { Order, OrderItem, KitchenSection } from '../types';
import { useNotificationStore } from '../store/notificationStore';
import { useWaiterStore } from '../store/waiterStore';

function KitchenDisplay() {
  const navigate = useNavigate();
  const {
    sections,
    activeOrders,
    batches,
    updateItemStatus,
    markItemDispatched,
    markOrderDispatched,
    getAveragePreparationTime,
    getKitchenEfficiency,
    getPendingOrdersCount
  } = useKitchenStore();

  const addNotification = useNotificationStore((state) => state.addNotification);
  const { waiters } = useWaiterStore();

  const [selectedSection, setSelectedSection] = useState<string>(sections[0].id);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Simulate receiving notifications
    const interval = setInterval(() => {
      const pendingOrders = getPendingOrdersCount();
      if (pendingOrders > 0) {
        setNotifications(prev => [
          ...prev,
          `${pendingOrders} orders pending in the kitchen`
        ].slice(-5));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [getPendingOrdersCount]);

  const currentSection = sections.find(s => s.id === selectedSection);
  
  const sectionOrders = activeOrders.filter(order => 
    order.items.some(item => item.section === selectedSection)
  ).map(order => ({
    ...order,
    items: order.items.filter(item => item.section === selectedSection)
  }));

  const handleStatusUpdate = (orderId: string, itemId: string, status: OrderItem['status']) => {
    updateItemStatus(orderId, itemId, status);
    
    // Add notification
    setNotifications(prev => [
      ...prev,
      `Item status updated to ${status}`
    ].slice(-5));
  };

  const handleDispatchItem = (orderId: string, itemId: string) => {
    markItemDispatched(orderId, itemId);
    
    // Check if all items in the order are dispatched
    const order = activeOrders.find(o => o.id === orderId);
    if (order && order.items.every(item => item.status === 'dispatched')) {
      markOrderDispatched(orderId);
      
      // Add notification for waiters with complete order details
      addNotification({
        id: `notif-${Date.now()}`,
        orderId: order.id,
        tableId: order.tableId,
        message: `Order for Table #${order.tableId} is ready to serve`,
        type: 'ready',
        timestamp: new Date(),
        isRead: false,
        isAccepted: false,
        assignedWaiterId: order.waiterId, // If order already has assigned waiter
        orderDetails: {
          items: order.items,
          totalAmount: order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      });
    }
  };

  const getItemPriorityClass = (item: OrderItem) => {
    if (item.priority === 'high') return 'bg-red-100 text-red-800';
    if (item.priority === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const renderAnalytics = () => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">Kitchen Efficiency</h3>
        <p className="text-2xl font-bold text-purple-600">
          {getKitchenEfficiency().toFixed(1)}%
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
        <p className="text-2xl font-bold text-orange-600">
          {getPendingOrdersCount()}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">Avg. Preparation Time</h3>
        <p className="text-2xl font-bold text-blue-600">
          {getAveragePreparationTime(currentSection?.cuisine || 'all').toFixed(1)} min
        </p>
      </div>
    </div>
  );

  const renderBatches = () => (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Active Batches</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {batches
            .filter(batch => batch.status !== 'completed')
            .map(batch => (
              <div
                key={batch.id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Batch #{batch.id}</h3>
                    <p className="text-sm text-gray-600">
                      {batch.items.length} items • Expected completion: {
                        new Date(batch.expectedCompletionTime).toLocaleTimeString()
                      }
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    batch.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {batch.status}
                  </div>
                </div>
                <div className="space-y-2">
                  {batch.items.map(item => (
                    <div
                      key={item.id}
                      className="text-sm text-gray-600 flex justify-between items-center"
                    >
                      <span>{item.name} x{item.quantity}</span>
                      <span>{item.preparationTime} min</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Kitchen Display System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell
                  className="h-6 w-6 text-gray-600 cursor-pointer"
                  onClick={() => setNotifications([])}
                />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Analytics Dashboard */}
        {renderAnalytics()}

        {/* Section Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-4 px-4" aria-label="Tabs">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`px-3 py-4 text-sm font-medium border-b-2 ${
                    selectedSection === section.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Batches */}
        {renderBatches()}

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Table #{order.tableId}</h3>
                    <p className="text-sm text-gray-600">
                      Order #{order.id}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'preparing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          getItemPriorityClass(item)
                        }`}>
                          {item.priority || 'normal'}
                        </div>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-600 mb-2">
                          Note: {item.notes}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusUpdate(order.id, item.id, 'preparing')}
                            className={`px-2 py-1 rounded text-xs ${
                              item.status === 'preparing'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Preparing
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(order.id, item.id, 'ready')}
                            className={`px-2 py-1 rounded text-xs ${
                              item.status === 'ready'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Ready
                          </button>
                        </div>
                        {item.status === 'ready' && (
                          <button
                            onClick={() => handleDispatchItem(order.id, item.id)}
                            className="flex items-center space-x-1 text-purple-600 hover:text-purple-800"
                          >
                            <Send className="h-4 w-4" />
                            <span className="text-xs">Dispatch</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Notifications</h3>
              <button
                onClick={() => setNotifications([])}
                className="text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                >
                  {notification}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KitchenDisplay;