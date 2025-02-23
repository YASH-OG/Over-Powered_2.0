import { create } from 'zustand';
import { KitchenSection, Order, OrderItem, Batch } from '../types';

interface KitchenState {
  sections: KitchenSection[];
  batches: Batch[];
  activeOrders: Order[];
  completedOrders: Order[];
  
  // Section Management
  addSection: (section: KitchenSection) => void;
  updateSectionStatus: (sectionId: string, status: 'active' | 'inactive') => void;
  
  // Order Management
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateItemStatus: (orderId: string, itemId: string, status: OrderItem['status']) => void;
  markItemDispatched: (orderId: string, itemId: string) => void;
  markOrderDispatched: (orderId: string) => void;
  
  // Batch Management
  createBatch: (items: OrderItem[]) => void;
  updateBatchStatus: (batchId: string, status: Batch['status']) => void;
  
  // Analytics
  getAveragePreparationTime: (category: string) => number;
  getKitchenEfficiency: () => number;
  getPendingOrdersCount: () => number;
}

export const useKitchenStore = create<KitchenState>((set, get) => ({
  sections: [
    {
      id: 'beverages-hot',
      name: 'Hot Beverages',
      cuisine: 'cafe',
      orders: [],
      status: 'active'
    },
    {
      id: 'beverages-cold',
      name: 'Cold Beverages & Shakes',
      cuisine: 'cafe',
      orders: [],
      status: 'active'
    },
    {
      id: 'quick-bites',
      name: 'Quick Bites & Snacks',
      cuisine: 'cafe',
      orders: [],
      status: 'active'
    },
    {
      id: 'desserts-sweets',
      name: 'Desserts & Sweets',
      cuisine: 'cafe',
      orders: [],
      status: 'active'
    }
  ],
  batches: [],
  activeOrders: [],
  completedOrders: [],

  addSection: (section) =>
    set((state) => ({
      sections: [...state.sections, section]
    })),

  updateSectionStatus: (sectionId, status) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId ? { ...section, status } : section
      )
    })),

  addOrder: (order) => {
    const categorizeItem = (item: OrderItem) => {
      if (['Coffee', 'Tea'].includes(item.category)) {
        return 'beverages-hot';
      } else if (['Beverages'].includes(item.category)) {
        return 'beverages-cold';
      } else if (['Snacks'].includes(item.category)) {
        return 'quick-bites';
      } else if (['Desserts'].includes(item.category)) {
        return 'desserts-sweets';
      }
      return null;
    };

    // Assign section to each item
    const orderWithSections = {
      ...order,
      items: order.items.map(item => ({
        ...item,
        section: categorizeItem(item) || 'quick-bites' // Default to quick-bites if no match
      }))
    };

    set((state) => {
      // Add order to appropriate sections based on item categories
      const updatedSections = state.sections.map((section) => {
        const sectionItems = orderWithSections.items.filter(item => 
          item.section === section.id
        );

        if (sectionItems.length > 0) {
          return {
            ...section,
            orders: [...section.orders, { ...orderWithSections, items: sectionItems }]
          };
        }
        return section;
      });

      return {
        sections: updatedSections,
        activeOrders: [...state.activeOrders, orderWithSections]
      };
    });

    // Automatically create batches for similar items
    const { createBatch } = get();
    const similarItems = get().activeOrders
      .flatMap((o) => o.items)
      .filter((item) => 
        item.status === 'pending' && 
        item.category === order.items[0].category
      );

    if (similarItems.length >= 2) {
      createBatch(similarItems);
    }
  },

  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const updatedActiveOrders = state.activeOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );

      let completedOrders = state.completedOrders;
      if (status === 'served') {
        const completedOrder = updatedActiveOrders.find((o) => o.id === orderId);
        if (completedOrder) {
          completedOrders = [...completedOrders, completedOrder];
        }
      }

      // Update sections as well
      const updatedSections = state.sections.map((section) => ({
        ...section,
        orders: section.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      }));

      return {
        sections: updatedSections,
        activeOrders: status === 'served' 
          ? updatedActiveOrders.filter((o) => o.id !== orderId)
          : updatedActiveOrders,
        completedOrders
      };
    }),

  updateItemStatus: (orderId, itemId, status) =>
    set((state) => {
      const updatedActiveOrders = state.activeOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId
                  ? { 
                      ...item, 
                      status,
                      startCookingTime: status === 'preparing' ? new Date() : item.startCookingTime,
                      completionTime: status === 'ready' ? new Date() : item.completionTime
                    }
                  : item
              )
            }
          : order
      );

      // Update sections as well
      const updatedSections = state.sections.map((section) => ({
        ...section,
        orders: section.orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item.id === itemId
                    ? { 
                        ...item, 
                        status,
                        startCookingTime: status === 'preparing' ? new Date() : item.startCookingTime,
                        completionTime: status === 'ready' ? new Date() : item.completionTime
                      }
                    : item
                )
              }
            : order
        )
      }));

      return {
        sections: updatedSections,
        activeOrders: updatedActiveOrders
      };
    }),

  markItemDispatched: (orderId, itemId) =>
    set((state) => {
      const updatedActiveOrders = state.activeOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId
                  ? { ...item, status: 'dispatched' }
                  : item
              )
            }
          : order
      );

      // Update sections as well
      const updatedSections = state.sections.map((section) => ({
        ...section,
        orders: section.orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item.id === itemId
                    ? { ...item, status: 'dispatched' }
                    : item
                )
              }
            : order
        )
      }));

      return {
        sections: updatedSections,
        activeOrders: updatedActiveOrders
      };
    }),

  markOrderDispatched: (orderId) =>
    set((state) => {
      const updatedActiveOrders = state.activeOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) => ({ ...item, status: 'dispatched' })),
              status: 'served'
            }
          : order
      );

      // Update sections as well
      const updatedSections = state.sections.map((section) => ({
        ...section,
        orders: section.orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                items: order.items.map((item) => ({ ...item, status: 'dispatched' })),
                status: 'served'
              }
            : order
        )
      }));

      return {
        sections: updatedSections,
        activeOrders: updatedActiveOrders.filter(o => o.id !== orderId),
        completedOrders: [
          ...state.completedOrders,
          updatedActiveOrders.find(o => o.id === orderId)!
        ]
      };
    }),

  createBatch: (items) => {
    const batchId = `batch-${Date.now()}`;
    const totalPrepTime = Math.max(...items.map((item) => item.preparationTime));
    
    const batch: Batch = {
      id: batchId,
      items,
      startTime: new Date(),
      expectedCompletionTime: new Date(Date.now() + totalPrepTime * 60000),
      status: 'pending',
      priority: 'medium'
    };

    set((state) => ({
      batches: [...state.batches, batch],
      activeOrders: state.activeOrders.map((order) => ({
        ...order,
        items: order.items.map((item) =>
          items.some((batchItem) => batchItem.id === item.id)
            ? { ...item, batchId }
            : item
        )
      }))
    }));
  },

  updateBatchStatus: (batchId, status) =>
    set((state) => ({
      batches: state.batches.map((batch) =>
        batch.id === batchId ? { ...batch, status } : batch
      )
    })),

  getAveragePreparationTime: (category) => {
    const { completedOrders } = get();
    const relevantItems = completedOrders
      .flatMap((o) => o.items)
      .filter((item) => item.category === category && item.completionTime && item.startCookingTime);

    if (relevantItems.length === 0) return 0;

    const totalTime = relevantItems.reduce((sum, item) => {
      const prepTime = item.completionTime!.getTime() - item.startCookingTime!.getTime();
      return sum + prepTime;
    }, 0);

    return totalTime / relevantItems.length / 60000; // Convert to minutes
  },

  getKitchenEfficiency: () => {
    const { completedOrders, activeOrders } = get();
    const totalOrders = completedOrders.length + activeOrders.length;
    if (totalOrders === 0) return 100;

    const onTimeOrders = completedOrders.filter((order) => {
      const expectedTime = Math.max(...order.items.map((item) => item.preparationTime));
      const actualTime = Math.max(
        ...order.items
          .filter((item) => item.completionTime && item.startCookingTime)
          .map((item) => 
            (item.completionTime!.getTime() - item.startCookingTime!.getTime()) / 60000
          )
      );
      return actualTime <= expectedTime;
    });

    return (onTimeOrders.length / totalOrders) * 100;
  },

  getPendingOrdersCount: () => {
    const { activeOrders } = get();
    return activeOrders.filter((order) => 
      order.status === 'pending' || order.status === 'preparing'
    ).length;
  }
}));