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

export const Header: React.FC = () => {
  const { authState } = useAuth();
  const { toggleMobileSidebar } = useSidebar();
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
  
  return (
    <header className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white shadow-lg border-b border-gray-800">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          {/* Hamburger menu for mobile - only show when authenticated */}
          {authState.isAuthenticated && (
            <button 
              id="hamburger-button"
              className="md:hidden mr-2 text-gray-300 hover:text-white"
              onClick={toggleMobileSidebar}
            >
              <HamburgerIcon className="h-6 w-6" />
            </button>
          )}
          
          <Link to="/" className="flex items-center space-x-2">
            <ActivityIcon className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold">AI Listing Optimizer</h1>
          </Link>
        </div>
        
        {authState.isAuthenticated && (
          <div className="hidden md:block mx-4 flex-grow max-w-xl">
            <SearchBar />
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          {authState.isAuthenticated && (
            <NotificationDropdown />
          )}
          
          {authState.isAuthenticated && authState.user ? (
            <UserMenu user={authState.user} />
          ) : (
            <div className="flex space-x-2">
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