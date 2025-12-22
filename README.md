# DOOS Rental - Vehicle Rental Management System

This is a complete vehicle rental management application with a React frontend and Express/SQLite backend.

## Features

- Vehicle management
- Customer management
- Booking system with availability checks
- Admin authentication
- Real-time data synchronization

## Run Locally

**Prerequisites:** Node.js

### Quick Start

**Option 1: Using npm**

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application:
   ```bash
   npm start
   ```

**Option 2: Using startup scripts**

- **Linux/Mac:** Run `./start.sh`
- **Windows:** Run `start.bat`

This will start both the backend server (http://localhost:3001) and the frontend (http://localhost:3000).

### Run Servers Separately

If you need to run the servers separately:

- Backend server: `npm run dev:server` (runs on port 3001)
- Frontend: `npm run dev` (runs on port 3000)

## Configuration

The following environment variables can be set (all are optional):

- `PORT` - Backend server port (default: 3001)
- `ADMIN_PASSWORD` - Admin login password (default: "admin")
- `DATABASE_PATH` - SQLite database path (default: "server/data.sqlite")

## Default Admin Credentials

- Password: `admin` (can be changed via `ADMIN_PASSWORD` environment variable)
