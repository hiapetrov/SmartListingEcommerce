import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../../search-bar/ui/SearchBar';
import { UserMenu } from '../../user-menu/ui/UserMenu';
import { NotificationDropdown } from '../../notifications';
import { ActivityIcon, HamburgerIcon } from '../../../shared/lib/icons';
import { useAuth } from '../../../app/providers/AuthProvider';
import { AuthModal } from '../../../features/auth/ui/AuthModal';
import { Button } from '../../../shared/ui/button';
import { useSidebar } from '../../layouts/sidebar/context';
import {
  headerContainer,
  headerInner,
  headerLeft,
  hamburgerButton,
  brandContainer,
  brandIcon,
  brandText,
  searchContainer,
  headerRight,
  authButtonsContainer
} from './header.css';

export const Header: React.FC = () => {
  const { authState } = useAuth();
  const sidebarContext = useSidebar();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'login' | 'signup'>('login');
  
  const handleSignInClick = () => {
    setInitialAuthView('login');
    setIsAuthModalOpen(true);
  };
  
  const handleSignUpClick = () => {
    setInitialAuthView('signup');
    setIsAuthModalOpen(true);
  };
  
  // Only use sidebar context if it exists (to handle guest layout)
  const toggleSidebar = () => {
    if (sidebarContext) {
      sidebarContext.toggleMobileSidebar();
    }
  };
  
  return (
    <header className={headerContainer}>
      <div className={headerInner}>
        <div className={headerLeft}>
          {/* Hamburger menu for mobile - only show when authenticated */}
          {authState.isAuthenticated && (
            <button 
              id="hamburger-button"
              className={hamburgerButton}
              onClick={toggleSidebar}
            >
              <HamburgerIcon className="h-6 w-6" />
            </button>
          )}
          
          <Link to="/" className={brandContainer}>
            <ActivityIcon className={brandIcon} />
            <h1 className={brandText}>AI Listing Optimizer</h1>
          </Link>
        </div>
        
        {authState.isAuthenticated && (
          <div className={searchContainer}>
            <SearchBar />
          </div>
        )}
        
        <div className={headerRight}>
          {authState.isAuthenticated && (
            <NotificationDropdown />
          )}
          
          {authState.isAuthenticated && authState.user ? (
            <UserMenu user={authState.user} />
          ) : (
            <div className={authButtonsContainer}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={initialAuthView}
      />
    </header>
  );
};