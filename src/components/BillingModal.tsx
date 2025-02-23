import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DigitalOrder, ComboOffer } from '../types';

interface BillingModalProps {
  order: DigitalOrder;
  onClose: () => void;
  onComplete: (paymentMethod: string, splitDetails?: any[]) => void;
  recommendedCombos: ComboOffer[];
}

export function BillingModal({ order, onClose, onComplete, recommendedCombos }: BillingModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [isSplitPayment, setIsSplitPayment] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 5,
    foodQuality: 5,
    service: 5,
    ambience: 5,
    cleanliness: 5,
    comments: ''
  });

  const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const splitAmount = totalAmount / splitCount;

  const handlePayment = () => {
    if (isSplitPayment) {
      const splitDetails = Array.from({ length: splitCount }, (_, i) => ({
        id: `split-${i + 1}`,
        amount: splitAmount,
        status: 'pending'
      }));
      onComplete(paymentMethod, splitDetails);
    } else {
      onComplete(paymentMethod);
    }
    setShowFeedback(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Bill Settlement</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {!showFeedback ? (
            <>
              {/* Bill Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>Total Amount</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Combos */}
              {recommendedCombos.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Special Offers</h3>
                  <div className="space-y-4">
                    {recommendedCombos.map((combo) => (
                      <div key={combo.id} className="border rounded-lg p-4 bg-purple-50">
                        <h4 className="font-medium text-purple-700">{combo.name}</h4>
                        <p className="text-sm text-gray-600">{combo.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="text-purple-600"
                    />
                    <span>Cash</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-purple-600"
                    />
                    <span>Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-purple-600"
                    />
                    <span>UPI</span>
                  </label>
                </div>
              </div>

              {/* Split Payment */}
              <div className="mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isSplitPayment}
                    onChange={(e) => setIsSplitPayment(e.target.checked)}
                    className="text-purple-600"
                  />
                  <span>Split Payment</span>
                </label>
                {isSplitPayment && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Number of splits
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={splitCount}
                      onChange={(e) => setSplitCount(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Amount per person: ₹{splitAmount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Complete Payment
              </button>
            </>
          ) : (
            /* Feedback Form */
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Please Rate Your Experience</h3>
              
              {/* Rating Fields */}
              {['rating', 'foodQuality', 'service', 'ambience', 'cleanliness'].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFeedback(prev => ({ ...prev, [field]: star }))}
                        className={`p-2 ${
                          feedback[field] >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={feedback.comments}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  rows={4}
                />
              </div>

              <button
                onClick={() => {
                  onComplete(paymentMethod, undefined, feedback);
                  onClose();
                }}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}