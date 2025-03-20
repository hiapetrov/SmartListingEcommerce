import { v4 as uuidv4 } from 'uuid';
import { User, LoginCredentials, SignupCredentials, SubscriptionPlan } from './types';
import { backendAPI } from '../../../shared/api/backend';

// Mock database for users - in a real app, this would be a backend API
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
    subscriptionPlan: 'free'
  }
];

// Implementation that works with both API and mock data
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    // For demo purposes in development
    if (credentials.email === 'demo@example.com') {
      const mockUser = mockUsers.find(u => u.email === credentials.email);
      if (mockUser) {
        // Set to enterprise subscription for demo
        const user = {...mockUser, subscriptionPlan: 'enterprise'};
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    }
    
    // Call the backend API for login
    const response = await backendAPI.auth.login(credentials.email, credentials.password);
    
    // Store token
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    
    // Get user information - try from response or API call
    let user = response.user;
    
    if (!user) {
      try {
        user = await backendAPI.auth.getCurrentUser();
      } catch (error) {
        console.error('Failed to get user info after login:', error);
      }
    }
    
    // If still no user, use a fallback user
    if (!user) {
      user = {
        id: uuidv4(),
        email: credentials.email,
        firstName: 'User',
        lastName: '',
        subscriptionPlan: 'free'
      };
    }
    
    // Ensure the user has a subscription plan
    if (!user.subscriptionPlan) {
      user.subscriptionPlan = 'free';
    }
    
    // Update to enterprise for demo
    user.subscriptionPlan = 'enterprise';
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    
    // Try to use a mock user as fallback
    if (credentials.email === 'demo@example.com') {
      const mockUser = {...mockUsers[0], subscriptionPlan: 'enterprise'};
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    }
    
    throw error;
  }
};

export const signup = async (credentials: SignupCredentials): Promise<User> => {
  try {
    // Call the backend API for registration
    const response = await backendAPI.auth.register(credentials);
    
    // Store token if it's returned
    if (response && response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    
    // Get user from response or try logging in
    let user = response && response.user;
    
    if (!user) {
      // Try to login with the credentials
      try {
        user = await login({
          email: credentials.email,
          password: credentials.password
        });
      } catch (loginError) {
        console.error('Failed to login after signup:', loginError);
      }
    }
    
    // If we still don't have a user, create a basic one
    if (!user) {
      user = {
        id: uuidv4(),
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        subscriptionPlan: 'free'
      };
    }
    
    // Ensure the user has a subscription plan
    if (!user.subscriptionPlan) {
      user.subscriptionPlan = 'free';
    }
    
    // Update to enterprise for demo
    user.subscriptionPlan = 'enterprise';
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    
    // Create a basic user as fallback
    const user = {
      id: uuidv4(),
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      subscriptionPlan: 'enterprise'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Clear auth-related items from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('notifications');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    const user = JSON.parse(userJson) as User;
    
    // Ensure the user has a subscription plan
    if (!user.subscriptionPlan) {
      user.subscriptionPlan = 'enterprise';
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return user;
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    localStorage.removeItem('user');
    return null;
  }
};

export const updateSubscriptionPlan = async (userId: string, plan: SubscriptionPlan): Promise<User> => {
  try {
    // In a real implementation, this would call the backend API
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...currentUser,
      subscriptionPlan: plan
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Update subscription error:', error);
    throw error;
  }
};