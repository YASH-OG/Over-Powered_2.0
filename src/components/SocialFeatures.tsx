import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Share2, Instagram, Award, Check, Scan } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onTaskComplete?: () => void;
  showReward?: boolean;
}

export const SocialFeatures = ({ onTaskComplete, showReward }: Props) => {
  const [usedFilter, setUsedFilter] = useState(false);
  const [sharedStory, setSharedStory] = useState(false);
  const [taggedCafe, setTaggedCafe] = useState(false);

  const handleFilterUse = () => {
    setUsedFilter(true);
    toast.success('Snapchat filter applied!');
    checkTaskCompletion();
  };

  const handleShare = () => {
    setSharedStory(true);
    toast.success('Story shared successfully!');
    checkTaskCompletion();
  };

  const handleTag = () => {
    setTaggedCafe(true);
    toast.success('Tagged @CafeDigital!');
    checkTaskCompletion();
  };

  const checkTaskCompletion = () => {
    if (usedFilter && sharedStory && taggedCafe && onTaskComplete) {
      onTaskComplete();
      toast.success('🎉 You\'ve earned a $10 discount on your next order!', {
        duration: 5000,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">Social Corner</h2>
        </div>
        <button 
          onClick={handleShare}
          className={`p-2 rounded-full transition-colors ${
            sharedStory 
              ? 'bg-green-100 text-green-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          {sharedStory ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Snapchat QR Code */}
      <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Get $10 Off! 🎉</h3>
        <p className="text-yellow-700 mb-4">
          Scan this QR code to use our Snapchat filter, share your story, and tag us to receive a $10 discount!
        </p>
        <div className="flex justify-center mb-4">
          <div className="relative w-48 h-48 bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://raw.githubusercontent.com/YASH-OG/Over-Powered_2.0/refs/heads/customer_interface/snapcode.png?token=GHSAT0AAAAAAC4PWYVAAHWNWQPZMXJJXNCAZ52X3QA" 
              alt="Snapchat QR Code"
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-2 right-2">
              <Scan className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
        <div className="text-sm text-yellow-600 text-center">
          Scan with your Snapchat camera
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Complete Social Tasks</h3>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            usedFilter ? 'bg-green-50 text-green-700' : 'bg-gray-50'
          }`}>
            <span>Use our Snapchat filter</span>
            {usedFilter && <Check className="w-5 h-5" />}
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            sharedStory ? 'bg-green-50 text-green-700' : 'bg-gray-50'
          }`}>
            <span>Share your story</span>
            {sharedStory && <Check className="w-5 h-5" />}
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            taggedCafe ? 'bg-green-50 text-green-700' : 'bg-gray-50'
          }`}>
            <span>Tag @CafeDigital</span>
            {taggedCafe && <Check className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Verification Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleFilterUse}
          disabled={usedFilter}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            usedFilter 
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          I've used the filter
        </button>
        <button
          onClick={handleShare}
          disabled={sharedStory}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            sharedStory
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          I've shared my story
        </button>
        <button
          onClick={handleTag}
          disabled={taggedCafe}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            taggedCafe
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          I've tagged @CafeDigital
        </button>
      </div>

      {showReward && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">
              Congratulations! 🎉
            </h3>
          </div>
          <p className="text-green-700 mt-2">
            You've earned ₹10 off your next order! The discount will be automatically applied at checkout.
          </p>
        </div>
      )}
    </div>
  );
};
