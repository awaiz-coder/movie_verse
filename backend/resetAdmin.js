const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://awaizkalyani_db_user:Awaiz%409747@cluster0.haavhvs.mongodb.net/');
    
    // Delete existing admin
    await User.deleteOne({ email: 'admin@movieverse.com' });
    console.log('Removed existing admin user');
    
    // Create new admin with proper password hashing
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@movieverse.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://via.placeholder.com/150'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@movieverse.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin();