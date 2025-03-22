import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../header';
import { SidebarProvider } from '../../sidebar/context';

export const GuestLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};