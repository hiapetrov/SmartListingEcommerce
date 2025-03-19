#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting AI Listing Optimizer ===${NC}"

# Find backend directory
if [ -d "./backend" ]; then
    BACKEND_DIR="./backend"
elif [ -d "../backend" ]; then
    BACKEND_DIR="../backend"
else
    echo -e "${YELLOW}Could not automatically find backend directory.${NC}"
    echo -e "${YELLOW}Please enter the path to your backend directory:${NC}"
    read -r BACKEND_DIR
fi

# Find frontend directory
if [ -d "./src" ] && [ -f "./package.json" ]; then
    FRONTEND_DIR="."
elif [ -d "./frontend" ]; then
    FRONTEND_DIR="./frontend"
elif [ -d "../frontend" ]; then
    FRONTEND_DIR="../frontend"
else
    echo -e "${YELLOW}Could not automatically find frontend directory.${NC}"
    echo -e "${YELLOW}Please enter the path to your frontend directory:${NC}"
    read -r FRONTEND_DIR
fi

# Start backend server
echo -e "${YELLOW}Starting backend server...${NC}"
cd "$BACKEND_DIR"

# Check if virtual environment exists and activate it
if [ -d "venv" ]; then
    echo -e "${GREEN}Activating virtual environment...${NC}"
    source venv/bin/activate
elif [ -d "env" ]; then
    echo -e "${GREEN}Activating virtual environment...${NC}"
    source env/bin/activate
fi

# Check if requirements are installed
if ! pip list | grep -q "fastapi"; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    pip install -r requirements.txt
fi

# Start the backend server
echo -e "${GREEN}Starting FastAPI server...${NC}"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Go back to the original directory
cd - > /dev/null

# Wait for backend to start
echo -e "${YELLOW}Waiting for backend to start...${NC}"
sleep 3

# Try to check if the backend is running
BACKEND_RUNNING=false
if command -v curl &> /dev/null; then
    if curl -s http://localhost:8000/health &> /dev/null || curl -s http://localhost:8000 &> /dev/null; then
        BACKEND_RUNNING=true
    fi
elif command -v wget &> /dev/null; then
    if wget -q --spider http://localhost:8000/health &> /dev/null || wget -q --spider http://localhost:8000 &> /dev/null; then
        BACKEND_RUNNING=true
    fi
fi

if [ "$BACKEND_RUNNING" = true ]; then
    echo -e "${GREEN}Backend server is running at http://localhost:8000${NC}"
    echo -e "${GREEN}API documentation available at http://localhost:8000/docs${NC}"
else
    echo -e "${YELLOW}Could not verify if backend is running, but continuing anyway...${NC}"
fi

# Start frontend
echo -e "${YELLOW}Starting frontend server...${NC}"
cd "$FRONTEND_DIR"

# Check if node modules are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

# Start the frontend server
echo -e "${GREEN}Starting frontend development server...${NC}"
npm run dev

# This will only be reached when the frontend server stops
cd - > /dev/null

# Clean up the backend process
echo -e "${YELLOW}Shutting down backend server...${NC}"
kill $BACKEND_PID 2>/dev/null
wait $BACKEND_PID 2>/dev/null

echo -e "${GREEN}All servers stopped.${NC}"