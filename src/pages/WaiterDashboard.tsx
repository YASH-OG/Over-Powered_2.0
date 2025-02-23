import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Clock,
  Coffee,
  AlertTriangle,
  CheckCircle,
  Table as TableIcon,
  Plus,
  BarChart,
  UserCheck,
  Bell,
  Trophy,
  Star,
  TrendingUp,
  HandHelping,
  Timer
} from 'lucide-react';
import { useWaiterStore } from '../store/waiterStore';
import { useNotificationStore } from '../store/notificationStore';
import { useOrderStore } from '../store/orderStore';
import { Table, Waiter, Notification, DigitalOrder } from '../types';

function WaiterDashboard() {
  const navigate = useNavigate();
  const {
    waiters,
    tables,
    readyOrders,
    assignedOrders,
    updateWaiterStatus,
    assignTables,
    updateTableStatus,
    createOrder,
    getWaiterEfficiency,
    getAverageOrderTime,
    getTableTurnoverRate,
    assignOrderToWaiter,
    completeOrder
  } = useWaiterStore();

  const [displayMessage, setDisplayMessage] = useState('');
  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter | null>(null);
  const [completedOrders, setCompletedOrders] = useState<Set<string>>(new Set());
  const [orderTimers, setOrderTimers] = useState<{ [key: string]: number }>({});

  // Sort waiters by efficiency for leaderboard
  const sortedWaiters = [...waiters].sort((a, b) => 
    getWaiterEfficiency(b.id) - getWaiterEfficiency(a.id)
  );

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderTimers(prev => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach(orderId => {
          if (newTimers[orderId] > 0) {
            newTimers[orderId] -= 1;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scrolling message effect for new orders
  useEffect(() => {
    if (readyOrders.length === 0) {
      setDisplayMessage('Welcome to Waiter Management System');
      return;
    }

    const messages = readyOrders.map(order => 
      `🔔 Food ready for Table #${order.tableId}! ${order.items.map(i => i.name).join(', ')}`
    );

    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % messages.length);
      setDisplayMessage(messages[displayIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [readyOrders, displayIndex]);

  const handleAcceptOrder = (orderId: string) => {
    if (!selectedWaiter) return;
    assignOrderToWaiter(orderId, selectedWaiter.id);
  };

  const handleMarkComplete = (orderId: string) => {
    completeOrder(orderId);
    setCompletedOrders(prev => new Set([...prev, orderId]));
    setOrderTimers(prev => ({ ...prev, [orderId]: 20 }));
    
    // Remove the order after 20 seconds
    setTimeout(() => {
      setCompletedOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
      setOrderTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[orderId];
        return newTimers;
      });
    }, 20000);
  };

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <h1 className="text-2xl font-bold text-gray-900">Waiter Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Scrolling Message Display */}
      <div className="bg-black text-white py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex overflow-x-hidden">
            <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex items-center text-xl">
              <span className="mx-4">📢</span>
              <span className="text-yellow-400">{displayMessage}</span>
              <span className="mx-16"></span>
              <span className="mx-4">📢</span>
              <span className="text-yellow-400">{displayMessage}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Waiter Selection */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Select Your Profile</h2>
              <div className="grid grid-cols-2 gap-4">
                {waiters.map((waiter) => (
                  <button
                    key={waiter.id}
                    onClick={() => setSelectedWaiter(waiter)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedWaiter?.id === waiter.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium">{waiter.name}</div>
                    <div className="text-sm text-gray-600">
                      {waiter.assignedTables.length} tables assigned
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Ready for Pickup */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <HandHelping className="h-5 w-5 text-orange-500 mr-2" />
                  Orders Ready for Pickup
                </h2>
              </div>
              <div className="p-4">
                {readyOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No orders waiting for pickup</p>
                ) : (
                  <div className="space-y-4">
                    {readyOrders
                      .filter(order => !completedOrders.has(order.id))
                      .map((order) => (
                        <div
                          key={order.id}
                          className="bg-white rounded-lg border border-orange-200 p-4 hover:border-orange-300 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">Table #{order.tableId}</h3>
                              {order.customerNotes && (
                                <p className="text-sm text-purple-600 mt-1">
                                  Note: {order.customerNotes}
                                </p>
                              )}
                              <div className="mt-2 space-y-1">
                                {order.items.map((item, idx) => (
                                  <p key={idx} className="text-sm text-gray-600">
                                    • {item.name} x{item.quantity} (₹{item.price * item.quantity})
                                  </p>
                                ))}
                                <p className="text-sm font-medium text-gray-700">
                                  Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 mt-2">
                                Ready since: {order.createdAt.toLocaleTimeString()}
                              </p>
                              {orderTimers[order.id] !== undefined && (
                                <p className="text-sm text-orange-600 mt-2 flex items-center">
                                  <Timer className="h-4 w-4 mr-1" />
                                  Order served - Removing in {formatTime(orderTimers[order.id])}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col space-y-2">
                              {!orderTimers[order.id] && (
                                <>
                                  {selectedWaiter && (
                                    <button
                                      onClick={() => handleAcceptOrder(order.id)}
                                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                                    >
                                      <HandHelping className="h-5 w-5" />
                                      <span>Accept Order</span>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleMarkComplete(order.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                  >
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Order Served</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Assigned Orders */}
            {selectedWaiter && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Your Active Orders</h2>
                </div>
                <div className="p-4">
                  {assignedOrders
                    .filter(order => 
                      order.waiterId === selectedWaiter.id && 
                      !completedOrders.has(order.id)
                    )
                    .length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No active orders</p>
                  ) : (
                    <div className="space-y-4">
                      {assignedOrders
                        .filter(order => 
                          order.waiterId === selectedWaiter.id && 
                          !completedOrders.has(order.id)
                        )
                        .map((order) => (
                          <div
                            key={order.id}
                            className="bg-white rounded-lg border border-blue-200 p-4 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">Table #{order.tableId}</h3>
                                {order.customerNotes && (
                                  <p className="text-sm text-purple-600 mt-1">
                                    Note: {order.customerNotes}
                                  </p>
                                )}
                                <div className="mt-2 space-y-1">
                                  {order.items.map((item, idx) => (
                                    <p key={idx} className="text-sm text-gray-600">
                                      • {item.name} x{item.quantity} (₹{item.price * item.quantity})
                                    </p>
                                  ))}
                                  <p className="text-sm font-medium text-gray-700">
                                    Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                  Order time: {order.createdAt.toLocaleTimeString()}
                                </p>
                                {orderTimers[order.id] !== undefined && (
                                  <p className="text-sm text-orange-600 mt-2 flex items-center">
                                    <Timer className="h-4 w-4 mr-1" />
                                    Order served - Removing in {formatTime(orderTimers[order.id])}
                                  </p>
                                )}
                              </div>
                              {!orderTimers[order.id] && (
                                <button
                                  onClick={() => handleMarkComplete(order.id)}
                                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                  <span>Order Served</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  Waiter Leaderboard
                </h2>
              </div>
              <div className="p-4">
                {sortedWaiters.map((waiter, index) => {
                  const efficiency = getWaiterEfficiency(waiter.id);
                  const avgOrderTime = getAverageOrderTime(waiter.id);
                  
                  let badgeColor = 'bg-bronze-100 text-bronze-800';
                  if (index === 0) badgeColor = 'bg-yellow-100 text-yellow-800';
                  else if (index === 1) badgeColor = 'bg-gray-100 text-gray-800';
                  
                  return (
                    <div
                      key={waiter.id}
                      className={`mb-4 p-4 rounded-lg ${
                        index === 0 
                          ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${badgeColor} flex items-center justify-center font-bold mr-3`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{waiter.name}</h3>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {efficiency.toFixed(1)}% Efficiency
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Avg. Order Time
                          </div>
                          <div className="font-medium">
                            {avgOrderTime.toFixed(1)} min
                          </div>
                        </div>
                      </div>

                      {/* Performance Graph */}
                      <div className="mt-3">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              index === 0 
                                ? 'bg-yellow-500'
                                : index === 1
                                ? 'bg-gray-500'
                                : 'bg-bronze-500'
                            }`}
                            style={{ width: `${efficiency}%` }}
                          />
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="text-gray-600">Tables Served</div>
                          <div className="font-medium">{waiter.assignedTables.length}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="text-gray-600">Status</div>
                          <div className={`font-medium ${
                            waiter.status === 'active' 
                              ? 'text-green-600'
                              : 'text-gray-600'
                          }`}>
                            {waiter.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WaiterDashboard;