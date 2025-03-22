import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../../sidebar/context/SidebarContext';
import { guestLayoutContainer, guestLayoutContent, guestLayoutInner } from './guest-layout.css.ts';

/**
 * GuestLayout component renders the layout for unauthenticated users.
 * It provides a full-height container with proper padding and centering
 * but does not include the header.
 */
export const GuestLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className={guestLayoutContainer}>
        <div className={guestLayoutContent}>
          <div className={guestLayoutInner}>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};