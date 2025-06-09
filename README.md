# REST Country API

A full-stack project that provides a REST API for country information and a React frontend to explore it.

## Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in `backend` with your database credentials:
   ```env
   PGHOST=localhost
   PGUSER=your_db_user
   PGPASSWORD=your_db_password
   PGDATABASE=your_db_name
   PORT=5000
   ```
3. Start the server:
   ```bash
   node server.js
   ```

The API will be available at `http://localhost:5000` by default.

## Frontend Setup

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

This will launch the React application using Vite.

