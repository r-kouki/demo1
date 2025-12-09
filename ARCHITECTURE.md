# Application Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                 React Application                       │    │
│  │                  (Port 5173)                            │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │           React Router (v6)                      │  │    │
│  │  │  ┌────────────────────────────────────────────┐  │  │    │
│  │  │  │  Routes:                                    │  │  │    │
│  │  │  │  • / (HomePage) - Public                    │  │  │    │
│  │  │  │  • /login (LoginPage) - Public              │  │  │    │
│  │  │  │  • /dashboard (DashboardPage) - Protected   │  │  │    │
│  │  │  │  • /profile (ProfilePage) - Protected       │  │  │    │
│  │  │  └────────────────────────────────────────────┘  │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │        AuthContext (Global State)                │  │    │
│  │  │  • user: Object | null                           │  │    │
│  │  │  • token: String | null                          │  │    │
│  │  │  • login(email, password)                        │  │    │
│  │  │  • logout()                                      │  │    │
│  │  │  • loading: Boolean                              │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  │                           ↕                             │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │     Axios Instance + Interceptors                │  │    │
│  │  │  baseURL: http://localhost:5000/api              │  │    │
│  │  │                                                   │  │    │
│  │  │  Request Interceptor:                            │  │    │
│  │  │    → Add Authorization: Bearer {token}           │  │    │
│  │  │                                                   │  │    │
│  │  │  Response Interceptor:                           │  │    │
│  │  │    → Catch 401 errors                            │  │    │
│  │  │    → Clear token & redirect to login             │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                        HTTP Requests
                    (with JWT in headers)
                               │
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Express Server (Port 5000)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   Middleware Layer                      │    │
│  │  1. CORS                                                │    │
│  │  2. express.json()                                      │    │
│  │  3. Auth Middleware (protect) - verifies JWT            │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    API Routes                           │    │
│  │                                                          │    │
│  │  Public Routes:                                         │    │
│  │  • POST /api/auth/login                                 │    │
│  │  • POST /api/auth/register                              │    │
│  │                                                          │    │
│  │  Protected Routes (require JWT):                        │    │
│  │  • GET  /api/auth/me                                    │    │
│  │  • GET/POST /api/members                                │    │
│  │  • PUT/DELETE /api/members/:id                          │    │
│  │  • GET/POST /api/plans                                  │    │
│  │  • PUT/DELETE /api/plans/:id                            │    │
│  │  • GET/POST /api/memberships                            │    │
│  │  • DELETE /api/memberships/:id                          │    │
│  │  • GET /api/stats/overview                              │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    Controllers                          │    │
│  │  • authController.js                                    │    │
│  │  • memberController.js                                  │    │
│  │  • planController.js                                    │    │
│  │  • membershipController.js                              │    │
│  │  • statsController.js                                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │               Mongoose Models                           │    │
│  │  • User (with password hashing)                         │    │
│  │  • Member                                               │    │
│  │  • Plan                                                 │    │
│  │  • Membership                                           │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │   MongoDB Atlas     │
                    │   (Cloud Database)  │
                    │                     │
                    │  Collections:       │
                    │  • users            │
                    │  • members          │
                    │  • plans            │
                    │  • memberships      │
                    └─────────────────────┘
```

## Authentication Flow Diagram

```
┌──────────┐                                              ┌──────────┐
│  Client  │                                              │  Server  │
└────┬─────┘                                              └────┬─────┘
     │                                                         │
     │  1. POST /api/auth/login                               │
     │     { email, password }                                │
     ├───────────────────────────────────────────────────────>│
     │                                                         │
     │                                    2. Validate password │
     │                                       (bcrypt.compare)  │
     │                                                         │
     │                                      3. Generate JWT    │
     │                                         (jwt.sign)      │
     │                                                         │
     │  4. Return { token, user }                             │
     │<───────────────────────────────────────────────────────┤
     │                                                         │
     │  5. Store token in localStorage                        │
     │     Set user in AuthContext                            │
     │                                                         │
     │  6. Redirect to /dashboard                             │
     │                                                         │
     │  7. GET /api/members                                   │
     │     Headers: Authorization: Bearer {token}             │
     ├───────────────────────────────────────────────────────>│
     │                                                         │
     │                                      8. Verify JWT      │
     │                                         (jwt.verify)    │
     │                                                         │
     │                                      9. Attach user     │
     │                                         to req.user     │
     │                                                         │
     │                                     10. Execute request │
     │                                                         │
     │  11. Return members data                               │
     │<───────────────────────────────────────────────────────┤
     │                                                         │
     │  12. Display data in UI                                │
     │                                                         │
```

## Protected Route Flow Diagram

```
User tries to access /dashboard
         │
         ↓
   ProtectedRoute
     Component
         │
         ↓
   Check AuthContext
         │
         ├─────────────────┬─────────────────┐
         │                 │                 │
    user exists       user is null      loading is true
         │                 │                 │
         ↓                 ↓                 ↓
  Render children    <Navigate to      Show loading
   (Dashboard)         /login />         spinner
```

## Component Hierarchy

```
main.jsx
└── AuthProvider (Context)
    └── RouterProvider
        └── Layout
            ├── Navigation Bar
            │   ├── Logo
            │   ├── Links (Home, Dashboard, Profile)
            │   └── Auth Status (Login/Logout button)
            └── <Outlet />  ← Child routes render here
                │
                ├── HomePage (/)
                │
                ├── LoginPage (/login)
                │   └── Login Form
                │
                ├── ProtectedRoute (/dashboard)
                │   └── DashboardPage
                │       ├── Navbar (View Switcher)
                │       └── Dynamic View
                │           ├── MemberForm + MemberList
                │           ├── PlanForm + PlanList
                │           ├── MembershipForm + MembershipList
                │           └── StatsOverview
                │
                └── ProtectedRoute (/profile)
                    └── ProfilePage
                        └── User Information Display
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Component Lifecycle                      │
└─────────────────────────────────────────────────────────────┘

Component Mount
      │
      ↓
useEffect() triggered
      │
      ↓
Call API service function
      │
      ↓
Axios interceptor adds JWT
      │
      ↓
HTTP Request to backend
      │
      ↓
Backend middleware verifies JWT
      │
      ↓
Controller processes request
      │
      ↓
Mongoose queries database
      │
      ↓
Response sent to frontend
      │
      ↓
Axios interceptor checks status
      │
      ├──────────────────┬──────────────────┐
      │                  │                  │
  200 OK           401 Unauthorized    Other Error
      │                  │                  │
      ↓                  ↓                  ↓
Update component    Clear token &      Show error
    state           redirect to login   message
      │
      ↓
Component re-renders
      │
      ↓
Display data in UI
```

## File Structure with Flow

```
frontend/src/
│
├── main.jsx  ─────────────────────┐
│   │                                │
│   ├── Import AuthProvider         │
│   ├── Import RouterProvider       │
│   └── Wrap app                    │
│                                    │
├── context/                         │
│   └── AuthContext.jsx ←───────────┤
│       │                            │
│       ├── useState(user, token)    │
│       ├── login() function         │
│       ├── logout() function        │
│       └── useEffect (load token)   │
│                                    │
├── components/                      │
│   ├── Layout.jsx                   │
│   │   └── Uses useAuth() ←────────┤
│   │                                │
│   └── ProtectedRoute.jsx           │
│       └── Uses useAuth() ←────────┤
│                                    │
├── pages/                           │
│   ├── HomePage.jsx                 │
│   │   └── Uses useAuth() ←────────┤
│   │                                │
│   ├── LoginPage.jsx                │
│   │   └── Uses useAuth() ←────────┤
│   │                                │
│   ├── DashboardPage.jsx            │
│   │   └── Uses api services        │
│   │                                │
│   └── ProfilePage.jsx              │
│       └── Uses useAuth() ←────────┤
│                                    │
└── services/                        │
    └── api.js                       │
        │                            │
        ├── Axios instance           │
        ├── Request interceptor      │
        │   └── Reads token ←────────┘
        │       from localStorage
        │
        └── Response interceptor
            └── Catches 401 errors
```

## Security Flow

```
┌─────────────────────────────────────────────────┐
│            Security Mechanisms                   │
└─────────────────────────────────────────────────┘

1. Password Storage
   User registers → Password hashed with bcrypt → Stored in DB
   
2. Authentication
   Login → Verify hashed password → Generate JWT → Send to client
   
3. Authorization
   Client request → JWT in header → Backend verifies → Allows/Denies
   
4. Token Storage
   JWT stored in localStorage → Automatically attached to requests
   
5. Token Expiration
   JWT expires after 30 days → 401 error → Auto logout
   
6. Route Protection
   Frontend: ProtectedRoute checks user
   Backend: Middleware verifies JWT
   
7. CORS Protection
   Only localhost:5173 can access API (in development)
```

---

**Legend:**
- `→` : Data flow / Function call
- `↓` : Process continuation
- `←` : Data source / Import
- `├─` : Decision branch
- `│` : Connection

This diagram shows how all components work together to create a secure, authenticated MERN application following Week 9 & 10 patterns.
