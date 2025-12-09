const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@gymtrack.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gymtrack.com',
      password: 'admin123',
      role: 'admin',
      permissions: {
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
      },
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@gymtrack.com');
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('Permissions: Full Access (CRUD)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
