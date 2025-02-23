const socketIo = require("socket.io");

const setupSockets = (server) => {
  const io = socketIo(server);
  
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("orderUpdated", (order) => {
      io.emit("updateOrders", order);
    });

    socket.on("disconnect", () => console.log("Client disconnected"));
  });
};

module.exports = setupSockets;
