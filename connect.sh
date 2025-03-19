#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AI Listing Optimizer Connection Script ===${NC}"

# Determine the project structure
if [ -d "./src" ] && [ -f "./package.json" ]; then
    # We're in the frontend directory
    FRONTEND_DIR="."
    if [ -d "../backend" ]; then
        BACKEND_DIR="../backend"
    else
        echo -e "${YELLOW}Backend directory not found at ../backend${NC}"
        echo -e "${YELLOW}Please enter the path to your backend directory:${NC}"
        read -r BACKEND_DIR
    fi
elif [ -d "./frontend" ] && [ -d "./backend" ]; then
    # We're in the project root
    FRONTEND_DIR="./frontend"
    BACKEND_DIR="./backend"
elif [ -d "./app" ] && [ -f "./requirements.txt" ]; then
    # We're in the backend directory
    BACKEND_DIR="."
    if [ -d "../frontend" ]; then
        FRONTEND_DIR="../frontend"
    else
        echo -e "${YELLOW}Frontend directory not found at ../frontend${NC}"
        echo -e "${YELLOW}Please enter the path to your frontend directory:${NC}"
        read -r FRONTEND_DIR
    fi
else
    echo -e "${YELLOW}Project structure not recognized.${NC}"
    echo -e "${YELLOW}Please enter the path to your frontend directory:${NC}"
    read -r FRONTEND_DIR
    echo -e "${YELLOW}Please enter the path to your backend directory:${NC}"
    read -r BACKEND_DIR
fi

# Validate directories
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}Error: Frontend directory not found at $FRONTEND_DIR${NC}"
    exit 1
fi

if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}Error: Backend directory not found at $BACKEND_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}Frontend directory: $FRONTEND_DIR${NC}"
echo -e "${GREEN}Backend directory: $BACKEND_DIR${NC}"

# Update claude API client to use local backend
CLAUDE_API_FILE="$FRONTEND_DIR/src/shared/api/claude/index.ts"
if [ -f "$CLAUDE_API_FILE" ]; then
    echo -e "${YELLOW}Updating Claude API client to use local backend...${NC}"
    
    # Make a backup
    cp "$CLAUDE_API_FILE" "${CLAUDE_API_FILE}.bak"
    
    # Update API endpoint
    sed -i.tmp 's|const CLAUDE_API_URL = .*|const CLAUDE_API_URL = "http://localhost:8000/api/optimizations";|g' "$CLAUDE_API_FILE"
    
    # Update the implementation to call backend instead of mocking
    sed -i.tmp 's|// This is a simulation - in a real implementation, you would call the Claude API|// Now calling the backend API instead of Claude directly|g' "$CLAUDE_API_FILE"
    sed -i.tmp 's|// const prompt = createOptimizationPrompt(params);|const token = localStorage.getItem("access_token");|g' "$CLAUDE_API_FILE"
    sed -i.tmp 's|// const response = await callClaudeAPI(prompt);|const response = await fetch(CLAUDE_API_URL, {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": \`Bearer \${token}\`\n    },\n    body: JSON.stringify({\n      product: params.product,\n      platforms: [params.platform],\n      optimizationFocus: params.optimizationFocus,\n      targetAudience: params.targetAudience\n    })\n  }).then(res => {\n    if (!res.ok) throw new Error("Optimization failed");\n    return res.json();\n  });|g' "$CLAUDE_API_FILE"
    sed -i.tmp 's|// return parseClaudeResponse(response, params);|return response.optimizedListings.find(listing => listing.platform === params.platform);|g' "$CLAUDE_API_FILE"
    
    # Clean up
    rm -f "${CLAUDE_API_FILE}.tmp"
    
    echo -e "${GREEN}Claude API client updated to use local backend.${NC}"
else
    echo -e "${RED}Claude API client not found at $CLAUDE_API_FILE${NC}"
    echo -e "${YELLOW}Searching for it in other locations...${NC}"
    
    # Try to find it elsewhere
    CLAUDE_API_FILE=$(find "$FRONTEND_DIR" -name "index.ts" -path "*/src/shared/api/claude*" -print -quit)
    
    if [ -n "$CLAUDE_API_FILE" ]; then
        echo -e "${GREEN}Found Claude API client at $CLAUDE_API_FILE${NC}"
        
        # Make a backup
        cp "$CLAUDE_API_FILE" "${CLAUDE_API_FILE}.bak"
        
        # Update API endpoint
        sed -i.tmp 's|const CLAUDE_API_URL = .*|const CLAUDE_API_URL = "http://localhost:8000/api/optimizations";|g' "$CLAUDE_API_FILE"
        
        # Update the implementation to call backend instead of mocking
        sed -i.tmp 's|// This is a simulation - in a real implementation, you would call the Claude API|// Now calling the backend API instead of Claude directly|g' "$CLAUDE_API_FILE"
        sed -i.tmp 's|// const prompt = createOptimizationPrompt(params);|const token = localStorage.getItem("access_token");|g' "$CLAUDE_API_FILE"
        sed -i.tmp 's|// const response = await callClaudeAPI(prompt);|const response = await fetch(CLAUDE_API_URL, {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": \`Bearer \${token}\`\n    },\n    body: JSON.stringify({\n      product: params.product,\n      platforms: [params.platform],\n      optimizationFocus: params.optimizationFocus,\n      targetAudience: params.targetAudience\n    })\n  }).then(res => {\n    if (!res.ok) throw new Error("Optimization failed");\n    return res.json();\n  });|g' "$CLAUDE_API_FILE"
        sed -i.tmp 's|// return parseClaudeResponse(response, params);|return response.optimizedListings.find(listing => listing.platform === params.platform);|g' "$CLAUDE_API_FILE"
        
        # Clean up
        rm -f "${CLAUDE_API_FILE}.tmp"
        
        echo -e "${GREEN}Claude API client updated to use local backend.${NC}"
    else
        echo -e "${RED}Could not find Claude API client in the frontend directory.${NC}"
        echo -e "${YELLOW}You will need to manually update the API endpoints.${NC}"
    fi
fi

# Update auth services to use local backend
AUTH_SERVICE_FILE="$FRONTEND_DIR/src/features/auth/model/service.ts"
if [ -f "$AUTH_SERVICE_FILE" ]; then
    echo -e "${YELLOW}Updating Auth service to use local backend...${NC}"
    
    # Make a backup
    cp "$AUTH_SERVICE_FILE" "${AUTH_SERVICE_FILE}.bak"
    
    # Create the backend connector import
    if ! grep -q "import.*backendAPI" "$AUTH_SERVICE_FILE"; then
        sed -i.tmp '1i\
import { backendAPI } from "../../../shared/api/backend";
' "$AUTH_SERVICE_FILE"
    fi
    
    # Update login function
    sed -i.tmp 's|export const login = async (credentials: LoginCredentials): Promise<User> => {|export const login = async (credentials: LoginCredentials): Promise<User> => {\n  try {|g' "$AUTH_SERVICE_FILE"
    sed -i.tmp 's|// Simulate API call|// Call the backend API for login|g' "$AUTH_SERVICE_FILE"
    sed -i.tmp 's|await new Promise(resolve => setTimeout(resolve, 1000));|const response = await backendAPI.auth.login(credentials.email, credentials.password);\n\n    // Store token\n    localStorage.setItem("access_token", response.access_token);\n\n    // Get user information\n    const user = await backendAPI.auth.getCurrentUser();|g' "$AUTH_SERVICE_FILE"
    
    # Clean up
    rm -f "${AUTH_SERVICE_FILE}.tmp"
    
    echo -e "${GREEN}Auth service updated to use local backend.${NC}"
else
    echo -e "${RED}Auth service not found at $AUTH_SERVICE_FILE${NC}"
    echo -e "${YELLOW}You will need to manually update the Auth service.${NC}"
fi

# Create a backend connector if it doesn't exist
BACKEND_API_DIR="$FRONTEND_DIR/src/shared/api/backend"
if [ ! -d "$BACKEND_API_DIR" ]; then
    echo -e "${YELLOW}Creating backend API connector...${NC}"
    mkdir -p "$BACKEND_API_DIR"
    
    # Create the connector file
    cat > "$BACKEND_API_DIR/index.ts" << 'EOF'
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
    return request('/optimizations', {
      method: 'POST',
      body: JSON.stringify(request),
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
EOF
    
    echo -e "${GREEN}Backend API connector created.${NC}"
fi

# Check if CORS is configured in the backend
MAIN_APP_FILE="$BACKEND_DIR/app/main.py"
if [ -f "$MAIN_APP_FILE" ]; then
    if ! grep -q "CORSMiddleware" "$MAIN_APP_FILE"; then
        echo -e "${YELLOW}Adding CORS configuration to backend...${NC}"
        
        # Make a backup
        cp "$MAIN_APP_FILE" "${MAIN_APP_FILE}.bak"
        
        # Add CORS middleware
        sed -i.tmp '/from fastapi import FastAPI/a\
from fastapi.middleware.cors import CORSMiddleware
' "$MAIN_APP_FILE"
        
        # Add CORS configuration
        sed -i.tmp '/app = FastAPI(/a\
\
# Configure CORS\
app.add_middleware(\
    CORSMiddleware,\
    allow_origins=["http://localhost:5173"],  # Frontend URL\
    allow_credentials=True,\
    allow_methods=["*"],\
    allow_headers=["*"],\
)
' "$MAIN_APP_FILE"
        
        # Clean up
        rm -f "${MAIN_APP_FILE}.tmp"
        
        echo -e "${GREEN}CORS configuration added to backend.${NC}"
    else
        echo -e "${GREEN}CORS is already configured in the backend.${NC}"
    fi
else
    echo -e "${RED}Main backend app file not found at $MAIN_APP_FILE${NC}"
    echo -e "${YELLOW}You will need to manually add CORS configuration to your backend.${NC}"
fi

# Create a start script
echo -e "${YELLOW}Creating start script...${NC}"
cat > start.sh << EOF
#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\${BLUE}=== Starting AI Listing Optimizer ===${NC}"

# Start backend server
echo -e "\${YELLOW}Starting backend server...${NC}"
cd "$BACKEND_DIR"
if [ -d "venv" ]; then
    source venv/bin/activate
fi
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=\$!
cd - > /dev/null

# Wait for backend to start
echo -e "\${YELLOW}Waiting for backend to start...${NC}"
sleep 3

# Check if the backend is running
if ! curl -s http://localhost:8000/health > /dev/null; then
    echo -e "\${RED}Backend failed to start. Check the logs for more information.${NC}"
    kill \$BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "\${GREEN}Backend is running at http://localhost:8000${NC}"
echo -e "\${GREEN}API documentation available at http://localhost:8000/docs${NC}"

# Start frontend
echo -e "\${YELLOW}Starting frontend server...${NC}"
cd "$FRONTEND_DIR"
npm run dev

# This line will only be reached when the frontend server stops
cd - > /dev/null

# Cleanup
echo -e "\${YELLOW}Shutting down backend server...${NC}"
kill \$BACKEND_PID 2>/dev/null
echo -e "\${GREEN}All servers stopped.${NC}"
EOF

chmod +x start.sh

echo -e "${GREEN}Start script created.${NC}"

# Final instructions
echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "${YELLOW}To start the application:${NC}"
echo -e "${BLUE}    ./start.sh${NC}"
echo -e "\n${YELLOW}Default login credentials (if using the demo user):${NC}"
echo -e "    Email: ${BLUE}demo@example.com${NC}"
echo -e "    Password: ${BLUE}password${NC}"
echo -e "\n${YELLOW}Backend API documentation will be available at:${NC}"
echo -e "    ${BLUE}http://localhost:8000/docs${NC}"
echo -e "\n${YELLOW}Frontend will be available at:${NC}"
echo -e "    ${BLUE}http://localhost:5173${NC}"

# Ask if we should start the application now
echo -e "\n${YELLOW}Would you like to start the application now? (y/n)${NC}"
read -r START_NOW

if [[ $START_NOW =~ ^[Yy]$ ]]; then
    ./start.sh
else
    echo -e "${GREEN}You can start the application later by running ./start.sh${NC}"
fi