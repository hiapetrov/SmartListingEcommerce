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

export const login = async (loginCredentials: LoginCredentials): Promise<User> => {
  try {
    // Call the backend API for login
    const response = await backendAPI.auth.login(loginCredentials.email, loginCredentials.password);
    
    // Store token
    localStorage.setItem('access_token', response.access_token);
    
    // Get user information
    const authUser = await backendAPI.auth.getCurrentUser();
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(authUser));
    
    return authUser;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (signupCredentials: SignupCredentials): Promise<User> => {
  try {
    // Call the backend API for registration
    const authUser = await backendAPI.auth.register(signupCredentials);
    
    // After registration, login to get token
    await login({ 
      email: signupCredentials.email, 
      password: signupCredentials.password 
    });
    
    return authUser;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    // No need to call backend for logout with JWT
    // Just remove token and user from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return null;
  }
};

export const updateSubscriptionPlan = async (userId: string, plan: SubscriptionPlan): Promise<User> => {
  try {
    // In a real implementation, this would call the backend API
    // For now, we'll just update the local storage
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
