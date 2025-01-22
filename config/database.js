import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB using Mongoose');
});

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: 'cse341' // My database name
    });
    return mongoose.connection.db;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    throw new Error('Database connection failed: ' + err.message);
  }
};

export const initDb = async (callback) => {
  try {
    await mongoose.connect(uri, {
      dbName: 'cse341' // My database name
    });
    callback(null);
  } catch (err) {
    callback(err);
  }
};
