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
    
    // For demo purposes, if there's a user, ensure they have a valid subscriptionPlan
    if (user) {
      if (!user.subscriptionPlan) {
        user.subscriptionPlan = 'free';
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
    
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null
    });
  }, []);
  
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const user = await login(credentials);
      
      // Ensure the user has a subscriptionPlan
      if (user && !user.subscriptionPlan) {
        user.subscriptionPlan = 'enterprise';
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Login error:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };
  
  const handleSignup = async (credentials: SignupCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const user = await signup(credentials);
      
      // Ensure the user has a subscriptionPlan
      if (user && !user.subscriptionPlan) {
        user.subscriptionPlan = 'enterprise';
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Signup error:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      });
    }
  };
  
  const handleLogout = async () => {
    try {
      // First update the state to ensure UI reflects logout immediately
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null
      });
      
      // Clear all auth-related items from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('notifications');
      
      // Then call the logout service (which may clear server-side sessions)
      await logout();
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, we want to ensure the user is logged out locally
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
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