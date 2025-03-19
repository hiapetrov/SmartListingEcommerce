# Script to start both frontend and Next.js backend

# Function to log messages with color
function Write-ColorOutput {
    param (
        [ConsoleColor]$ForegroundColor,
        [string]$Message
    )
    
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success {
    param ([string]$Message)
    Write-ColorOutput -ForegroundColor Green -Message $Message
}

function Write-Info {
    param ([string]$Message)
    Write-ColorOutput -ForegroundColor Cyan -Message $Message
}

Write-Info "=== Starting AI Listing Optimizer with Next.js Backend ==="
$projectRoot = Get-Location

# Start backend server
Write-Info "Starting Next.js backend server..."
$backendProcess = Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd '$projectRoot\backend-nextjs'; npm run dev" -PassThru
$backendPid = $backendProcess.Id
Write-Success "Next.js backend server started with PID: $backendPid"

# Wait a moment for backend to start
Start-Sleep -Seconds 5
Write-Success "Backend should be running at http://localhost:8000"

# Start frontend server
Write-Info "Starting frontend server..."
$frontendProcess = Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd '$projectRoot'; npm run dev" -PassThru
$frontendPid = $frontendProcess.Id
Write-Success "Frontend server started with PID: $frontendPid"

Write-Success "===== Application Started ====="
Write-Info "- Backend API: http://localhost:8000"
Write-Info "- Frontend: http://localhost:5173 (check the console for the exact URL)"
Write-Info ""
Write-Info "To stop the servers, close the terminal windows or press Ctrl+C in each window"
