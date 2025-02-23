const { readJSON } = require("../utils/fileUtils");

exports.getOrderAnalytics = (req, res) => {
  const orders = readJSON("orders.json");
  const analytics = readJSON("analytics.json");
  
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === "completed").length;
  const popularItems = analytics.find(a => a.type === "popular_items")?.data || [];
  
  res.json({
    totalOrders,
    completedOrders,
    completionRate: (completedOrders / totalOrders * 100).toFixed(2) + "%",
    popularItems
  });
};

exports.getPopularSearches = (req, res) => {
  const analytics = readJSON("analytics.json");
  const searches = analytics.find(a => a.type === "popular_searches")?.data || [];
  res.json(searches);
};
