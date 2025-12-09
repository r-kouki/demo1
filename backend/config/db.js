const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('⚠️  Server will run but database operations will fail until MongoDB connects.');
    console.log('💡 Fix: Whitelist your IP in MongoDB Atlas Network Access');
  }
};

module.exports = connectDB;
