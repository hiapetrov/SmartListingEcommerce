import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownDivider } from '../../../shared/ui/dropdown';
import { Badge } from '../../../shared/ui/badge';
import { BellIcon } from '../../../shared/lib/icons';
import { useNotifications } from '../model/useNotifications';

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
    <div className="relative">
      <BellIcon className="h-6 w-6 text-gray-300 cursor-pointer hover:text-blue-400 transition-colors" />
      {unreadCount > 0 && (
        <Badge
          variant="danger" 
          size="sm" 
          className="absolute -top-1 -right-1 flex items-center justify-center"
        >
          {unreadCount}
        </Badge>
      )}
    </div>
  );
  
  return (
    <Dropdown 
      trigger={bellTrigger} 
      align="right" 
      width="w-80"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-white">Notifications</h3>
          
          {unreadCount > 0 && (
            <button 
              className="text-xs text-blue-400 hover:text-blue-300"
              onClick={() => markAllAsRead()}
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              {index > 0 && <DropdownDivider />}
              <DropdownItem
                onClick={() => handleNotificationClick(notification.id, notification.link)}
                className={notification.isRead ? 'opacity-60' : ''}
              >
                <div>
                  <div className="flex">
                    <div className="mr-3">
                      {notification.type === 'subscription' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs">
                          Sub
                        </div>
                      )}
                      {notification.type === 'product' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-xs">
                          Prod
                        </div>
                      )}
                      {notification.type === 'system' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xs">
                          Sys
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-200">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                    </div>
                    {!notification.isRead && (
                      <div className="ml-2 mt-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              </DropdownItem>
            </React.Fragment>
          ))
        ) : (
          <div className="px-4 py-6 text-center text-gray-400 text-sm">
            No notifications
          </div>
        )}
      </div>
      
      {notifications.length > 3 && (
        <div className="border-t border-gray-700 px-4 py-2 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View all notifications
          </button>
        </div>
      )}
    </Dropdown>
  );
};
