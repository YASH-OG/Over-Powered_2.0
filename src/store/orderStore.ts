import { create } from 'zustand';
import { DigitalOrder, MenuItem, OrderItem, ComboOffer } from '../types';
import { useKitchenStore } from './kitchenStore';

interface OrderState {
  digitalOrders: DigitalOrder[];
  menuItems: MenuItem[];
  comboOffers: ComboOffer[];
  setDigitalOrders: (orders: DigitalOrder[]) => void;
  addDigitalOrder: (order: DigitalOrder) => void;
  updateOrderStatus: (orderId: string, status: DigitalOrder['status']) => void;
  updateOrderItem: (orderId: string, itemId: string, updates: Partial<OrderItem>) => void;
  addItemToOrder: (orderId: string, menuItem: MenuItem) => void;
  removeItemFromOrder: (orderId: string, itemId: string) => void;
  generateSuggestions: (items: OrderItem[]) => MenuItem[];
  updateOrderNotes: (orderId: string, notes: string) => void;
  updateCustomerNotes: (orderId: string, notes: string) => void;
  updateOrderPreference: (orderId: string, preference: 'together' | 'as-ready') => void;
  updateDeliveryTime: (orderId: string, itemId: string, time: Date) => void;
  updateDelayInfo: (orderId: string, reason: string) => void;
  addCustomMenuItem: (menuItem: MenuItem) => void;
  updatePaymentStatus: (orderId: string, status: 'pending' | 'completed', method?: string) => void;
  updateSplitPayment: (orderId: string, splitDetails: any[]) => void;
  addOrderFeedback: (orderId: string, feedback: any) => void;
  getRecommendedCombos: (totalAmount: number) => ComboOffer[];
}

export const useOrderStore = create<OrderState>((set, get) => ({
  digitalOrders: [
    {
      id: '1',
      tableId: 12,
      items: [
        {
          id: '1',
          name: 'Chicken Burger',
          quantity: 2,
          price: 12.99,
          category: 'Burgers',
          section: 'continental',
          preparationTime: 15,
          status: 'pending',
          notes: 'Extra spicy'
        },
        {
          id: '2',
          name: 'French Fries',
          quantity: 1,
          price: 4.99,
          category: 'Sides',
          section: 'continental',
          preparationTime: 10,
          status: 'pending',
          notes: 'Extra crispy'
        }
      ],
      status: 'pending',
      createdAt: new Date('2025-03-10T14:30:00'),
      customerNotes: 'Regular customer, prefers spicy food',
      orderPreference: 'together'
    }
  ],
  
  menuItems: [
    // Coffee
    {
      id: 'coffee-1',
      name: 'Espresso',
      price: 3,
      category: 'Coffee',
      section: 'cafe',
      preparationTime: 5,
      description: 'Rich and intense espresso shot'
    },
    {
      id: 'coffee-2',
      name: 'Cappuccino',
      price: 4,
      category: 'Coffee',
      section: 'cafe',
      preparationTime: 7,
      description: 'Espresso with steamed milk and foam'
    },
    {
      id: 'coffee-3',
      name: 'Latte',
      price: 4.5,
      category: 'Coffee',
      section: 'cafe',
      preparationTime: 7,
      description: 'Espresso with steamed milk'
    },
    {
      id: 'coffee-4',
      name: 'Americano',
      price: 3.5,
      category: 'Coffee',
      section: 'cafe',
      preparationTime: 5,
      description: 'Espresso with hot water'
    },
    {
      id: 'coffee-5',
      name: 'Mocha',
      price: 5,
      category: 'Coffee',
      section: 'cafe',
      preparationTime: 8,
      description: 'Espresso with chocolate and steamed milk'
    },

    // Tea
    {
      id: 'tea-1',
      name: 'Masala Chai',
      price: 2.5,
      category: 'Tea',
      section: 'cafe',
      preparationTime: 8,
      description: 'Indian spiced tea with milk'
    },
    {
      id: 'tea-2',
      name: 'Green Tea',
      price: 2.5,
      category: 'Tea',
      section: 'cafe',
      preparationTime: 5,
      description: 'Light and refreshing green tea'
    },
    {
      id: 'tea-3',
      name: 'Black Tea',
      price: 2,
      category: 'Tea',
      section: 'cafe',
      preparationTime: 5,
      description: 'Classic black tea'
    },
    {
      id: 'tea-4',
      name: 'Lemon Tea',
      price: 3,
      category: 'Tea',
      section: 'cafe',
      preparationTime: 6,
      description: 'Black tea with fresh lemon'
    },
    {
      id: 'tea-5',
      name: 'Herbal Tea',
      price: 3.5,
      category: 'Tea',
      section: 'cafe',
      preparationTime: 6,
      description: 'Caffeine-free herbal infusion'
    },

    // Snacks
    {
      id: 'snacks-1',
      name: 'Veg Sandwich',
      price: 5,
      category: 'Snacks',
      section: 'cafe',
      preparationTime: 10,
      description: 'Fresh vegetables with herbs and sauce'
    },
    {
      id: 'snacks-2',
      name: 'Cheese Sandwich',
      price: 6,
      category: 'Snacks',
      section: 'cafe',
      preparationTime: 10,
      description: 'Grilled sandwich with melted cheese'
    },
    {
      id: 'snacks-3',
      name: 'Paneer Tikka',
      price: 7,
      category: 'Snacks',
      section: 'cafe',
      preparationTime: 15,
      description: 'Grilled cottage cheese with Indian spices'
    },
    {
      id: 'snacks-4',
      name: 'French Fries',
      price: 4,
      category: 'Snacks',
      section: 'cafe',
      preparationTime: 10,
      description: 'Crispy golden fries'
    },
    {
      id: 'snacks-5',
      name: 'Spring Rolls',
      price: 5,
      category: 'Snacks',
      section: 'cafe',
      preparationTime: 12,
      description: 'Crispy rolls with vegetable filling'
    },

    // Desserts
    {
      id: 'desserts-1',
      name: 'Chocolate Brownie',
      price: 6,
      category: 'Desserts',
      section: 'cafe',
      preparationTime: 5,
      description: 'Rich chocolate brownie'
    },
    {
      id: 'desserts-2',
      name: 'Cheesecake',
      price: 7,
      category: 'Desserts',
      section: 'cafe',
      preparationTime: 5,
      description: 'Classic New York cheesecake'
    },
    {
      id: 'desserts-3',
      name: 'Ice Cream Sundae',
      price: 5.5,
      category: 'Desserts',
      section: 'cafe',
      preparationTime: 8,
      description: 'Assorted ice cream with toppings'
    },
    {
      id: 'desserts-4',
      name: 'Gulab Jamun',
      price: 4,
      category: 'Desserts',
      section: 'cafe',
      preparationTime: 5,
      description: 'Indian milk-based sweet dumplings'
    },
    {
      id: 'desserts-5',
      name: 'Pastry',
      price: 5,
      category: 'Desserts',
      section: 'cafe',
      preparationTime: 5,
      description: 'Fresh cream pastry'
    },

    // Beverages
    {
      id: 'beverages-1',
      name: 'Cold Coffee',
      price: 4.5,
      category: 'Beverages',
      section: 'cafe',
      preparationTime: 8,
      description: 'Chilled coffee with ice cream'
    },
    {
      id: 'beverages-2',
      name: 'Mango Smoothie',
      price: 5,
      category: 'Beverages',
      section: 'cafe',
      preparationTime: 8,
      description: 'Fresh mango blended with yogurt'
    },
    {
      id: 'beverages-3',
      name: 'Strawberry Shake',
      price: 5.5,
      category: 'Beverages',
      section: 'cafe',
      preparationTime: 8,
      description: 'Strawberry milkshake'
    },
    {
      id: 'beverages-4',
      name: 'Orange Juice',
      price: 4,
      category: 'Beverages',
      section: 'cafe',
      preparationTime: 5,
      description: 'Fresh squeezed orange juice'
    },
    {
      id: 'beverages-5',
      name: 'Lemonade',
      price: 3.5,
      category: 'Beverages',
      section: 'cafe',
      preparationTime: 5,
      description: 'Fresh lemonade with mint'
    }
  ],

  comboOffers: [
    {
      id: 'combo1',
      name: 'Dessert Special',
      description: 'Add any dessert to your meal at 30% off',
      items: [],
      totalPrice: 0,
      discountedPrice: 0,
      minimumBillValue: 150
    },
    {
      id: 'combo2',
      name: 'Beverage Bundle',
      description: 'Add any 2 beverages at 20% off',
      items: [],
      totalPrice: 0,
      discountedPrice: 0,
      minimumBillValue: 200
    }
  ],

  setDigitalOrders: (orders) => set({ digitalOrders: orders }),
  
  addDigitalOrder: (order) =>
    set((state) => ({
      digitalOrders: [...state.digitalOrders, order]
    })),
    
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    }));

    // If order is confirmed, send it to the kitchen
    if (status === 'confirmed') {
      const order = get().digitalOrders.find(o => o.id === orderId);
      if (order) {
        // Ensure each item has a section assigned
        const orderWithSections = {
          id: order.id,
          tableId: order.tableId,
          waiterId: order.waiterId || 'unknown',
          items: order.items.map(item => ({
            ...item,
            section: item.section || 'quick-bites' // Default to quick-bites if no section
          })),
          status: 'pending',
          section: 'cafe',
          createdAt: order.createdAt,
          updatedAt: new Date(),
          totalAmount: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
        
        useKitchenStore.getState().addOrder(orderWithSections);
      }
    }
  },

  updateOrderItem: (orderId, itemId, updates) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId
                  ? { ...item, ...updates }
                  : item
              )
            }
          : order
      )
    })),

  addItemToOrder: (orderId, menuItem) => {
    set((state) => {
      const updatedOrders = state.digitalOrders.map((order) => {
        if (order.id === orderId) {
          const existingItem = order.items.find(item => item.name === menuItem.name);
          
          if (existingItem) {
            return {
              ...order,
              items: order.items.map(item =>
                item.name === menuItem.name
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          } else {
            const newItem: OrderItem = {
              id: Math.random().toString(36).substr(2, 9),
              name: menuItem.name,
              quantity: 1,
              price: menuItem.price,
              category: menuItem.category,
              section: menuItem.section,
              preparationTime: menuItem.preparationTime,
              status: 'pending'
            };
            
            return {
              ...order,
              items: [...order.items, newItem]
            };
          }
        }
        return order;
      });

      return { digitalOrders: updatedOrders };
    });
  },

  removeItemFromOrder: (orderId, itemId) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.filter((item) => item.id !== itemId)
            }
          : order
      )
    })),
    
  generateSuggestions: (items) => {
    const { menuItems } = get();
    const orderCategories = new Set(items.map(item => item.category));
    const suggestions: MenuItem[] = [];
    
    menuItems.forEach(menuItem => {
      if (!orderCategories.has(menuItem.category) && suggestions.length < 4) {
        suggestions.push(menuItem);
      }
    });
    
    return suggestions;
  },

  updateOrderNotes: (orderId, notes) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId ? { ...order, notes } : order
      )
    })),

  updateCustomerNotes: (orderId, notes) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId ? { ...order, customerNotes: notes } : order
      )
    })),

  updateOrderPreference: (orderId, preference) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId ? { ...order, orderPreference: preference } : order
      )
    })),

  updateDeliveryTime: (orderId, itemId, time) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId
                  ? { ...item, expectedDeliveryTime: time }
                  : item
              )
            }
          : order
      )
    })),

  updateDelayInfo: (orderId, reason) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId ? { ...order, delayReason: reason } : order
      )
    })),

  addCustomMenuItem: (menuItem) =>
    set((state) => ({
      menuItems: [...state.menuItems, { ...menuItem, isCustom: true }]
    })),

  updatePaymentStatus: (orderId, status, method) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId
          ? { ...order, paymentStatus: status, paymentMethod: method }
          : order
      )
    })),

  updateSplitPayment: (orderId, splitDetails) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId
          ? { ...order, splitPayment: true, splitDetails }
          : order
      )
    })),

  addOrderFeedback: (orderId, feedback) =>
    set((state) => ({
      digitalOrders: state.digitalOrders.map((order) =>
        order.id === orderId ? { ...order, feedback } : order
      )
    })),

  getRecommendedCombos: (totalAmount) => {
    const { comboOffers } = get();
    return comboOffers.filter(offer => totalAmount >= offer.minimumBillValue);
  }
}));