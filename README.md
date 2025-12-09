# MERN GymTrack Application - Week 9 & 10 Implementation

## Overview
This application implements a full MERN stack with authentication, protected routes, and JWT-based authorization following Week 9 and Week 10 curriculum.

## Features Implemented

### Week 9 - React Router + Authentication
✅ React Router v6 with createBrowserRouter
✅ AuthContext for global authentication state
✅ Protected routes using ProtectedRoute component
✅ Layout component with navigation
✅ Login/Logout functionality
✅ JWT token persistence in localStorage
✅ Automatic token loading on app refresh

### Week 10 - API Communication
✅ Axios instance with baseURL configuration
✅ JWT token interceptor (automatic token attachment)
✅ CRUD operations for Members, Plans, and Memberships
✅ Protected backend routes with JWT verification
✅ Error handling and loading states
✅ CORS enabled for frontend-backend communication

## Project Structure

### Frontend (`/frontend`)
```
src/
├── components/
│   ├── Layout.jsx           # Main layout with navigation
│   ├── ProtectedRoute.jsx   # Route protection wrapper
│   ├── Navbar.jsx           # Dashboard navigation
│   └── [other components]
├── pages/
│   ├── HomePage.jsx         # Public home page
│   ├── LoginPage.jsx        # Login form
│   ├── DashboardPage.jsx    # Protected dashboard
│   └── ProfilePage.jsx      # Protected user profile
├── context/
│   └── AuthContext.jsx      # Authentication context
├── services/
│   └── api.js               # Axios instance with interceptors
└── main.jsx                 # Router and AuthProvider setup
```

### Backend (`/backend`)
```
├── models/
│   ├── User.js              # User model with password hashing
│   ├── Member.js
│   ├── Plan.js
│   └── Membership.js
├── controllers/
│   ├── authController.js    # Login, register, getMe
│   └── [other controllers]
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   └── errorMiddleware.js
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── [other routes]       # All protected with JWT
├── seedAdmin.js             # Admin user seeder
└── server.js                # Express server setup
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies (already done)
npm install

# Configure MongoDB
# Edit .env and update MONGO_URI if needed
# Make sure your IP is whitelisted in MongoDB Atlas

# Seed admin user
node seedAdmin.js

# Start backend server
npm run dev
```

**Admin Credentials:**
- Email: `admin@gymtrack.com`
- Password: `admin123`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

### 3. Access the Application

1. Open browser to `http://localhost:5173`
2. Navigate to Login page
3. Use admin credentials to login
4. You'll be redirected to the protected Dashboard

## API Endpoints

### Authentication (Public)
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Authentication (Protected)
- `GET /api/auth/me` - Get current user info

### Protected CRUD Routes (Require JWT)
- Members: `/api/members` (GET, POST, PUT, DELETE)
- Plans: `/api/plans` (GET, POST, PUT, DELETE)
- Memberships: `/api/memberships` (GET, POST, DELETE)
- Stats: `/api/stats/overview` (GET)

## How It Works

### Authentication Flow

1. **Login**
   - User submits email/password
   - Backend verifies credentials
   - Returns JWT token + user data
   - Frontend stores token in localStorage
   - User is redirected to dashboard

2. **Protected Routes**
   - ProtectedRoute checks for user in AuthContext
   - If no user, redirect to /login
   - If user exists, render protected content

3. **API Requests**
   - Axios interceptor automatically attaches JWT to headers
   - Backend middleware verifies token
   - If valid, request proceeds
   - If invalid/expired, returns 401 and user is logged out

4. **Logout**
   - Clears token from localStorage
   - Clears user from AuthContext
   - Redirects to login page

### Key Components

**AuthContext** provides:
- `user` - Current user object or null
- `token` - JWT token string
- `login(email, password)` - Login function
- `logout()` - Logout function
- `loading` - Loading state during initialization

**Axios Interceptors**:
- **Request**: Adds `Authorization: Bearer ${token}` header
- **Response**: Handles 401 errors by clearing token and redirecting to login

## Important Notes

### MongoDB Atlas Configuration
⚠️ **IMPORTANT**: You must whitelist your IP address in MongoDB Atlas:
1. Go to MongoDB Atlas Dashboard
2. Navigate to Network Access
3. Add your current IP address or use 0.0.0.0/0 for development (not recommended for production)

### Environment Variables
Backend `.env` file contains:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

⚠️ **Security**: Change JWT_SECRET in production!

### CORS Configuration
CORS is enabled for all origins in development:
```javascript
app.use(cors())
```

For production, configure specific origins:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}))
```

## Testing the Implementation

### Test Authentication
1. ✅ Visit `/` - Should show home page
2. ✅ Try to visit `/dashboard` - Should redirect to `/login`
3. ✅ Login with admin credentials
4. ✅ Should redirect to `/dashboard`
5. ✅ Visit `/profile` - Should show user info
6. ✅ Logout - Should clear session and redirect to login

### Test API Protection
1. ✅ Login to get JWT token
2. ✅ Create/Read/Update/Delete members/plans/memberships
3. ✅ Logout
4. ✅ Try to access API - Should get 401 error
5. ✅ Should be redirected to login automatically

### Test Token Persistence
1. ✅ Login to the app
2. ✅ Refresh the page
3. ✅ Should remain logged in (token loaded from localStorage)
4. ✅ Close and reopen browser
5. ✅ Should still be logged in

## Troubleshooting

### Cannot connect to MongoDB
- Check if your IP is whitelisted in MongoDB Atlas
- Verify MONGO_URI in .env file
- Check if MongoDB cluster is running

### 401 Unauthorized errors
- Make sure you're logged in
- Check if JWT_SECRET matches between login and verification
- Check browser console for token in localStorage

### CORS errors
- Verify CORS is enabled in backend (`app.use(cors())`)
- Check if backend is running on port 5000
- Check if frontend is making requests to correct baseURL

### Routes not working
- Clear browser cache and localStorage
- Restart both frontend and backend servers
- Check browser console for errors

## Next Steps

### Enhancements You Can Add
- [ ] User registration page with validation
- [ ] Password reset functionality
- [ ] Role-based access control (admin vs user)
- [ ] Refresh token implementation
- [ ] Remember me functionality
- [ ] Activity logging
- [ ] Email verification
- [ ] Profile editing

### Production Considerations
- [ ] Change JWT_SECRET to strong random string
- [ ] Configure CORS for specific origins
- [ ] Add rate limiting
- [ ] Add input validation and sanitization
- [ ] Implement HTTPS
- [ ] Add security headers (helmet.js)
- [ ] Set up proper error logging
- [ ] Add API documentation

## Technologies Used

### Frontend
- React 18
- React Router 6
- Axios
- Vite

### Backend
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## Course Compliance

This implementation follows the exact structure taught in:
- **Week 9**: React Router, AuthContext, Protected Routes
- **Week 10**: Axios configuration, API services, JWT interceptors, CRUD operations

All patterns match the class examples:
- ✅ `useEffect` for data loading
- ✅ Context API for session management
- ✅ Router structure with `<Layout>` + `<Outlet>`
- ✅ Services folder for API calls
- ✅ No prop drilling beyond class patterns
- ✅ CORS before routes in Express
- ✅ Middleware for route protection
