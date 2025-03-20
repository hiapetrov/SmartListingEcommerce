import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { MainLayout } from '../../widgets/layouts/main-layout/ui/MainLayout';
import { GuestLayout } from '../../widgets/layouts/guest-layout/ui/GuestLayout';
import ListingOptimizerPage from '../../pages/listing-optimizer';
import UserProfilePage from '../../pages/user-profile';
import MyProductsPage from '../../pages/my-products';
import SubscriptionPage from '../../pages/subscription';

export const AppRouter: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/optimize" replace />} />
            <Route path="optimize" element={<ListingOptimizerPage />} />
            <Route path="my-products" element={<MyProductsPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="*" element={<Navigate to="/optimize" replace />} />
          </Route>
        ) : (
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<ListingOptimizerPage />} />
            <Route path="optimize" element={<ListingOptimizerPage />} />
            <Route path="*" element={<ListingOptimizerPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};