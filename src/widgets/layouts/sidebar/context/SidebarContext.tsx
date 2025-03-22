import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileOpen(prev => !prev);
  };
  
  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };
  
  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint in Tailwind
        setIsMobileOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only active on mobile when sidebar is open
      if (isMobileOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('mobile-sidebar');
        const hamburgerButton = document.getElementById('hamburger-button');
        
        if (
          sidebar && 
          !sidebar.contains(event.target as Node) && 
          hamburgerButton && 
          !hamburgerButton.contains(event.target as Node)
        ) {
          setIsMobileOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);
  
  return (
    <SidebarContext.Provider value={{ isMobileOpen, toggleMobileSidebar, closeMobileSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
};