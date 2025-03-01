// src/scripts/seed-admin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import type { Document, Model } from 'mongoose';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env.local');

// Load environment variables with proper error handling
function loadEnvFile(filePath: string): void {
  try {
    dotenv.config({ path: filePath });
    // eslint-disable-next-line no-console
    console.log(`Environment variables loaded from ${filePath}`);
  } catch (err) {
    console.error(
      `Exception loading ${filePath}:`,
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
}

if (fs.existsSync(envPath)) {
  // eslint-disable-next-line no-console
  console.log(`Loading environment from ${envPath}`);
  loadEnvFile(envPath);
} else {
  // eslint-disable-next-line no-console
  console.log('No .env.local found, falling back to .env');
  loadEnvFile(path.resolve(__dirname, '../../.env'));
}

// Define the User schema
interface IUser {
  email: string;
  password: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

type UserDocument = Document<unknown, object, IUser> & IUser;
type UserModel = Model<IUser>;

// Admin users to seed
const adminUsers = [
  {
    email: 'karan@solvejet.net',
    password: 'Karan@2002',
    name: 'Super Admin',
    role: 'SUPER_ADMIN' as const,
    permissions: ['*'],
  },
];

async function seedAdmins(): Promise<void> {
  try {
    // Get MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // eslint-disable-next-line no-console
    console.log('Connecting to MongoDB...');

    // Connect to MongoDB
    await mongoose.connect(uri);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');

    // Get or create User model
    const UserSchema = new mongoose.Schema<IUser>(
      {
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER'],
          default: 'VIEWER',
        },
        permissions: [
          {
            type: String,
          },
        ],
      },
      {
        timestamps: true,
      }
    );

    // Create the model if it doesn't exist - using nullish coalescing operator
    const User = (mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema)) as UserModel;

    // Seed admin users
    for (const admin of adminUsers) {
      // Check if user already exists
      const existingUser = (await User.findOne({
        email: admin.email,
      }).exec()) as UserDocument | null;

      if (existingUser) {
        // eslint-disable-next-line no-console
        console.log(`User ${admin.email} already exists. Skipping...`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);

      // Create new user
      const newUser = new User({
        ...admin,
        password: hashedPassword,
      });

      await newUser.save();
      // eslint-disable-next-line no-console
      console.log(`User ${admin.email} created successfully with role ${admin.role}`);
    }

    // eslint-disable-next-line no-console
    console.log('Admin seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding admin users:', error);
  } finally {
    // Close MongoDB connection
    await mongoose.disconnect();
    // eslint-disable-next-line no-console
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
void seedAdmins();
