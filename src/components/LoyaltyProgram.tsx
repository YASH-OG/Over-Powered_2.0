import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Coffee, Star } from 'lucide-react';
import type { LoyaltyInfo } from '../types';

interface Props {
  loyalty: LoyaltyInfo;
}

const tiers = {
  bronze: { color: 'bg-amber-600', icon: Coffee },
  silver: { color: 'bg-gray-400', icon: Star },
  gold: { color: 'bg-yellow-500', icon: Trophy },
};

export const LoyaltyProgram = ({ loyalty }: Props) => {
  const currentTier = tiers[loyalty.tier];
  const progress = ((loyalty.points % 100) / 100) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Loyalty Program</h2>
        <div className={`w-10 h-10 ${currentTier.color} rounded-full flex items-center justify-center text-white`}>
          <currentTier.icon className="w-5 h-5" />
        </div>
      </div>

      {/* Points */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-primary">{loyalty.points}</div>
        <div className="text-sm text-gray-500">Total Points</div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Progress to Next Reward</span>
          <span className="font-medium">{loyalty.pointsToNextTier} points needed</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Gift className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Free Birthday Drink</p>
            <p className="text-sm text-gray-500">Available on your birthday</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Coffee className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">2x Points on Mondays</p>
            <p className="text-sm text-gray-500">Earn double points all day</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Star className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Monthly Reward</p>
            <p className="text-sm text-gray-500">Free drink after 5 visits</p>
          </div>
        </div>
      </div>

      {/* Visit Counter */}
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary font-medium">This Month</p>
            <p className="text-2xl font-bold">{loyalty.visitsThisMonth} visits</p>
          </div>
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full border-2 border-white ${
                  i < loyalty.visitsThisMonth ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};