# User Registration & Admin Management - Visual Flow

## System Architecture with User Management

```
┌─────────────────────────────────────────────────────────────────┐
│                    UPDATED APPLICATION FLOW                      │
└─────────────────────────────────────────────────────────────────┘

PUBLIC ROUTES (No Authentication Required)
├── / (HomePage)
├── /login (LoginPage)
└── /register (RegisterPage) ← NEW!

PROTECTED ROUTES (Authentication Required)
├── /dashboard (DashboardPage)
│   └── Requires: canRead permission
├── /profile (ProfilePage)
│   └── Shows: User permissions
└── /admin/users (AdminUsersPage) ← NEW!
    └── Requires: Admin role
```

## User Registration Flow

```
User visits /register
        │
        ↓
Fill registration form
├── Name
├── Email
├── Password
└── Confirm Password
        │
        ↓
Click "Register" button
        │
        ↓
Frontend validation
├── All fields filled?
├── Password match?
└── Password length ≥ 6?
        │
        ↓
POST /api/auth/register
        │
        ↓
Backend creates user
├── Hash password (bcrypt)
├── Set role = 'user'
└── Set default permissions:
    ├── canCreate: false
    ├── canRead: true
    ├── canUpdate: false
    └── canDelete: false
        │
        ↓
Return success message
        │
        ↓
Redirect to /login
with success notification
        │
        ↓
User logs in with
new credentials
        │
        ↓
Access dashboard with
read-only permissions
```

## Admin User Management Flow

```
Admin logs in
        │
        ↓
Navigation shows "Users" link
(only visible to admins)
        │
        ↓
Click "Users" link
        │
        ↓
Navigate to /admin/users
        │
        ↓
GET /api/users (admin protected)
        │
        ↓
Display user table:
┌────────────────────────────────────────────────────────┐
│ Name  │ Email │ Role │ Create │ Read │ Update │ Delete │
├────────────────────────────────────────────────────────┤
│ Admin │ admin │admin │   ✓    │  ✓   │   ✓    │   ✓   │
│ John  │ john  │user  │   ☐    │  ✓   │   ☐    │   ☐   │
│ Jane  │ jane  │user  │   ☐    │  ✓   │   ☐    │   ☐   │
└────────────────────────────────────────────────────────┘
        │
        ↓
Admin toggles permission checkbox
        │
        ↓
PUT /api/users/:id/permissions
{ canCreate: true }
        │
        ↓
Backend updates user
        │
        ↓
Frontend updates table
        │
        ↓
User now has Create permission
```

## Permission System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   PERMISSION LEVELS                      │
└─────────────────────────────────────────────────────────┘

ADMIN ROLE (role: 'admin')
├── Always has all permissions
├── Cannot be modified by other admins
├── Cannot delete themselves
└── Can manage all users
    │
    ├── View all users (GET /api/users)
    ├── Update permissions (PUT /api/users/:id/permissions)
    └── Delete users (DELETE /api/users/:id)

USER ROLE (role: 'user')
├── Permissions managed by admin
├── Default: Read-only
└── Available permissions:
    │
    ├── canCreate (Add new records)
    ├── canRead (View data)
    ├── canUpdate (Edit records)
    └── canDelete (Remove records)
```

## User Management Page Layout

```
┌───────────────────────────────────────────────────────────────┐
│  GymTrack                     Dashboard | Profile | Users ▼   │
└───────────────────────────────────────────────────────────────┘

                        User Management
              Manage user access and permissions

┌───────────────────────────────────────────────────────────────┐
│                         Users Table                            │
├──────┬──────────┬──────┬────┬────┬────┬────┬─────────────────┤
│ Name │  Email   │ Role │ C  │ R  │ U  │ D  │    Actions      │
├──────┼──────────┼──────┼────┼────┼────┼────┼─────────────────┤
│Admin │admin@... │admin │ ✓  │ ✓  │ ✓  │ ✓  │   Protected     │
├──────┼──────────┼──────┼────┼────┼────┼────┼─────────────────┤
│ John │john@...  │user  │ ☑  │ ✓  │ ☐  │ ☐  │ [Delete Button] │
├──────┼──────────┼──────┼────┼────┼────┼────┼─────────────────┤
│ Jane │jane@...  │user  │ ☐  │ ✓  │ ☑  │ ☐  │ [Delete Button] │
└──────┴──────────┴──────┴────┴────┴────┴────┴─────────────────┘

Legend: C=Create, R=Read, U=Update, D=Delete
        ✓ = Enabled, ☐ = Disabled, ☑ = Checkbox

┌───────────────────────────────────────────────────────────────┐
│                      Permission Guide                          │
│  • Create: Can add new members, plans, and memberships        │
│  • Read: Can view data (enabled by default)                   │
│  • Update: Can edit existing records                           │
│  • Delete: Can remove records                                  │
│                                                                 │
│  Note: Admin users have all permissions by default            │
└───────────────────────────────────────────────────────────────┘
```

## Registration Page Layout

```
┌───────────────────────────────────────────────────────────────┐
│  GymTrack                              Home | Login            │
└───────────────────────────────────────────────────────────────┘

                    Create Account

        ┌─────────────────────────────────────────┐
        │ Name:                                    │
        │ [Your full name                      ]  │
        ├─────────────────────────────────────────┤
        │ Email:                                   │
        │ [your@email.com                      ]  │
        ├─────────────────────────────────────────┤
        │ Password:                                │
        │ [••••••••                             ]  │
        ├─────────────────────────────────────────┤
        │ Confirm Password:                        │
        │ [••••••••                             ]  │
        ├─────────────────────────────────────────┤
        │           [  Register  ]                 │
        └─────────────────────────────────────────┘

            Already have an account? Login here

    ┌─────────────────────────────────────────────────┐
    │ Note: New accounts have read-only access by     │
    │ default. Contact an administrator for           │
    │ additional permissions.                         │
    └─────────────────────────────────────────────────┘
```

## Updated Profile Page

```
┌───────────────────────────────────────────────────────────────┐
│  GymTrack               Dashboard | Profile | Users            │
└───────────────────────────────────────────────────────────────┘

                        User Profile

        ┌─────────────────────────────────────────┐
        │ Name: John Doe                           │
        │                                          │
        │ Email: john@example.com                  │
        │                                          │
        │ Role: [ user ]                           │
        │                                          │
        │ Permissions:                             │
        │ [ Read ]                                 │
        │                                          │
        │ User ID: 507f1f77bcf86cd799439011        │
        └─────────────────────────────────────────┘

    This is your profile page where you can view your
    account information and permissions.

    Contact an administrator to request additional
    permissions.
```

## Data Model Updates

```
User Model (Updated)
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'user',
  permissions: {                    ← NEW FIELD
    canCreate: Boolean,
    canRead: Boolean,
    canUpdate: Boolean,
    canDelete: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints Summary

```
┌───────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION ROUTES                       │
└───────────────────────────────────────────────────────────────┘

POST   /api/auth/register           Create new user account
POST   /api/auth/login              Authenticate user
GET    /api/auth/me                 Get current user info

┌───────────────────────────────────────────────────────────────┐
│                 USER MANAGEMENT ROUTES (Admin)                 │
└───────────────────────────────────────────────────────────────┘

GET    /api/users                   Get all users (admin only)
PUT    /api/users/:id/permissions   Update user permissions
DELETE /api/users/:id               Delete user (admin only)
```

## Component Hierarchy (Updated)

```
main.jsx
└── AuthProvider
    └── RouterProvider
        └── Layout
            ├── Navigation
            │   ├── Home
            │   ├── Dashboard
            │   ├── Profile
            │   ├── Users (admin only) ← NEW!
            │   └── Login/Logout
            │
            └── <Outlet />
                ├── HomePage (/)
                ├── LoginPage (/login)
                ├── RegisterPage (/register) ← NEW!
                ├── DashboardPage (/dashboard)
                ├── ProfilePage (/profile)
                └── AdminUsersPage (/admin/users) ← NEW!
```

## Permission Check Flow

```
User attempts action (e.g., create member)
        │
        ↓
Frontend checks user.permissions.canCreate
        │
        ├─────── TRUE ────────┐
        │                      ↓
        │              Show create button
        │                      ↓
        │              User clicks button
        │                      ↓
        │              POST /api/members
        │                      ↓
        │              Backend verifies JWT
        │                      ↓
        │              Check user permissions
        │                      ↓
        │              Create member
        │                      ↓
        │              Return success
        │
        └─────── FALSE ───────┐
                               ↓
                       Hide create button
                               ↓
                       Show read-only view
```

## Security Flow

```
┌───────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                           │
└───────────────────────────────────────────────────────────────┘

1. Authentication (JWT)
   ├── Valid token required for protected routes
   └── Token contains user ID and role

2. Role-Based Access
   ├── Admin: Full access to user management
   └── User: Limited by individual permissions

3. Permission-Based Actions
   ├── Frontend: Hide/show UI elements
   └── Backend: Verify before executing

4. Protected Operations
   ├── Cannot delete admin accounts
   ├── Cannot modify admin permissions
   └── Cannot delete own account
```

---

**Visual Guide Complete**
All diagrams show the complete user registration and admin management system.
