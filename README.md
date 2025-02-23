# Cafe Management Software

An integrated suite designed to streamline restaurant operations, our Cafe Management Software comprises three distinct applications that work in harmony to enhance both customer experience and internal efficiency.

## Overview

The system is divided into three core components:

1. **Customer Interface (Digital Menu):**  
   - Customers scan a QR code on the table to instantly access a digital menu.
   - They can browse, select, and customize menu items in an intuitive interface.
   - **Live Demo:** [Customer Interface](https://over-powered-2-0.vercel.app/)

2. **Restaurant Management Interface:**  
   - **Captain Interface:** Captains review orders, confirm them with customers, and add further customizations if needed.
   - **Kitchen Display System (KDS):** Dynamically allocates food items to appropriate kitchen sectors for efficient preparation.
   - **Waiter Management System:** Organizes and assigns orders to waiters, ensuring prompt and accurate delivery to the correct table.
   - **Live Demo:** [Restaurant Management System](https://rms-git-main-yadavsourabhghs-projects.vercel.app/)

3. **Admin Portal (Dashboard):**  
   - Aggregates critical parameters from across the system.
   - Provides real-time analytics, detailed reports, and overall operational insights for management.
   - **Live Demo:** [Admin Panel](https://hackx-op.vercel.app/)

---

## Features

### Customer Interface
- **QR Code Access:** Instant connection to the digital menu via QR code scanning.
- **Interactive Menu:** Detailed views of food items with descriptions and images.
- **Seamless Ordering:** Simple selection, customization, and submission of orders.

### Restaurant Management Interface
- **Captain’s Console:**  
  - Verifies and confirms orders with customers.
  - Allows addition of extra items or modifications on the spot.
- **Kitchen Display System:**  
  - Dynamically routes orders to different kitchen sectors.
  - Ensures timely preparation and efficient kitchen workflow.
- **Waiter Allocation:**  
  - Systematically assigns orders to waiters for quick and accurate service.
  
### Admin Portal
- **Real-Time Dashboard:**  
  - Monitors key performance indicators like order volume, preparation time, and service efficiency.
- **Comprehensive Reporting:**  
  - Generates detailed analytical reports to inform business decisions.
- **System Management:**  
  - Provides tools for updating menus, managing table assignments, and configuring overall settings.

---

## System Architecture

```plaintext
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

---

## Usage

### For Customers
- **Digital Menu Access:** Scan the QR code on your table with your smartphone camera.
- **Ordering:** Browse the digital menu, select items, and customize your order as needed.

### For Restaurant Staff
- **Captains:**  
  - Confirm customer orders.
  - Offer additional recommendations or modifications.
- **Kitchen Staff:**  
  - Monitor the Kitchen Display System for dynamically allocated orders.
- **Waiters:**  
  - Receive order notifications and deliver prepared meals promptly.

### For Administrators
- **Dashboard Access:**  
  - Log in to the Admin Portal to view real-time metrics and generate performance reports.
- **System Management:**  
  - Update menus, manage table configurations, and oversee overall operational settings.

---

## Contributing

We welcome contributions to improve and expand this software. To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes and submit a pull request.
4. Ensure your code adheres to the project’s coding standards and includes appropriate tests.

---

## License

MIT LICENSE

This README serves as a comprehensive guide to understanding, deploying, and utilizing the Cafe Management Software, ensuring a smooth operational workflow from customer ordering to backend management and analytics.

