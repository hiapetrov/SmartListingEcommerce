// Backend API Connector

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic request function
const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers
  };
  
  const config = {
    ...options,
    headers
  };
  
  try {
    const response = await fetch(url, config);
    
    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/'; // Redirect to the login page
      throw new Error('Authentication token expired. Please log in again.');
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'An error occurred');
    }
    
    // Check if the response is empty
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    // For login, we need to use x-www-form-urlencoded format
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email, // The backend expects 'username' as the field name
        password,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }
    
    return response.json();
  },
  
  register: async (credentials: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  getCurrentUser: async () => {
    return request('/auth/me');
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    return request('/products');
  },
  
  getById: async (id: string) => {
    return request(`/products/${id}`);
  },
  
  create: async (product: any) => {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },
  
  update: async (id: string, product: any) => {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },
  
  delete: async (id: string) => {
    return request(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Optimization API
export const optimizationAPI = {
  optimizeListings: async (request: {
    product: any;
    platforms: string[];
    optimizationFocus?: string;
    targetAudience?: string;
  }) => {
    return await fetch(`${API_BASE_URL}/optimizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(request),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Optimization failed');
      }
      return res.json();
    });
  },
};

// Publishing API
export const publishingAPI = {
  publishListing: async (request: {
    optimizedListing: any;
    platformCredentials: {
      platform: string;
      credentials: Record<string, string>;
    };
  }) => {
    return request('/publishing', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },
  
  publishMultiple: async (requests: Array<{
    optimizedListing: any;
    platformCredentials: {
      platform: string;
      credentials: Record<string, string>;
    };
  }>) => {
    return request('/publishing/batch', {
      method: 'POST',
      body: JSON.stringify(requests),
    });
  },
};

// Export all APIs
export const backendAPI = {
  auth: authAPI,
  products: productsAPI,
  optimization: optimizationAPI,
  publishing: publishingAPI,
};

export default backendAPI;
