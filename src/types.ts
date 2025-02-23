export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary?: string[];
  isPopular?: boolean;
  isLimited?: boolean;
  ingredients?: string[];
  funQuote?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface FlashSale {
  id: number;
  title: string;
  discount: string;
  image: string;
  timeLeft: string;
  remaining: number;
  originalPrice: number;
  salePrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  tableNumber: string;
  total: number;
  createdAt: Date;
}

export interface LoyaltyInfo {
  points: number;
  tier: 'bronze' | 'silver' | 'gold';
  visitsThisMonth: number;
  pointsToNextTier: number;
}

export interface TableInfo {
  id: string;
  number: string;
  currentOrder?: Order;
  previousOrders: Order[];
}