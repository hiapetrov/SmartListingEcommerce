import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../app/providers/AuthProvider';
import { useSidebar } from '../context/SidebarContext';

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  // Close mobile sidebar when navigation is used
  const { closeMobileSidebar } = useSidebar();
  
  return (
    <NavLink
      to={to}
      onClick={closeMobileSidebar}
      className={({ isActive }) => 
        `flex items-center px-4 py-3 text-gray-300 rounded-md transition-colors
        ${isActive ? 'bg-gray-800 text-white font-medium' : 'hover:bg-gray-800 hover:text-white'}`
      }
    >
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const { isMobileOpen } = useSidebar();

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, always visible on desktop */}
      <div className="hidden md:block bg-gray-900 border-r border-gray-800 w-64 flex-shrink-0 h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold text-white flex items-center mb-6">
            <span className="bg-blue-500 h-6 w-6 flex items-center justify-center rounded mr-2">
              AI
            </span>
            Listing Optimizer
          </h2>
        </div>
        
        <nav className="px-2 space-y-1">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/optimize" label="Optimize Listing" />
          <NavItem to="/my-products" label="My Products" />
          <NavItem to="/subscription" label="Subscription" />
          <NavItem to="/profile" label="Profile" />
        </nav>
      </div>
      
      {/* Mobile Sidebar - Shown as overlay when toggled */}
      <div 
        id="mobile-sidebar"
        className={`md:hidden fixed inset-0 z-40 transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        
        {/* Sidebar content */}
        <div className="relative bg-gray-900 border-r border-gray-800 w-64 h-full overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white flex items-center mb-6">
              <span className="bg-blue-500 h-6 w-6 flex items-center justify-center rounded mr-2">
                AI
              </span>
              Listing Optimizer
            </h2>
          </div>
          
          <nav className="px-2 space-y-1">
            <NavItem to="/dashboard" label="Dashboard" />
            <NavItem to="/optimize" label="Optimize Listing" />
            <NavItem to="/my-products" label="My Products" />
            <NavItem to="/subscription" label="Subscription" />
            <NavItem to="/profile" label="Profile" />
          </nav>
        </div>
      </div>
    </>
  );
};