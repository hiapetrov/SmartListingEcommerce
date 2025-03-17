import React, { useState } from 'react';
import { SearchBar } from '../../search-bar/ui/SearchBar';
import { UserMenu } from '../../user-menu/ui/UserMenu';
import { ActivityIcon, BellIcon } from '../../../shared/lib/icons';
import { Badge } from '../../../shared/ui/badge';
import { useAuth } from '../../../app/providers/AuthProvider';
import { AuthModal } from '../../../features/auth/ui/AuthModal';
import { Button } from '../../../shared/ui/button';

export const Header: React.FC = () => {
  const { authState } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white shadow-lg border-b border-gray-800">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <ActivityIcon className="h-8 w-8 text-blue-400" />
          <h1 className="text-xl font-bold">AI Listing Optimizer</h1>
        </div>
        
        <div className="hidden md:block mx-4 flex-grow max-w-xl">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-300 cursor-pointer hover:text-blue-400 transition-colors" />
            <Badge
              variant="danger" 
              size="sm" 
              className="absolute -top-1 -right-1 flex items-center justify-center"
            >
              3
            </Badge>
          </div>
          
          {authState.isAuthenticated && authState.user ? (
            <UserMenu user={authState.user} />
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
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
      />
    </header>
  );
};
