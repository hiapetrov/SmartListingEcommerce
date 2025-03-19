#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting AI Listing Optimizer ===\033[0m"

# Start backend server
echo -e "${YELLOW}Starting backend server...\033[0m"
cd "backend"
if [ -d "venv" ]; then
    source venv/bin/activate
fi
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd - > /dev/null

# Wait for backend to start
echo -e "${YELLOW}Waiting for backend to start...\033[0m"
sleep 3

# Check if the backend is running
if ! curl -s http://localhost:8000/health > /dev/null; then
    echo -e "${RED}Backend failed to start. Check the logs for more information.\033[0m"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}Backend is running at http://localhost:8000\033[0m"
echo -e "${GREEN}API documentation available at http://localhost:8000/docs\033[0m"

# Start frontend
echo -e "${YELLOW}Starting frontend server...\033[0m"
cd "."
npm run dev

# This line will only be reached when the frontend server stops
cd - > /dev/null

# Cleanup
echo -e "${YELLOW}Shutting down backend server...\033[0m"
kill $BACKEND_PID 2>/dev/null
echo -e "${GREEN}All servers stopped.\033[0m"
