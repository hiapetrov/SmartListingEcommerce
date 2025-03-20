import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownDivider } from '../../../shared/ui/dropdown';
import { User } from '../../../features/auth/model/types';
import { CogIcon, CreditCardIcon, LogoutIcon, UserIcon } from '../../../shared/lib/icons';
import { useAuth } from '../../../app/providers/AuthProvider';
import { SUBSCRIPTION_PLANS } from '../../../features/subscription/model/types';

interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { logout } = useAuth();
  
  const planDetails = SUBSCRIPTION_PLANS[user.subscriptionPlan];
  const planName = planDetails ? planDetails.name : 'Free';
  
  const handleLogout = async () => {
    await logout();
  };
  
  // Create avatar trigger
  const avatarTrigger = (
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt={user.firstName} className="h-full w-full object-cover" />
        ) : (
          ${user.firstName.charAt(0)}
        )}
      </div>
      <span className="text-sm font-medium hidden md:block">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
  
  return (
    <Dropdown trigger={avatarTrigger} align="right">
      <div className="px-4 py-3 border-b border-gray-700">
        <p className="text-sm font-medium text-white">{user.firstName} {user.lastName}</p>
        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-800 text-blue-200">
            {planName} Plan
          </span>
        </div>
      </div>
      
      <DropdownItem
        icon={<UserIcon />}
        onClick={() => {}}
      >
        <Link to="/profile" className="flex-1">Your Profile</Link>
      </DropdownItem>
      
      <DropdownItem
        icon={<CreditCardIcon />}
        onClick={() => {}}
      >
        <Link to="/subscription" className="flex-1">Subscription</Link>
      </DropdownItem>
      
      <DropdownItem
        icon={<CogIcon />}
        onClick={() => {}}
      >
        <Link to="/profile" className="flex-1">Settings</Link>
      </DropdownItem>
      
      <DropdownDivider />
      
      <DropdownItem
        icon={<LogoutIcon />}
        onClick={handleLogout}
        className="text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-25"
      >
        Sign Out
      </DropdownItem>
    </Dropdown>
  );
};
