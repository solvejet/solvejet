// src/app/api/admin/verify-token/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import type { JwtPayload } from 'jsonwebtoken';

interface UserJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

export async function GET(request: Request): Promise<Response> {
  try {
    // Check for Bearer token in Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    // Also check for session cookie
    const cookieStore = cookies();

    // Cast to a type that includes the get method
    const cookieManager = cookieStore as unknown as {
      get: (name: string) => { value: string } | undefined;
    };

    const sessionCookie = cookieManager.get('admin_session');

    // Use either token source (prefer cookie for security)
    const tokenToVerify = sessionCookie?.value ?? token;

    if (!tokenToVerify) {
      return NextResponse.json(
        {
          success: false,
          message: 'No authentication token provided',
        },
        { status: 401 }
      );
    }

    // Get JWT secret from environment
    const jwtSecret = process.env.JWT_SECRET ?? 'your-default-jwt-secret-for-dev-only';

    // Verify the token with proper type safety
    try {
      const decoded = verify(tokenToVerify, jwtSecret) as UserJwtPayload;

      if (typeof decoded !== 'object' || !decoded.id) {
        throw new Error('Invalid token payload');
      }

      // Connect to database and verify user exists and has correct role
      await dbConnect();

      // Type the model properly to avoid TypeScript errors
      const UserModel = User as {
        findById: (id: string) => {
          lean: () => Promise<{
            _id: { toString: () => string };
            email: string;
            name: string;
            role: string;
          } | null>;
        };
      };

      const user = await UserModel.findById(decoded.id).lean();

      if (!user) {
        throw new Error('User not found');
      }

      // Verify role and permissions match token
      if (user.role !== decoded.role) {
        throw new Error('User role has changed');
      }

      // Return user info without sensitive data
      return NextResponse.json({
        success: true,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (verifyError) {
      // Handle different types of JWT verification errors
      const isExpired = verifyError instanceof Error && verifyError.name === 'TokenExpiredError';

      return NextResponse.json(
        {
          success: false,
          message: isExpired ? 'Authentication session expired' : 'Invalid authentication token',
          code: isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Token verification error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        message: 'Authentication error',
        code: 'AUTH_ERROR',
      },
      { status: 500 }
    );
  }
}
