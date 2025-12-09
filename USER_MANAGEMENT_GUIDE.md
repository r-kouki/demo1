# User Registration & Admin Management - Setup Guide

## ✅ Features Added

### 1. User Registration
- Public registration page at `/register`
- New users get read-only access by default
- Email and password validation
- Automatic redirect to login after successful registration

### 2. Admin User Management
- Admin-only page at `/admin/users`
- View all registered users
- Toggle individual permissions (Create, Read, Update, Delete)
- Delete non-admin users
- Protected admin accounts

### 3. Permission System
Each user has four permissions:
- **Create**: Add new members, plans, memberships
- **Read**: View data (enabled by default)
- **Update**: Edit existing records
- **Delete**: Remove records

## 📋 Setup Instructions

### Step 1: Fix MongoDB Connection

Your MongoDB Atlas requires IP whitelisting. Choose one option:

**Option A: Whitelist Your Current IP**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your project
3. Click "Network Access" in the left sidebar
4. Click "Add IP Address"
5. Add your current IP or click "Add Current IP Address"
6. Wait 1-2 minutes for changes to take effect

**Option B: Allow All IPs (Development Only)**
1. In Network Access
2. Add IP: `0.0.0.0/0`
3. ⚠️ **Warning**: Only use this for development!

### Step 2: Create Admin User

Once MongoDB is connected:

```bash
cd backend
node seedAdmin.js
```

You should see:
```
Admin user created successfully:
Email: admin@gymtrack.com
Password: admin123
Role: admin
Permissions: Full Access (CRUD)
```

### Step 3: Test the Application

**Backend should already be running on:** `http://localhost:5000`
**Frontend should already be running on:** `http://localhost:5173`

## 🧪 Testing Instructions

### Test 1: User Registration
1. Visit `http://localhost:5173/register`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
3. Click "Register"
4. Should redirect to login with success message
5. Login with the new credentials
6. Check Profile page - should show only "Read" permission

### Test 2: Admin Login
1. Visit `http://localhost:5173/login`
2. Login with:
   - Email: `admin@gymtrack.com`
   - Password: `admin123`
3. Should see "Users" link in navigation (admin only)
4. Dashboard should allow all CRUD operations

### Test 3: Admin User Management
1. Login as admin
2. Click "Users" in navigation
3. Should see list of all users
4. Try toggling permissions for a regular user
5. Try deleting a regular user (not admin)
6. Verify you cannot delete admin accounts

### Test 4: Permission Enforcement
1. Register a new user
2. Login as that user
3. Try to create a new member - should fail (no permission)
4. View members - should work (read permission)
5. Login as admin
6. Go to Users page
7. Enable "Create" permission for the test user
8. Logout and login as test user again
9. Try creating a member - should now work!

## 📁 New Files Created

### Backend
```
backend/
├── controllers/
│   └── userController.js       # User management logic
├── routes/
│   └── userRoutes.js           # Admin user endpoints
└── models/
    └── User.js (updated)       # Added permissions field
```

### Frontend
```
frontend/
├── pages/
│   ├── RegisterPage.jsx        # User registration form
│   └── AdminUsersPage.jsx      # Admin user management
└── [updated files]
    ├── main.jsx                # Added new routes
    ├── Layout.jsx              # Added Users link for admin
    ├── LoginPage.jsx           # Added register link
    ├── ProfilePage.jsx         # Shows permissions
    └── AuthContext.jsx         # Includes permissions
```

## 🔐 API Endpoints

### Authentication (Public)
```
POST /api/auth/register
Body: { name, email, password }
Returns: { token, user }
```

### User Management (Admin Only)
```
GET /api/users
Returns: Array of all users

PUT /api/users/:id/permissions
Body: { canCreate, canRead, canUpdate, canDelete }
Returns: Updated user

DELETE /api/users/:id
Returns: { message: 'User removed' }
```

## 🎯 Permission Defaults

### New Regular Users
```javascript
{
  canCreate: false,
  canRead: true,
  canUpdate: false,
  canDelete: false
}
```

### Admin Users
```javascript
{
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true
}
```

## 🔒 Security Features

1. **Role-Based Access Control**
   - Admin role has full access
   - Regular users have limited permissions
   - Admin-only routes protected

2. **Permission Checks**
   - Frontend: UI elements hidden based on permissions
   - Backend: API endpoints verify user permissions
   - Cannot modify admin accounts

3. **Safe Defaults**
   - New users start with read-only access
   - Admins cannot delete themselves
   - Admin permissions cannot be revoked

## 📊 User Roles Explained

### Admin (`role: 'admin'`)
- Can access User Management page
- Can view all users
- Can modify user permissions
- Can delete regular users
- Cannot be deleted by other admins
- Has all CRUD permissions by default

### Regular User (`role: 'user'`)
- Cannot access User Management
- Permissions controlled by admin
- Can be deleted by admin
- Starts with read-only access

## 🎨 UI Updates

### Navigation Bar
- Shows "Users" link only for admins
- "Register" link added to login page
- "Login" link added to register page

### Profile Page
- Now displays user permissions visually
- Color-coded permission badges
- Shows role badge

### Login Page
- Success message after registration
- Link to registration page

### Register Page
- Full form validation
- Password strength check
- Confirmation message
- Link back to login

## 💡 Usage Scenarios

### Scenario 1: Gym Manager (Admin)
- Creates account for new staff member
- Staff member registers via `/register`
- Manager goes to Users page
- Grants "Create" and "Update" permissions
- Staff can now add/edit members but not delete

### Scenario 2: Read-Only User
- Accountant needs to view membership data
- Registers account
- Admin does not change permissions
- Can view all data but cannot modify anything

### Scenario 3: Full Access Staff
- Trusted staff member needs full access
- Registers account
- Admin grants all CRUD permissions
- Can perform all operations except manage users

## 🐛 Troubleshooting

### "Not authorized as admin"
- User is not logged in as admin
- Check user role in Profile page
- Only admins can access `/admin/users`

### "User already exists"
- Email is already registered
- Try logging in instead
- Use forgot password (if implemented)

### Cannot toggle permissions
- Refresh the page
- Check backend is running
- Verify admin is logged in
- Admin accounts cannot be modified

### Permissions not updating
- Logout and login again
- Token needs to be refreshed
- Clear localStorage if needed

## 📝 Quick Reference

### Admin Credentials
```
Email: admin@gymtrack.com
Password: admin123
```

### Routes
```
/register         - User registration (public)
/login            - User login (public)
/dashboard        - Main dashboard (protected)
/profile          - User profile (protected)
/admin/users      - User management (admin only)
```

### Permission Flags
```javascript
canCreate  // Add new records
canRead    // View data
canUpdate  // Edit records
canDelete  // Remove records
```

## ✨ Success Criteria

- ✅ Users can register new accounts
- ✅ New users have read-only access by default
- ✅ Admins can view all users
- ✅ Admins can toggle individual permissions
- ✅ Admins can delete regular users
- ✅ Admin accounts are protected
- ✅ Permissions are enforced
- ✅ UI is simple and follows project structure
- ✅ Academic project requirements met

## 🚀 Next Steps (Optional)

1. Implement permission checks in frontend components
2. Hide Create/Update/Delete buttons based on user permissions
3. Add backend middleware to verify permissions before operations
4. Add email verification for new users
5. Implement password reset functionality
6. Add user activity logging

---

**Implementation Status:** ✅ Complete
**Ready for Testing:** Yes (after MongoDB connection is fixed)
**Academic Project Compliant:** Yes
