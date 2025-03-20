import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../app/providers/AuthProvider';

export interface Notification {
  id: string;
  type: 'subscription' | 'product' | 'system';
  message: string;
  timestamp: string;
  isRead: boolean;
  link: string;
}

// Get current date plus days
const getDatePlusDays = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { authState } = useAuth();
  
  // Initialize notifications when user changes
  useEffect(() => {
    if (authState.user) {
      // In a real app, we would fetch these from an API
      const renewalDate = getDatePlusDays(10);
      
      const mockNotifications: Notification[] = [
        {
          id: uuidv4(),
          type: 'subscription',
          message: `Your ${authState.user.subscriptionPlan} subscription will renew on ${renewalDate}.`,
          timestamp: '5 minutes ago',
          isRead: false,
          link: '/subscription'
        },
        {
          id: uuidv4(),
          type: 'product',
          message: 'Your product "Ceramic Coffee Mug Set" was successfully optimized for 3 platforms.',
          timestamp: 'Yesterday',
          isRead: true,
          link: '/my-products'
        },
        {
          id: uuidv4(),
          type: 'system',
          message: 'We\'ve added 5 new AI models for better product optimization. Try them now!',
          timestamp: '3 days ago',
          isRead: false,
          link: '/optimize'
        }
      ];
      
      // Save to localStorage to persist across reloads
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      } else {
        setNotifications(mockNotifications);
        localStorage.setItem('notifications', JSON.stringify(mockNotifications));
      }
    }
  }, [authState.user]);
  
  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      );
      
      // Update localStorage
      localStorage.setItem('notifications', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, isRead: true }));
      
      // Update localStorage
      localStorage.setItem('notifications', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Add a new notification (would be called by real-time events in a real app)
  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: uuidv4()
    };
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      
      // Update localStorage
      localStorage.setItem('notifications', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  return {
    notifications,
    markAsRead,
    markAllAsRead,
    addNotification
  };
}