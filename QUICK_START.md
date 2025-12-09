# Quick Start Guide

## Step 1: Fix MongoDB Atlas IP Whitelist

Before running the application, you need to whitelist your IP in MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster (demo1)
3. Click "Network Access" in the left sidebar
4. Click "Add IP Address"
5. Either:
   - Click "Add Current IP Address" (recommended for security)
   - Or enter `0.0.0.0/0` to allow all IPs (development only, NOT for production)
6. Click "Confirm"
7. Wait 1-2 minutes for changes to apply

## Step 2: Seed Admin User

Once MongoDB is accessible:

```bash
cd backend
node seedAdmin.js
```

Expected output:
```
Admin user created successfully:
Email: admin@gymtrack.com
Password: admin123
Role: admin
```

If you get "Admin user already exists", that's fine - it means the user was already created.

## Step 3: Start the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE ready in XXXms
Local: http://localhost:5173/
```

## Step 4: Test the Application

1. Open browser to `http://localhost:5173/`
2. Click "Go to Login" or navigate to `/login`
3. Enter credentials:
   - Email: `admin@gymtrack.com`
   - Password: `admin123`
4. Click "Login"
5. You should be redirected to `/dashboard`
6. Try navigating to different sections (Members, Plans, Memberships, Stats)
7. Visit `/profile` to see your user information
8. Click "Logout" to test logout functionality

## Testing Checklist

- [ ] Can access home page (/)
- [ ] Clicking dashboard while logged out redirects to /login
- [ ] Can login with admin credentials
- [ ] After login, redirected to /dashboard
- [ ] Can view profile page
- [ ] Can create/view/update/delete members
- [ ] Can create/view/update/delete plans
- [ ] Can create/view/delete memberships
- [ ] Can view stats overview
- [ ] Can logout successfully
- [ ] After logout, accessing /dashboard redirects to /login
- [ ] After page refresh while logged in, still logged in
- [ ] Browser console shows no errors

## Troubleshooting

### "Cannot connect to MongoDB"
- Check IP whitelist in MongoDB Atlas
- Wait 1-2 minutes after adding IP
- Try restarting backend server

### "Invalid email or password"
- Make sure you ran `node seedAdmin.js`
- Check credentials: admin@gymtrack.com / admin123
- Check backend console for errors

### "Network Error" or "Failed to fetch"
- Make sure backend is running on port 5000
- Check frontend axios baseURL is `http://localhost:5000/api`
- Check CORS is enabled in backend

### Routes not working
- Make sure react-router-dom is installed
- Clear browser localStorage: Open DevTools → Application → Local Storage → Clear
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

## Default Admin Credentials

**Email:** admin@gymtrack.com  
**Password:** admin123

⚠️ **Change these in production!**

## Architecture Overview

### Frontend Routes
- `/` - Home page (public)
- `/login` - Login page (public, redirects if logged in)
- `/dashboard` - Main dashboard (protected)
- `/profile` - User profile (protected)

### Backend API Routes

**Authentication (Public)**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user

**Authentication (Protected)**
- `GET /api/auth/me` - Get current user

**CRUD (All Protected)**
- `GET/POST /api/members` - Get all / Create member
- `PUT/DELETE /api/members/:id` - Update / Delete member
- `GET/POST /api/plans` - Get all / Create plan
- `PUT/DELETE /api/plans/:id` - Update / Delete plan
- `GET/POST /api/memberships` - Get all / Create membership
- `DELETE /api/memberships/:id` - Delete membership
- `GET /api/stats/overview` - Get statistics

## What Was Implemented

✅ **Week 9 Features:**
- React Router with createBrowserRouter
- AuthContext for global state
- Protected routes
- Layout with navigation
- Login/Logout flow
- JWT persistence in localStorage

✅ **Week 10 Features:**
- Axios instance with interceptors
- Automatic JWT token attachment
- Protected backend routes
- CRUD operations
- Error handling
- Loading states
- CORS configuration

## Technologies Used

**Frontend:**
- React 18.2
- React Router 6
- Axios 1.7
- Vite 5.2

**Backend:**
- Express 4.19
- MongoDB + Mongoose 8.4
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv
