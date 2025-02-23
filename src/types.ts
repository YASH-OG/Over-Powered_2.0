export interface MenuItem {
  id: string;
  name: string;
  basePrice: number;
  category: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  variations: string[];
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  channel: string;
  paymentMethod: string;
  createdAt: string;
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  category?: string;
  channel?: string;
  paymentMethod?: string;
}