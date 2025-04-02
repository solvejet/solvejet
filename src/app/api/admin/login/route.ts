// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type mongoose from 'mongoose';
import type { Document, Model } from 'mongoose';
import { secureInputValidation } from '@/lib/security/validation';
import { SECURITY_CONFIG } from '@/lib/security/constants';
import dbConnect from '@/lib/mongodb';
import User, { type IUser, type UserRole } from '@/models/User';

// Create a schema for input validation
const loginSchema = z.object({
  email: secureInputValidation.email,
  password: z.string().min(6).max(100),
  rememberMe: z.boolean().optional().default(false),
});

// Interface for the authenticated user data returned to client
interface AuthUserResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Interface for login success response
interface LoginSuccessResponse {
  success: true;
  user: AuthUserResponse;
  token: string;
}

// Interface for login error response
interface LoginErrorResponse {
  success: false;
  message: string;
  errors?: z.ZodIssue[];
  code?: string;
}

// JWT Payload type for better type safety
interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

// Define the proper type for a Mongoose document with _id
type UserDocument = Document<unknown, object, IUser> & IUser & { _id: mongoose.Types.ObjectId };

// Initialize a super admin user if none exists
async function initializeSuperAdmin(): Promise<void> {
  try {
    // Explicitly type the model to avoid TypeScript errors
    const UserModel = User as Model<IUser>;

    // Check if any super admin exists
    const superAdmin = (await UserModel.findOne({
      role: 'SUPER_ADMIN',
    }).exec()) as UserDocument | null;

    if (!superAdmin) {
      console.warn('No super admin found, creating default super admin account...');

      // Create a default super admin
      const hashedPassword = await bcrypt.hash('Karan@2002', 10);

      // Create new document instance with explicit typing
      const newAdmin = new UserModel({
        email: 'karan@solvejet.net',
        password: hashedPassword,
        name: 'Karan Shah',
        role: 'SUPER_ADMIN' as UserRole,
        permissions: ['*'], // All permissions
      }) as UserDocument;

      await newAdmin.save();
      console.warn('Default super admin account created successfully');
    }
  } catch (error) {
    console.error('Error initializing super admin:', error);
  }
}

// Generate a JWT token with proper typing
function generateToken(payload: JwtPayload, secret: string, expiresIn: number): string {
  // Convert the payload to a plain object to avoid type issues
  const tokenPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    permissions: payload.permissions,
  };

  // Explicitly type the secret for jsonwebtoken
  const secretKey: string = secret;
  return sign(tokenPayload, secretKey, { expiresIn });
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Check if we need to initialize a super admin
    await initializeSuperAdmin();

    // Parse and validate request body using Zod
    const rawBody = (await request.json()) as Record<string, unknown>;
    const result = loginSchema.safeParse(rawBody);

    if (!result.success) {
      const errorResponse: LoginErrorResponse = {
        success: false,
        message: 'Invalid input data',
        errors: result.error.errors,
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const { email, password, rememberMe } = result.data;

    // Explicitly type the model to avoid TypeScript errors
    const UserModel = User as Model<IUser>;

    // Find user in the database
    const user = (await UserModel.findOne({ email }).lean().exec()) as
      | (UserDocument & { role: UserRole })
      | null;

    if (!user) {
      const errorResponse: LoginErrorResponse = {
        success: false,
        message: 'Invalid email or password',
      };

      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Password verification with constant-time comparison (bcrypt)
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      const errorResponse: LoginErrorResponse = {
        success: false,
        message: 'Invalid email or password',
      };

      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Create authentication token
    const tokenExpiry = rememberMe
      ? SECURITY_CONFIG.TOKEN_EXPIRY * 7 // 7 days if remember me is checked
      : SECURITY_CONFIG.TOKEN_EXPIRY; // 24 hours default

    // Using environment variable for JWT secret (in a real app, this would be in .env)
    const jwtSecret = process.env.JWT_SECRET ?? 'your-default-jwt-secret-for-dev-only';

    // Create the token payload with proper typing
    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    // Generate token using our helper function to maintain type safety
    const tokenExpirySec = Math.floor(tokenExpiry / 1000); // Convert to seconds for JWT
    const token = generateToken(payload, jwtSecret, tokenExpirySec);

    // Set HTTP-only cookie for added security
    try {
      // FIXED: Properly await the cookies() API
      const cookieStore = await cookies();

      // Set the cookie
      cookieStore.set({
        name: 'admin_session',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: tokenExpirySec, // Seconds
        sameSite: 'strict',
      });
    } catch (cookieError) {
      console.error(
        'Error setting cookie:',
        cookieError instanceof Error ? cookieError.message : 'Unknown error'
      );
      // Continue anyway - the token is still returned in the response
    }

    // Create typed response object
    const successResponse: LoginSuccessResponse = {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token, // Keep token in response as per your requirement
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('Login error:', error);

    const errorResponse: LoginErrorResponse = {
      success: false,
      message: 'An internal server error occurred',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
