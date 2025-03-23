import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../header';
import { Sidebar } from '../../sidebar';
import { SidebarProvider } from '../../sidebar/context';
import { 
  layoutContainer, 
  layoutContent, 
  layoutMain, 
  layoutInner 
} from './main-layout.css';

export const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className={layoutContainer}>
        <Header />
        <div className={layoutContent}>
          <Sidebar />
          <div className={layoutMain}>
            <div className={layoutInner}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};