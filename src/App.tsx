import React from 'react';
import { AuthProvider } from './app/providers/AuthProvider';
import { Header } from './widgets/header';
import ListingOptimizerPage from './pages/listing-optimizer';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <div className="flex-1">
          <ListingOptimizerPage />
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
