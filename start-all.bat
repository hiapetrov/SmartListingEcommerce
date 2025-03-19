@echo off
echo === Starting AI Listing Optimizer ===

rem Start the backend server
echo Starting backend server...
start cmd /k "cd backend && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) else (python -m venv venv && call venv\Scripts\activate.bat && pip install -r requirements.txt) && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

rem Give the backend time to start
echo Waiting for backend to start...
timeout /t 5

echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting...
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:5173