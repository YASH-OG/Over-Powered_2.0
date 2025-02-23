import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderItem } from '../types';

interface OrderDetails {
  items: OrderItem[];
  totalAmount: number;
  estimatedDeliveryTime?: Date;
  specialInstructions?: string;
}

interface Notification {
  id: string;
  tableId: number;
  orderId: string;
  message: string;
  type: 'ready' | 'delayed' | 'cancelled';
  timestamp: Date;
  isRead: boolean;
  isAccepted?: boolean;
  assignedWaiterId?: string;
  orderDetails?: OrderDetails;
  completionTime?: Date;
  estimatedDeliveryTime?: Date;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAsAccepted: (notificationId: string) => void;
  clearNotifications: () => void;
  assignToWaiter: (notificationId: string, waiterId: string) => void;
  updateEstimatedDeliveryTime: (notificationId: string, time: Date) => void;
  completeOrder: (notificationId: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) =>
        set((state) => {
          const estimatedDeliveryTime = new Date();
          estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 10); // Default 10 min delivery time

          return {
            notifications: [
              {
                ...notification,
                id: `notif-${Date.now()}`,
                timestamp: new Date(),
                isRead: false,
                isAccepted: false,
                estimatedDeliveryTime
              },
              ...state.notifications
            ]
          };
        }),
      markAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== notificationId)
        })),
      markAsAccepted: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, isAccepted: true } : n
          )
        })),
      clearNotifications: () => set({ notifications: [] }),
      assignToWaiter: (notificationId, waiterId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, assignedWaiterId: waiterId } : n
          )
        })),
      updateEstimatedDeliveryTime: (notificationId, time) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, estimatedDeliveryTime: time } : n
          )
        })),
      completeOrder: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId
              ? { ...n, isRead: true, completionTime: new Date() }
              : n
          )
        }))
    }),
    {
      name: 'notifications-storage'
    }
  )
);