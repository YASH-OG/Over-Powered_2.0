const { readJSON, writeJSON } = require("../utils/fileUtils");

exports.getKitchenOrders = (req, res) => {
  const orders = readJSON("orders.json");
  res.json(orders.filter(order => ["pending", "preparing"].includes(order.status)));
};

exports.markOrderComplete = (req, res) => {
  const { orderId } = req.params;
  const orders = readJSON("orders.json");
  
  const order = orders.find(o => o.id === parseInt(orderId));
  if (!order) return res.status(404).json({ message: "Order not found" });
  
  order.status = "completed";
  order.completedAt = new Date().toISOString();
  writeJSON("orders.json", orders);
  
  res.json({ message: "Order marked as complete", order });
};
