import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownDivider } from '../../../shared/ui/dropdown';
import { User } from '../../../features/auth/model/types';
import { CogIcon, CreditCardIcon, LogoutIcon, UserIcon } from '../../../shared/lib/icons';
import { useAuth } from '../../../app/providers/AuthProvider';
import { SUBSCRIPTION_PLANS } from '../../../features/subscription/model/types';
import {
  userMenuTrigger,
  avatarContainer,
  userName,
  dropdownHeader,
  userFullName,
  userEmail,
  planBadgeContainer,
  planBadge
} from './user-menu.css';

interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { logout } = useAuth();
  
  // Safely access user properties
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const initials = firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : '?';
  
  const subscriptionPlan = user?.subscriptionPlan || 'free';
  const planDetails = SUBSCRIPTION_PLANS[subscriptionPlan];
  const planName = planDetails ? planDetails.name : 'Free';
  
  const handleLogout = async () => {
    await logout();
  };
  
  // Create avatar trigger
  const avatarTrigger = (
    <div className={userMenuTrigger}>
      <div className={avatarContainer}>
        {user.avatar ? (
          <img src={user.avatar} alt={firstName} className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <span className={userName}>
        {firstName} {lastName}
      </span>
    </div>
  );
  
  return (
    <Dropdown trigger={avatarTrigger} align="right">
      <div className={dropdownHeader}>
        <p className={userFullName}>{firstName} {lastName}</p>
        <p className={userEmail}>{user.email}</p>
        <div className={planBadgeContainer}>
          <span className={planBadge}>
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