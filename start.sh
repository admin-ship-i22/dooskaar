#!/bin/bash

# DOOS Rental Startup Script
# This script starts both the backend server and frontend development server

echo "🚀 Starting DOOS Rental Application..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Starting backend server and frontend..."
echo "   Backend will run on: http://localhost:3001"
echo "   Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

npm start
