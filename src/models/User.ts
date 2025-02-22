
// src/models/User.ts
import mongoose from 'mongoose';
import type { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define valid user roles
export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

// Password validation function type
type PasswordValidator = (password: string) => boolean;

// Password validation function
const validatePassword: PasswordValidator = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

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
      minlength: 8,
      validate: {
        validator: validatePassword,
        message: 'Password must contain at least one letter and one number'
      }
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'EDITOR', 'VIEWER'] as UserRole[],
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

// Create the model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;