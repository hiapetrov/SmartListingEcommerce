@echo off
echo === Connecting Frontend to Backend ===

rem Find the Claude API client file
set CLAUDE_API_FILE=src\shared\api\claude\index.ts
if not exist %CLAUDE_API_FILE% (
  set CLAUDE_API_FILE=frontend\src\shared\api\claude\index.ts
)

if not exist %CLAUDE_API_FILE% (
  echo Could not find Claude API file.
  echo Please specify the path to the Claude API file:
  set /p CLAUDE_API_FILE=
)

rem Create a backup of the original file
copy %CLAUDE_API_FILE% %CLAUDE_API_FILE%.bak
echo Created backup at: %CLAUDE_API_FILE%.bak

rem Update the API endpoint
echo Updating API endpoint...
powershell -Command "(Get-Content %CLAUDE_API_FILE%) -replace 'const CLAUDE_API_URL = .*', 'const CLAUDE_API_URL = \"http://localhost:8000/api/optimizations\";' | Set-Content %CLAUDE_API_FILE%"

echo Frontend connected to backend.
echo You can now run start-all.bat to start both servers.