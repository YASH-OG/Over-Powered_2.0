const { readJSON, writeJSON } = require("../utils/fileUtils");

exports.getDiscounts = (req, res) => {
  const rewards = readJSON("rewards.json");
  res.json(rewards.filter(reward => reward.type === "discount"));
};

exports.getRewards = (req, res) => {
  const rewards = readJSON("rewards.json");
  res.json(rewards.filter(reward => reward.type === "reward"));
};

exports.claimReward = (req, res) => {
  const { rewardId, userId } = req.body;
  const rewards = readJSON("rewards.json");
  const users = readJSON("users.json");
  
  const reward = rewards.find(r => r.id === parseInt(rewardId));
  const user = users.find(u => u.id === parseInt(userId));
  
  if (!reward || !user) {
    return res.status(404).json({ message: "Reward or user not found" });
  }
  
  // Here you would implement the logic to apply the reward
  res.json({ message: "Reward claimed successfully", reward });
};
