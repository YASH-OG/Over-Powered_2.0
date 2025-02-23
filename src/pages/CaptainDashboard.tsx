import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Coffee,
  Plus,
  Minus,
  Trash2,
  Edit2,
  Search,
  Clock,
  CreditCard,
  FileText,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { DigitalOrder, MenuItem, OrderItem } from '../types';
import { BillingModal } from '../components/BillingModal';
import { CustomMenuModal } from '../components/CustomMenuModal';

function CaptainDashboard() {
  const navigate = useNavigate();
  const {
    digitalOrders,
    menuItems,
    updateOrderStatus,
    updateOrderItem,
    addItemToOrder,
    removeItemFromOrder,
    generateSuggestions,
    updateOrderNotes,
    updateCustomerNotes,
    updateOrderPreference,
    updateDeliveryTime,
    updateDelayInfo,
    addCustomMenuItem,
    updatePaymentStatus,
    updateSplitPayment,
    addOrderFeedback,
    getRecommendedCombos
  } = useOrderStore();

  const [selectedOrder, setSelectedOrder] = useState<DigitalOrder | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showCustomMenuModal, setShowCustomMenuModal] = useState(false);
  const [showDelayInfo, setShowDelayInfo] = useState(false);
  const [delayReason, setDelayReason] = useState('');

  const handleOrderAction = (orderId: string, status: 'confirmed' | 'rejected') => {
    updateOrderStatus(orderId, status);
    setSelectedOrder(null);
  };

  const handleQuantityChange = (orderId: string, itemId: string, change: number) => {
    const order = digitalOrders.find(o => o.id === orderId);
    const item = order?.items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateOrderItem(orderId, itemId, { quantity: newQuantity });
      // Update selected order to reflect changes
      const updatedOrder = digitalOrders.find(o => o.id === orderId);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
    }
  };

  const handleNotesChange = (orderId: string, itemId: string, notes: string) => {
    updateOrderItem(orderId, itemId, { notes });
  };

  const handleAddMenuItem = (orderId: string, menuItem: MenuItem) => {
    addItemToOrder(orderId, menuItem);
    // Update selected order to reflect changes
    const updatedOrder = digitalOrders.find(o => o.id === orderId);
    if (updatedOrder) {
      setSelectedOrder(updatedOrder);
    }
  };

  const handleRemoveItem = (orderId: string, itemId: string) => {
    removeItemFromOrder(orderId, itemId);
    // Update selected order to reflect changes
    const updatedOrder = digitalOrders.find(o => o.id === orderId);
    if (updatedOrder) {
      setSelectedOrder(updatedOrder);
    }
  };

  const handleBillingComplete = (
    paymentMethod: string,
    splitDetails?: any[],
    feedback?: any
  ) => {
    if (!selectedOrder) return;

    if (splitDetails) {
      updateSplitPayment(selectedOrder.id, splitDetails);
    }
    
    updatePaymentStatus(selectedOrder.id, 'completed', paymentMethod);
    
    if (feedback) {
      addOrderFeedback(selectedOrder.id, {
        ...feedback,
        timestamp: new Date()
      });
    }

    updateOrderStatus(selectedOrder.id, 'completed');
    setShowBillingModal(false);
    setSelectedOrder(null);
  };

  const handleCustomMenuAdd = (menuItem: MenuItem) => {
    addCustomMenuItem(menuItem);
  };

  const handleDelaySubmit = () => {
    if (selectedOrder && delayReason) {
      updateDelayInfo(selectedOrder.id, delayReason);
      setShowDelayInfo(false);
      setDelayReason('');
    }
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return searchQuery ? matchesSearch : item.category === selectedCategory;
  });

  const currentShift = "12 PM - 8 PM";

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
              <h1 className="text-2xl font-bold text-gray-900">Captain Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Coffee className="h-5 w-5 mr-2" />
                <span>Shift: {currentShift}</span>
              </div>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {digitalOrders.length} Orders
              </div>
              <button
                onClick={() => setShowCustomMenuModal(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add Custom Item</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Orders List */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Digital Orders</h2>
              </div>
              <div className="p-4 space-y-4">
                {digitalOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedOrder?.id === order.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Table #{order.tableId}</h3>
                        <p className="text-sm text-gray-600">
                          {order.items.length} items • ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                        </p>
                        {order.customerNotes && (
                          <p className="text-sm text-purple-600 mt-1">
                            Note: {order.customerNotes}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                        {order.orderPreference && (
                          <span className="text-xs text-gray-500">
                            Serve: {order.orderPreference}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Section */}
            {selectedOrder && selectedOrder.status === 'pending' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Add Items from Menu</h2>
                  <div className="mt-4 relative">
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  {!searchQuery && (
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-full whitespace-nowrap ${
                            selectedCategory === category
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4">
                    {filteredMenuItems.map((item) => {
                      const existingItem = selectedOrder.items.find(orderItem => orderItem.name === item.name);
                      return (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">{item.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="font-medium">₹{item.price.toFixed(2)}</span>
                              {existingItem ? (
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleQuantityChange(selectedOrder.id, existingItem.id, -1)}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="text-sm">{existingItem.quantity}</span>
                                  <button
                                    onClick={() => handleQuantityChange(selectedOrder.id, existingItem.id, 1)}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddMenuItem(selectedOrder.id, item)}
                                  className="text-purple-600 hover:text-purple-800"
                                >
                                  <Plus className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Details & Suggestions */}
          <div className="space-y-6">
            {selectedOrder && (
              <>
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Order Details</h2>
                      {selectedOrder.status === 'confirmed' && (
                        <button
                          onClick={() => setShowBillingModal(true)}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CreditCard className="h-5 w-5" />
                          <span>Process Payment</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Order Preferences */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Order Preferences</h3>
                        <button
                          onClick={() => setShowDelayInfo(true)}
                          className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <span>Report Delay</span>
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Serving Preference
                          </label>
                          <select
                            value={selectedOrder.orderPreference || 'together'}
                            onChange={(e) => updateOrderPreference(selectedOrder.id, e.target.value as 'together' | 'as-ready')}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          >
                            <option value="together">Serve Together</option>
                            <option value="as-ready">Serve As Ready</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Notes
                          </label>
                          <textarea
                            value={selectedOrder.customerNotes || ''}
                            onChange={(e) => updateCustomerNotes(selectedOrder.id, e.target.value)}
                            placeholder="Add notes about customer preferences..."
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <button
                                  onClick={() => handleQuantityChange(selectedOrder.id, item.id, -1)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(selectedOrder.id, item.id, 1)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRemoveItem(selectedOrder.id, item.id)}
                                  className="text-red-500 hover:text-red-700 ml-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <label className="text-sm text-gray-600 block mb-1">Notes for Kitchen</label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.notes || ''}
                                onChange={(e) => handleNotesChange(selectedOrder.id, item.id, e.target.value)}
                                placeholder="Add special instructions..."
                                className="flex-1 text-sm border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                              <Edit2 className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedOrder.status === 'pending' && (
                      <div className="mt-6 flex space-x-4">
                        <button
                          onClick={() => handleOrderAction(selectedOrder.id, 'confirmed')}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Confirm & Send to Kitchen
                        </button>
                        <button
                          onClick={() => handleOrderAction(selectedOrder.id, 'rejected')}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                        >
                          <XCircle className="h-5 w-5 mr-2" />
                          Reject Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Recommended Items</h2>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {generateSuggestions(selectedOrder.items).map((item) => (
                        <div key={item.id} className="p-4 rounded-lg border border-gray-200">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-purple-600 font-medium">₹{item.price.toFixed(2)}</p>
                            <button
                              onClick={() => handleAddMenuItem(selectedOrder.id, item)}
                              className="text-purple-600 hover:text-purple-800"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {showBillingModal && selectedOrder && (
        <BillingModal
          order={selectedOrder}
          onClose={() => setShowBillingModal(false)}
          onComplete={handleBillingComplete}
          recommendedCombos={getRecommendedCombos(
            selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
          )}
        />
      )}

      {showCustomMenuModal && (
        <CustomMenuModal
          onClose={() => setShowCustomMenuModal(false)}
          onAdd={handleCustomMenuAdd}
        />
      )}

      {/* Delay Info Modal */}
      {showDelayInfo && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Report Order Delay</h3>
            <textarea
              value={delayReason}
              onChange={(e) => setDelayReason(e.target.value)}
              placeholder="Enter reason for delay..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 mb-4"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDelayInfo(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelaySubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaptainDashboard;