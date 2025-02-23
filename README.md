# Cafe Management System Backend

A lightweight JSON-based backend system for cafe management, perfect for prototypes and demos.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (Admin, Waiter, Kitchen)
- 📝 Menu management
- 🛎️ Order processing
- ⚡ Real-time updates using WebSocket
- 📁 JSON file-based storage

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the `JWT_SECRET` value

3. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- POST `/auth/login` - User login

### Orders
- GET `/orders` - Get all orders
- POST `/orders` - Place new order
- PUT `/orders/status` - Update order status

## WebSocket Events

- `orderUpdated` - Emit when order status changes
- `updateOrders` - Listen for order updates

## File Storage

JSON files in the `src/data` directory:
- `users.json` - User accounts
- `menu.json` - Menu items
- `orders.json` - Order data
