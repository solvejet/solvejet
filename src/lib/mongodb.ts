import mongoose, { Connection, Mongoose } from 'mongoose'

interface GlobalWithMongoose extends Global {
  mongoose: {
    conn: Connection | null
    promise: Promise<Mongoose> | null
  }
}

declare const global: GlobalWithMongoose

interface MongoDBOptions {
  bufferCommands?: boolean
  dbName?: string
  autoIndex?: boolean
}

/**
 * Get MongoDB URI from environment variables
 * @throws {Error} If MONGODB_URI is not defined
 * @returns {string} MongoDB URI
 */
function getMongoURI(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  return uri
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached = global.mongoose ?? {
  conn: null,
  promise: null,
}

if (!global.mongoose) {
  global.mongoose = cached
}

/**
 * Connect to MongoDB database
 * @param {MongoDBOptions} options - MongoDB connection options
 * @returns {Promise<Connection>} MongoDB connection
 */
export async function connectToDatabase(
  options: MongoDBOptions = {}
): Promise<Connection> {
  const {
    bufferCommands = false,
    dbName = 'solvejet',
    autoIndex = true,
  } = options

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands,
      dbName,
      autoIndex,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    cached.promise = mongoose
      .connect(getMongoURI(), opts)
      .then((mongoose) => mongoose)
      .catch((error: Error) => {
        console.error('MongoDB connection error:', error)
        throw error
      })
  }

  try {
    const client = await cached.promise
    cached.conn = client.connection
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

/**
 * Disconnect from MongoDB database
 * @returns {Promise<void>}
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await cached.conn.close()
    cached.conn = null
    cached.promise = null
  }
}

// Export the mongoose connection for external use if needed
export const mongooseConnection = cached
