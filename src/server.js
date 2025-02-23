const express = require("express");
const http = require("http");
const dotenv = require('dotenv');
const cors = require('cors');
const setupSockets = require("./sockets/orderSockets");

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!", timestamp: new Date().toISOString() });
});

// Route middleware
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// Setup WebSocket
setupSockets(server);

const PORT = process.env.PORT || 3000;  // Changed to port 3000
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
