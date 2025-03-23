import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../app/providers/AuthProvider';
import { useSidebar } from '../context/SidebarContext';
import { clsx } from 'clsx';
import {
  desktopSidebar,
  mobileSidebarOverlay,
  mobileSidebarBackdrop,
  mobileSidebarContainer,
  sidebarHeader,
  sidebarBrand,
  logoContainer,
  logoText,
  navContainer,
  navItemBase,
  navItemActive,
  translateXVar
} from './sidebar.css';

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
        clsx(navItemBase, isActive && navItemActive)
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

  // Set translateX variable based on sidebar state
  const mobileStyle: CSSProperties = {
    [translateXVar as string]: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)'
  };

  const renderSidebarContent = () => (
    <>
      <div className={sidebarHeader}>
        <div className={sidebarBrand}>
          <span className={logoContainer}>
            AI
          </span>
          <h2 className={logoText}>
            Listing Optimizer
          </h2>
        </div>
      </div>
      
      <nav className={navContainer}>
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/optimize" label="Optimize Listing" />
        <NavItem to="/my-products" label="My Products" />
        <NavItem to="/subscription" label="Subscription" />
        <NavItem to="/profile" label="Profile" />
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, always visible on desktop */}
      <div className={desktopSidebar}>
        {renderSidebarContent()}
      </div>
      
      {/* Mobile Sidebar - Shown as overlay when toggled */}
      <div 
        id="mobile-sidebar"
        className={mobileSidebarOverlay}
        style={mobileStyle}
      >
        {/* Dark overlay */}
        <div className={mobileSidebarBackdrop} />
        
        {/* Sidebar content */}
        <div className={mobileSidebarContainer}>
          {renderSidebarContent()}
        </div>
      </div>
    </>
  );
};