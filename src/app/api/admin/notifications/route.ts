// src/app/api/admin/notifications/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import {
  getNotificationsForUser,
  countUnreadNotifications,
} from '@/lib/notifications/admin-notifications';

// Get notifications for the current user
export async function GET(request: Request): Promise<Response> {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    // Fix: Properly await cookies()
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    const tokenToVerify = sessionCookie?.value ?? token;

    if (!tokenToVerify) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required',
        },
        { status: 401 }
      );
    }

    // Verify JWT token and extract user ID
    const jwtSecret = process.env.JWT_SECRET ?? 'your-default-jwt-secret-for-dev-only';

    let userId: string;

    try {
      const decoded = verify(tokenToVerify, jwtSecret) as { id: string };
      if (typeof decoded !== 'object' || !decoded.id) {
        throw new Error('Invalid token');
      }
      userId = decoded.id;
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication failed',
        },
        { status: 401 }
      );
    }

    // Connect to database
    await dbConnect();

    // Get query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') ?? '20', 10);
    const skip = parseInt(url.searchParams.get('skip') ?? '0', 10);

    // Get notifications for user using the shared functions
    const notifications = await getNotificationsForUser(userId, limit, skip);

    // Count unread notifications
    const unreadCount = await countUnreadNotifications(userId);

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
