import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials } from '../../features/auth/model/types';
import { login, signup, logout, getCurrentUser } from '../../features/auth/model/service';

interface AuthContextProps {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  
  useEffect(() => {
    // Check for existing user session on load
    const user = getCurrentUser();
    
    // For demo purposes, force the user to have enterprise subscription
    if (user) {
      user.subscriptionPlan = 'enterprise';
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null
    });
  }, []);
  
  const handleLogin = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await login(credentials);
      
      // For demo purposes, force the user to have enterprise subscription
      user.subscriptionPlan = 'enterprise';
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };
  
  const handleSignup = async (credentials: SignupCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await signup(credentials);
      
      // For demo purposes, force the user to have enterprise subscription
      user.subscriptionPlan = 'enterprise';
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      });
    }
  };
  
  const handleLogout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await logout();
      
      // Clear persisted user data
      localStorage.removeItem('user');
      
      // Clear notifications
      localStorage.removeItem('notifications');
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed'
      }));
    }
  };
  
  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...userData };
    
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setAuthState(prev => ({
      ...prev,
      user: updatedUser
    }));
  };
  
  return (
    <AuthContext.Provider
      value={{
        authState,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
