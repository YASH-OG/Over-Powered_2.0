import { create } from 'zustand';
import { Waiter, Table, DigitalOrder } from '../types';
import { useOrderStore } from './orderStore';

interface WaiterState {
  waiters: Waiter[];
  tables: Table[];
  readyOrders: DigitalOrder[];
  assignedOrders: DigitalOrder[];
  
  // Waiter Management
  addWaiter: (waiter: Waiter) => void;
  updateWaiterStatus: (waiterId: string, status: Waiter['status']) => void;
  assignTables: (waiterId: string, tableIds: number[]) => void;
  
  // Table Management
  addTable: (table: Table) => void;
  updateTableStatus: (tableId: number, status: Table['status']) => void;
  assignWaiterToTable: (tableId: number, waiterId: string) => void;
  
  // Order Management
  createOrder: (tableId: number, waiterId: string) => void;
  getWaiterOrders: (waiterId: string) => DigitalOrder[];
  getTableOrders: (tableId: number) => DigitalOrder[];
  addReadyOrder: (order: DigitalOrder) => void;
  assignOrderToWaiter: (orderId: string, waiterId: string) => void;
  completeOrder: (orderId: string) => void;
  
  // Analytics
  getWaiterEfficiency: (waiterId: string) => number;
  getAverageOrderTime: (waiterId: string) => number;
  getTableTurnoverRate: (tableId: number) => number;
}

export const useWaiterStore = create<WaiterState>((set, get) => ({
  waiters: [
    {
      id: 'w1',
      name: 'Yash Lal',
      status: 'active',
      assignedTables: [1, 2, 3],
      currentShift: '10 AM - 6 PM'
    },
    {
      id: 'w2',
      name: 'Vinayak Singh',
      status: 'active',
      assignedTables: [4, 5, 6],
      currentShift: '10 AM - 6 PM'
    }
  ],
  
  readyOrders: [
    {
      id: 'order1',
      tableId: 1,
      items: [
        {
          id: 'item1',
          name: 'Masala Chai',
          quantity: 2,
          price: 2.5,
          category: 'Tea',
          section: 'cafe',
          preparationTime: 8,
          status: 'ready'
        },
        {
          id: 'item2',
          name: 'Veg Sandwich',
          quantity: 1,
          price: 5,
          category: 'Snacks',
          section: 'cafe',
          preparationTime: 10,
          status: 'ready'
        }
      ],
      status: 'ready',
      createdAt: new Date(),
      customerNotes: 'Regular customer'
    },
    {
      id: 'order2',
      tableId: 3,
      items: [
        {
          id: 'item3',
          name: 'Cappuccino',
          quantity: 3,
          price: 4,
          category: 'Coffee',
          section: 'cafe',
          preparationTime: 7,
          status: 'ready'
        }
      ],
      status: 'ready',
      createdAt: new Date(),
      customerNotes: 'Extra hot'
    }
  ],

  assignedOrders: [
    {
      id: 'order3',
      tableId: 5,
      waiterId: 'w2',
      items: [
        {
          id: 'item4',
          name: 'Chocolate Brownie',
          quantity: 2,
          price: 6,
          category: 'Desserts',
          section: 'cafe',
          preparationTime: 5,
          status: 'ready'
        },
        {
          id: 'item5',
          name: 'Ice Cream Sundae',
          quantity: 1,
          price: 5.5,
          category: 'Desserts',
          section: 'cafe',
          preparationTime: 8,
          status: 'ready'
        }
      ],
      status: 'ready',
      createdAt: new Date(),
      customerNotes: 'Birthday celebration'
    }
  ],
  
  tables: [
    {
      id: 1,
      number: 1,
      capacity: 4,
      status: 'available',
      waiterId: 'w1'
    },
    {
      id: 2,
      number: 2,
      capacity: 2,
      status: 'occupied',
      waiterId: 'w1'
    },
    {
      id: 3,
      number: 3,
      capacity: 6,
      status: 'available',
      waiterId: 'w1'
    },
    {
      id: 4,
      number: 4,
      capacity: 4,
      status: 'reserved',
      waiterId: 'w2'
    },
    {
      id: 5,
      number: 5,
      capacity: 4,
      status: 'available',
      waiterId: 'w2'
    },
    {
      id: 6,
      number: 6,
      capacity: 2,
      status: 'occupied',
      waiterId: 'w2'
    }
  ],

  addWaiter: (waiter) =>
    set((state) => ({
      waiters: [...state.waiters, waiter]
    })),

  updateWaiterStatus: (waiterId, status) =>
    set((state) => ({
      waiters: state.waiters.map((waiter) =>
        waiter.id === waiterId ? { ...waiter, status } : waiter
      )
    })),

  assignTables: (waiterId, tableIds) =>
    set((state) => ({
      waiters: state.waiters.map((waiter) =>
        waiter.id === waiterId ? { ...waiter, assignedTables: tableIds } : waiter
      ),
      tables: state.tables.map((table) =>
        tableIds.includes(table.id) ? { ...table, waiterId } : table
      )
    })),

  addTable: (table) =>
    set((state) => ({
      tables: [...state.tables, table]
    })),

  updateTableStatus: (tableId, status) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      )
    })),

  assignWaiterToTable: (tableId, waiterId) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, waiterId } : table
      ),
      waiters: state.waiters.map((waiter) =>
        waiter.id === waiterId
          ? { ...waiter, assignedTables: [...waiter.assignedTables, tableId] }
          : waiter
      )
    })),

  createOrder: (tableId, waiterId) => {
    const orderId = `order-${Date.now()}`;
    const order: DigitalOrder = {
      id: orderId,
      tableId,
      waiterId,
      items: [],
      status: 'pending',
      createdAt: new Date()
    };
    
    useOrderStore.getState().addDigitalOrder(order);
    
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, status: 'occupied' } : table
      )
    }));
  },

  getWaiterOrders: (waiterId) => {
    const { assignedOrders } = get();
    return assignedOrders.filter((order) => order.waiterId === waiterId);
  },

  getTableOrders: (tableId) => {
    const { assignedOrders } = get();
    return assignedOrders.filter((order) => order.tableId === tableId);
  },

  addReadyOrder: (order) =>
    set((state) => ({
      readyOrders: [...state.readyOrders, { ...order, status: 'ready' }]
    })),

  assignOrderToWaiter: (orderId, waiterId) =>
    set((state) => {
      const order = state.readyOrders.find(o => o.id === orderId);
      if (!order) return state;

      return {
        readyOrders: state.readyOrders.filter(o => o.id !== orderId),
        assignedOrders: [...state.assignedOrders, { ...order, waiterId }]
      };
    }),

  completeOrder: (orderId) =>
    set((state) => ({
      assignedOrders: state.assignedOrders.filter(order => order.id !== orderId)
    })),

  getWaiterEfficiency: (waiterId) => {
    const orders = get().getWaiterOrders(waiterId);
    if (orders.length === 0) return 100;

    const completedOnTime = orders.filter((order) => {
      if (order.status !== 'completed') return false;
      return true;
    });

    return (completedOnTime.length / orders.length) * 100;
  },

  getAverageOrderTime: (waiterId) => {
    const orders = get().getWaiterOrders(waiterId);
    if (orders.length === 0) return 0;

    const completedOrders = orders.filter((order) => order.status === 'completed');
    if (completedOrders.length === 0) return 0;

    const totalTime = completedOrders.reduce((sum, order) => {
      const startTime = order.createdAt.getTime();
      const endTime = new Date().getTime();
      return sum + (endTime - startTime);
    }, 0);

    return totalTime / completedOrders.length / 60000;
  },

  getTableTurnoverRate: (tableId) => {
    const orders = get().getTableOrders(tableId);
    const timeWindow = 8 * 60 * 60 * 1000;
    const now = new Date().getTime();
    
    const ordersInWindow = orders.filter(
      (order) => now - order.createdAt.getTime() <= timeWindow
    );

    return ordersInWindow.length;
  }
}));