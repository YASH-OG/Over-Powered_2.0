export interface Table {
  id: number;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  waiterId?: string;
  currentOrder?: Order;
}

export interface DigitalOrder {
  id: string;
  tableId: number;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'rejected' | 'completed';
  createdAt: Date;
  suggestions?: MenuItem[];
  notes?: string;
  customerNotes?: string;
  orderPreference?: 'together' | 'as-ready';
  expectedDeliveryTime?: Date;
  delayReason?: string;
  paymentStatus?: 'pending' | 'completed';
  paymentMethod?: 'cash' | 'card' | 'upi';
  splitPayment?: boolean;
  splitDetails?: SplitPaymentDetail[];
  feedback?: OrderFeedback;
  rewardPoints?: number;
  waiterId?: string;
  priority?: 'high' | 'medium' | 'low';
  batchId?: string;
}

export interface SplitPaymentDetail {
  id: string;
  amount: number;
  status: 'pending' | 'paid';
  paymentMethod?: 'cash' | 'card' | 'upi';
}

export interface OrderFeedback {
  rating: number;
  comments?: string;
  foodQuality?: number;
  service?: number;
  ambience?: number;
  cleanliness?: number;
  timestamp: Date;
}

export interface Order {
  id: string;
  tableId: number;
  waiterId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
  section: string;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  priority?: 'high' | 'medium' | 'low';
  batchId?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  section: string;
  modifiers?: string[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'dispatched';
  preparationTime: number;
  notes?: string;
  expectedDeliveryTime?: Date;
  startCookingTime?: Date;
  completionTime?: Date;
  priority?: 'high' | 'medium' | 'low';
  batchId?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  section: string;
  preparationTime: number;
  description: string;
  modifiers?: string[];
  pairings?: string[];
  isCustom?: boolean;
  cuisine: 'indian' | 'chinese' | 'continental' | 'other';
}

export interface ComboOffer {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
  totalPrice: number;
  discountedPrice: number;
  minimumBillValue: number;
}

export interface KitchenSection {
  id: string;
  name: string;
  cuisine: 'indian' | 'chinese' | 'continental' | 'other';
  orders: Order[];
  status: 'active' | 'inactive';
}

export interface Batch {
  id: string;
  items: OrderItem[];
  startTime: Date;
  expectedCompletionTime: Date;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface Waiter {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'break';
  assignedTables: number[];
  currentShift: string;
}