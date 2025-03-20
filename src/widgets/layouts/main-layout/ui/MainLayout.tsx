import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../header';
import { Sidebar } from '../../sidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
