const { readJSON, writeJSON } = require("../utils/fileUtils");

exports.placeOrder = (req, res) => {
  const { tableNumber, items } = req.body;
  const orders = readJSON("orders.json");

  const newOrder = { id: orders.length + 1, tableNumber, items, status: "pending" };
  orders.push(newOrder);
  writeJSON("orders.json", orders);

  res.status(201).json({ message: "Order placed", orderId: newOrder.id });
};

exports.getOrders = (req, res) => {
  res.json(readJSON("orders.json"));
};

exports.updateOrderStatus = (req, res) => {
  const { orderId, status } = req.body;
  const orders = readJSON("orders.json");

  const order = orders.find((o) => o.id === orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  writeJSON("orders.json", orders);

  res.json({ message: "Order updated", order });
};
