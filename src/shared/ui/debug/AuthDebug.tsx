import React from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';

const AuthDebug: React.FC = () => {
  const { authState } = useAuth();
  
  const resetAuth = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('notifications');
    window.location.reload();
  };
  
  const createDemoUser = () => {
    const demoUser = {
      id: '1',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
      subscriptionPlan: 'enterprise'
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    window.location.reload();
  };
  
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg text-white text-xs z-50">
      <div>
        <strong>Auth State:</strong> {authState.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div>
        <strong>Loading:</strong> {authState.isLoading ? 'True' : 'False'}
      </div>
      <div>
        <strong>User:</strong> {authState.user ? authState.user.email : 'None'}
      </div>
      {authState.user && (
        <div>
          <strong>Plan:</strong> {authState.user.subscriptionPlan || 'None'}
        </div>
      )}
      <div>
        <strong>Error:</strong> {authState.error || 'None'}
      </div>
      <div className="mt-2 space-x-2">
        <button 
          onClick={resetAuth}
          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset Auth
        </button>
        <button 
          onClick={createDemoUser}
          className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Demo User
        </button>
      </div>
    </div>
  );
};

export default AuthDebug;