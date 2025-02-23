import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, Trophy, Gift, Star, Copy, Dice1 as Dice, Check as Chess, Car as Cards, Coins, History } from 'lucide-react';
import toast from 'react-hot-toast';

interface GameInvite {
  tableId: string;
  gameName: string;
  hostName: string;
}

const GAMES = {
  digitalchess: {
    name: 'Digital Chess',
    description: 'Classic chess with real-time multiplayer',
    icon: Chess,
    minPlayers: 2,
    maxPlayers: 2,
    points: 50,
    url: 'https://chess.com'
  },
  tabledice: {
    name: 'Table Dice',
    description: 'Roll dice and play various games',
    icon: Dice,
    minPlayers: 2,
    maxPlayers: 6,
    points: 30,
    url: 'https://www.rolldicewithfriends.com/'
  },
  cardgames: {
    name: 'Card Games',
    description: 'UNO, Poker, and more',
    icon: Cards,
    minPlayers: 2,
    maxPlayers: 8,
    points: 40,
    url: 'https://unoonline.io/'
  }
} as const;

const REWARDS = [
  { points: 100, discount: 5, description: '$5 off your next order' },
  { points: 200, discount: 10, description: '$10 off your next order' },
  { points: 500, discount: 25, description: '$25 off your next order' }
];

type GameType = keyof typeof GAMES;

export const TableGames = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'invite' | 'rewards'>('menu');
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [points, setPoints] = useState(150); // Starting points
  const [pointsHistory] = useState([
    { game: 'Digital Chess', points: 50, date: '2024-03-15' },
    { game: 'Table Dice', points: 30, date: '2024-03-14' },
    { game: 'Card Games', points: 70, date: '2024-03-13' }
  ]);
  const [activeInvites] = useState<GameInvite[]>([
    { tableId: 'T45', gameName: 'Digital Chess', hostName: 'Table #45' },
    { tableId: 'T23', gameName: 'Card Games', hostName: 'Table #23' }
  ]);

  const generateInviteCode = (game: GameType) => {
    const code = `${game.toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`;
    setInviteCode(code);
    setGameState('invite');
    toast.success('Game room created! Share the code with friends.');
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast.success('Invite code copied!');
  };

  const joinGame = (invite: GameInvite) => {
    toast.success(`Joining ${invite.gameName} with ${invite.hostName}`);
    const gameKey = invite.gameName.toLowerCase().replace(/\s+/g, '') as GameType;
    setSelectedGame(gameKey);
    setGameState('playing');
  };

  const redirectToGame = (game: GameType) => {
    window.open(GAMES[game].url, '_blank');
  };

  const redeemPoints = (requiredPoints: number, discount: number) => {
    if (points >= requiredPoints) {
      setPoints(prev => prev - requiredPoints);
      toast.success(`Successfully redeemed $${discount} discount!`);
    } else {
      toast.error('Not enough points!');
    }
  };

  if (gameState === 'rewards') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Rewards</h2>
          <button
            onClick={() => setGameState('menu')}
            className="text-gray-600 hover:text-primary"
          >
            Back to Games
          </button>
        </div>

        <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold">Your Points</h3>
              <p className="text-2xl font-bold text-primary">{points}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-gray-700">Available Rewards</h3>
          {REWARDS.map((reward) => (
            <div
              key={reward.points}
              className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-medium">{reward.description}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Required points: {reward.points}
                </p>
              </div>
              <button
                onClick={() => redeemPoints(reward.points, reward.discount)}
                disabled={points < reward.points}
                className={`px-4 py-2 rounded-lg font-medium ${
                  points >= reward.points
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <History className="w-5 h-5" />
            Points History
          </h3>
          {pointsHistory.map((history, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{history.game}</p>
                <p className="text-sm text-gray-600">{history.date}</p>
              </div>
              <span className="text-primary font-medium">+{history.points}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'invite') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Invite Friends</h2>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-2">Share this code with friends:</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl font-mono">{inviteCode}</span>
            <button
              onClick={copyInviteCode}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Players can join using this code from their table's game menu
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => selectedGame && redirectToGame(selectedGame)}
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Play Now
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && selectedGame) {
    const game = GAMES[selectedGame];
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{game.name}</h2>
          <button
            onClick={() => {
              setGameState('menu');
              setSelectedGame(null);
            }}
            className="text-gray-600 hover:text-primary"
          >
            Leave Game
          </button>
        </div>
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Ready to play {game.name}?</p>
          </div>
          <button
            onClick={() => redirectToGame(selectedGame)}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Play Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">Table Games</h2>
        </div>
        <button
          onClick={() => setGameState('rewards')}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
        >
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">{points} pts</span>
        </button>
      </div>

      {/* Points Info */}
      <div className="mb-6 bg-gradient-to-r from-primary/5 to-yellow-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <h3 className="font-medium">Earn & Redeem Points</h3>
        </div>
        <p className="text-sm text-gray-600">
          Win games to earn points and redeem them for discounts on your orders!
        </p>
      </div>

      {/* Active Game Invites */}
      {activeInvites.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Active Game Invites</h3>
          <div className="space-y-2">
            {activeInvites.map((invite) => (
              <motion.div
                key={invite.tableId}
                className="bg-primary/5 p-4 rounded-lg flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="font-medium">{invite.gameName}</p>
                  <p className="text-sm text-gray-600">from {invite.hostName}</p>
                </div>
                <button
                  onClick={() => joinGame(invite)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Join
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Available Games */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {(Object.entries(GAMES) as [GameType, typeof GAMES[GameType]][]).map(([key, game]) => (
          <motion.div
            key={key}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <game.icon className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <h3 className="font-medium">{game.name}</h3>
                <p className="text-sm text-gray-600">{game.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-gray-500">
                    {game.minPlayers}-{game.maxPlayers} players
                  </span>
                  <span className="text-primary flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    {game.points} points
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => redirectToGame(key)}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Play Now
              </button>
              <button
                onClick={() => {
                  setSelectedGame(key);
                  generateInviteCode(key);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Invite Friends
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How to Play */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          How to Play & Earn
        </h3>
        <ol className="space-y-2 text-sm text-gray-600">
          <li>1. Select a game to play instantly or invite friends</li>
          <li>2. Win games to earn points</li>
          <li>3. Redeem points for discounts on your orders</li>
          <li>4. The more you play, the more you save!</li>
        </ol>
      </div>
    </div>
  );
};