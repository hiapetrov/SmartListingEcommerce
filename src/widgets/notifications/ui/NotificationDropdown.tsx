import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownDivider } from '../../../shared/ui/dropdown';
import { Badge } from '../../../shared/ui/badge';
import { BellIcon } from '../../../shared/lib/icons';
import { useNotifications } from '../model/useNotifications';
import { clsx } from 'clsx';
import {
  bellContainer,
  bellIcon,
  notificationBadgePosition,
  dropdownHeader,
  headerTitle,
  markAllButton,
  notificationsContainer,
  emptyNotificationsMessage,
  notificationItem,
  readNotification,
  notificationIcon,
  subscriptionIcon,
  productIcon,
  systemIcon,
  notificationContent,
  notificationMessage,
  notificationTimestamp,
  unreadIndicator,
  viewAllContainer,
  viewAllLink
} from './notification.css';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const handleNotificationClick = (id: string, link: string) => {
    markAsRead(id);
    navigate(link);
    setIsOpen(false);
  };
  
  const bellTrigger = (
    <div className={bellContainer}>
      <BellIcon className={bellIcon} />
      {unreadCount > 0 && (
        <Badge
          variant="danger" 
          size="sm" 
          className={notificationBadgePosition}
        >
          {unreadCount}
        </Badge>
      )}
    </div>
  );
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return (
          <div className={subscriptionIcon}>
            Sub
          </div>
        );
      case 'product':
        return (
          <div className={productIcon}>
            Prod
          </div>
        );
      case 'system':
        return (
          <div className={systemIcon}>
            Sys
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dropdown 
      trigger={bellTrigger} 
      align="right" 
      width="20rem" // w-80 in Tailwind
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className={dropdownHeader}>
        <h3 className={headerTitle}>Notifications</h3>
        
        {unreadCount > 0 && (
          <button 
            className={markAllButton}
            onClick={() => markAllAsRead()}
          >
            Mark all as read
          </button>
        )}
      </div>
      
      <div className={notificationsContainer}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              {index > 0 && <DropdownDivider />}
              <DropdownItem
                onClick={() => handleNotificationClick(notification.id, notification.link)}
                className={clsx(notificationItem, notification.isRead && readNotification)}
              >
                <div className={notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className={notificationContent}>
                  <p className={notificationMessage}>{notification.message}</p>
                  <p className={notificationTimestamp}>{notification.timestamp}</p>
                </div>
                {!notification.isRead && (
                  <div className={unreadIndicator}></div>
                )}
              </DropdownItem>
            </React.Fragment>
          ))
        ) : (
          <div className={emptyNotificationsMessage}>
            No notifications
          </div>
        )}
      </div>
      
      {notifications.length > 3 && (
        <div className={viewAllContainer}>
          <button className={viewAllLink}>
            View all notifications
          </button>
        </div>
      )}
    </Dropdown>
  );
};