# Cafe Management Software

An integrated suite designed to streamline restaurant operations, our Cafe Management Software comprises three distinct applications that work in harmony to enhance both customer experience and internal efficiency.

## Overview
The system is divided into three core components:

### 1. Customer Interface (Digital Menu):
- Customers scan a QR code on the table to instantly access a digital menu.
- They can browse, select, and customize menu items in an intuitive interface.
- **Live Demo**: [Customer Interface]

### 2. Restaurant Management Interface:
- **Captain Interface**: Captains review orders, confirm them with customers, and add further customizations if needed.
- **Kitchen Display System (KDS)**: Dynamically allocates food items to appropriate kitchen sectors for efficient preparation.
- **Waiter Management System**: Organizes and assigns orders to waiters, ensuring prompt and accurate delivery to the correct table.
- **Live Demo**: [Restaurant Management System]

### 3. Admin Portal (Dashboard):
- Aggregates critical parameters from across the system.
- Provides real-time analytics, detailed reports, and overall operational insights for management.
- **Live Demo**: [Admin Panel]

## Features
### Customer Interface
- **QR Code Access**: Instant connection to the digital menu via QR code scanning.
- **Interactive Menu**: Detailed views of food items with descriptions and images.
- **Seamless Ordering**: Simple selection, customization, and submission of orders.
- **Additional Functionalities**:
  - Flash Sales
  - Loyalty Program
  - Order Status & Tracking
  - Social Features
  - Table Games

### Restaurant Management Interface
#### **Captain’s Console**:
- Verifies and confirms orders with customers.
- Allows addition of extra items or modifications on the spot.

#### **Kitchen Display System (KDS)**:
- Dynamically routes orders to different kitchen sectors.
- Ensures timely preparation and efficient kitchen workflow.

#### **Waiter Allocation**:
- Systematically assigns orders to waiters for quick and accurate service.

### Admin Portal
#### **Real-Time Dashboard**:
- Monitors key performance indicators like order volume, preparation time, and service efficiency.

#### **Comprehensive Reporting**:
- Generates detailed analytical reports to inform business decisions.

#### **System Management**:
- Provides tools for updating menus, managing table assignments, and configuring overall settings.

## System Architecture
```
+------------------------+
|    Customer Interface  |
| (Digital Menu via QR)  |
+-----------+------------+
            |
            V
+------------------------+
| Restaurant Management  |
|    Interface           |
| (Captain, KDS, Waiter) |
+-----------+------------+
            |
            V
+------------------------+
|      Admin Portal      |
|       (Dashboard)      |
+------------------------+
```

## Project Structure

### **Customer Interface**
```
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── snapcode.png
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── FlashSales.tsx
│   │   ├── LoyaltyProgram.tsx
│   │   ├── MenuCategories.tsx
│   │   ├── OrderStatus.tsx
│   │   ├── OrderTracking.tsx
│   │   ├── Recommendations.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ShoppingCart.tsx
│   │   ├── SocialFeatures.tsx
│   │   ├── TableFeatures.tsx
│   │   └── TableGames.tsx
│   ├── data/
│   │   └── menu.ts
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── utils/
│   │   └── recommendations.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### **Restaurant Management Interface**
```
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── BillingModal.tsx
│   │   └── CustomMenuModal.tsx
│   ├── index.css
│   ├── logo.png
│   ├── main.tsx
│   ├── pages/
│   │   ├── CaptainDashboard.tsx
│   │   ├── HomePage.tsx
│   │   ├── KitchenDisplay.tsx
│   │   └── WaiterDashboard.tsx
│   ├── store/
│   │   ├── kitchenStore.ts
│   │   ├── notificationStore.ts
│   │   ├── orderStore.ts
│   │   └── waiterStore.ts
│   ├── types/
│   │   └── index.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### **Admin Panel**
```
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── products.csv
├── public/
│   └── assets/
│       └── logo.png
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── ModuleTiles.tsx
│   │   ├── Sidebar.tsx
│   │   ├── animations/
│   │   │   ├── AnimatedContainer.tsx
│   │   │   └── PageTransition.tsx
│   │   ├── charts/
│   │   │   ├── CustomerInsights.tsx
│   │   │   ├── DailySalesTrend.tsx
│   │   │   └── SalesChart.tsx
│   │   ├── reports/
│   │   │   ├── ItemReport.tsx
│   │   │   ├── ReportFilters.tsx
│   │   │   ├── ReportMaster.tsx
│   │   │   └── SalesReport.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── utils/
│   │   └── csvHelper.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Contributing
We welcome contributions to improve and expand this software. To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes and submit a pull request.
4. Ensure your code adheres to the project’s coding standards and includes appropriate tests.

## License
MIT LICENSE

This README serves as a comprehensive guide to understanding, deploying, and utilizing the Cafe Management Software, ensuring a smooth operational workflow from customer ordering to backend management and analytics.

