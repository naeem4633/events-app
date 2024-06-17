const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    console.log('MongoDB connected');

    // Check if the Events database already exists
    const adminDB = mongoose.connection.db.admin();
    const databases = await adminDB.listDatabases();
    const existingDB = databases.databases.find(db => db.name === 'Events-Database');

    if (!existingDB) {
      await mongoose.connection.db.createCollection('Events-Database');
      console.log('Events-Database created');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;