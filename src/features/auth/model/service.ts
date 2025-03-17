import { v4 as uuidv4 } from 'uuid';
import { User, LoginCredentials, SignupCredentials, SubscriptionPlan } from './types';

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

export const login = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is just a mock - in a real app, you would validate credentials on the server
  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Store in localStorage for persistence
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
};

export const signup = async (credentials: SignupCredentials): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  if (mockUsers.some(u => u.email === credentials.email)) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: uuidv4(),
    email: credentials.email,
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    avatar: `https://ui-avatars.com/api/?name=${credentials.firstName}+${credentials.lastName}&background=0D8ABC&color=fff`,
    subscriptionPlan: 'free' // New users start with free plan
  };
  
  // Add to mock database
  mockUsers.push(newUser);
  
  // Store in localStorage for persistence
  localStorage.setItem('user', JSON.stringify(newUser));
  
  return newUser;
};

export const logout = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove from localStorage
  localStorage.removeItem('user');
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
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find user in mock database
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user's subscription plan
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    subscriptionPlan: plan
  };
  
  // Update in localStorage if it's the current user
  const currentUser = getCurrentUser();
  if (currentUser?.id === userId) {
    localStorage.setItem('user', JSON.stringify(mockUsers[userIndex]));
  }
  
  return mockUsers[userIndex];
};
