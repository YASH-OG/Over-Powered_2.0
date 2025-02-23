export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  tax: number;
  packagingCharge: number;
  productCost: number;
  variations: Variation[];
}

export interface Variation {
  name: string;
  price: number;
}

export interface Settlement {
  id: string;
  name: string;
  commission: number;
}

export interface Channel {
  id: string;
  name: string;
  commission: number;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'waiter' | 'cashier';
  email: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface TimelineTask {
  id: string;
  orderId: string;
  waiterId: string;
  tableNumber: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  type: 'order' | 'cleaning' | 'service';
  startTime: string;
  endTime?: string;
  description: string;
}

export interface ModuleTile {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplier: {
    name: string;
    contact: string;
  };
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  cost: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  channel: string;
  paymentMethod: string;
  createdAt: string;
  customerId?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  variations: string[];
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  category?: string;
  channel?: string;
  paymentMethod?: string;
}