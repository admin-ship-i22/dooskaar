@echo off
REM DOOS Rental Startup Script for Windows
REM This script starts both the backend server and frontend development server

echo Starting DOOS Rental Application...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting backend server and frontend...
echo    Backend will run on: http://localhost:3001
echo    Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

call npm start
