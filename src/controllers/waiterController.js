const { readJSON, writeJSON } = require("../utils/fileUtils");

exports.getOrders = (req, res) => {
  const orders = readJSON("orders.json");
  res.json(orders.filter(order => order.status === "pending"));
};

exports.getRecommendations = (req, res) => {
  const { tableNumber } = req.query;
  const menu = readJSON("menu.json");
  const orders = readJSON("orders.json");
  
  // Simple recommendation based on popular items
  const popularItems = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.id] = (acc[item.id] || 0) + item.quantity;
    });
    return acc;
  }, {});
  
  const recommendations = menu
    .sort((a, b) => (popularItems[b.id] || 0) - (popularItems[a.id] || 0))
    .slice(0, 3);
  
  res.json({ recommendations });
};
