/**
 * Database Configuration
 * Connects to MongoDB using Mongoose
 */

import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/a2z-shop';
    console.log(`Connecting to MongoDB at ${mongoURI}...`);

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `Error connecting to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    process.exit(1);
  }
};

export default connectDB;
