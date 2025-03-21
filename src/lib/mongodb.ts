// src/lib/mongodb.ts
import mongoose from 'mongoose';
import type { MongooseConnection } from '@/types/mongoose';

// Get the MongoDB URI from environment variables
const getMongoURI = (): string => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  // Validate the URI format
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('Invalid MongoDB URI format. URI must start with mongodb:// or mongodb+srv://');
  }

  return uri;
};

const MONGODB_URI = getMongoURI();

const cached: MongooseConnection = global.mongoose ?? {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    try {
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then(mongoose => {
          return mongoose.connection;
        })
        .catch((error: unknown) => {
          console.error('MongoDB connection error:', error);
          cached.promise = null;
          throw error;
        });
    } catch (initialError) {
      console.error('Error during MongoDB connection setup:', initialError);
      cached.promise = null;
      throw initialError;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    console.error('Failed to resolve MongoDB connection promise:', error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
