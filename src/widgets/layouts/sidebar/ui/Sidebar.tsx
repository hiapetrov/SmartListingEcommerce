import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../app/providers/AuthProvider';

interface NavItemProps {
  to: string;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        lex items-center px-4 py-3 text-gray-300 rounded-md transition-colors
        
      }
    >
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;

  if (!isAuthenticated) return null;

  return (
    <div className="bg-gray-900 border-r border-gray-800 w-64 flex-shrink-0 h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white flex items-center mb-6">
          <span className="bg-blue-500 h-6 w-6 flex items-center justify-center rounded mr-2">
            AI
          </span>
          Listing Optimizer
        </h2>
      </div>
      
      <nav className="px-2 space-y-1">
        <NavItem to="/optimize" label="Optimize Listing" />
        <NavItem to="/my-products" label="My Products" />
        <NavItem to="/subscription" label="Subscription" />
        <NavItem to="/profile" label="Profile" />
      </nav>
    </div>
  );
};
