// Backend API Connector

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to get authorization header
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic request function
const request = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers as Record<string, string> || {})
  };
  
  const config: RequestInit = {
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
  login: async (email: string, password: string): Promise<any> => {
    // For login, we need to use x-www-form-urlencoded format
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      } as HeadersInit,
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
  }): Promise<any> => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  getCurrentUser: async (): Promise<any> => {
    return request('/auth/me');
  },
};

// Products API
export const productsAPI = {
  getAll: async (): Promise<any> => {
    return request('/products');
  },
  
  getById: async (id: string): Promise<any> => {
    return request(`/products/${id}`);
  },
  
  create: async (product: any): Promise<any> => {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },
  
  update: async (id: string, product: any): Promise<any> => {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },
  
  delete: async (id: string): Promise<any> => {
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
  }): Promise<any> => {
    return await fetch(`${API_BASE_URL}/optimizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      } as HeadersInit,
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
  }): Promise<any> => {
    return await fetch(`${API_BASE_URL}/publishing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      } as HeadersInit,
      body: JSON.stringify(request),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Publishing failed');
      }
      return res.json();
    });
  },
  
  publishMultiple: async (requests: Array<{
    optimizedListing: any;
    platformCredentials: {
      platform: string;
      credentials: Record<string, string>;
    };
  }>): Promise<any> => {
    return await fetch(`${API_BASE_URL}/publishing/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      } as HeadersInit,
      body: JSON.stringify(requests),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Batch publishing failed');
      }
      return res.json();
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