// src/app/api/admin/notifications/[id]/read/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import { markNotificationsAsRead } from '@/lib/notifications/admin-notifications';

// Mark specific notification as read
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const resolvedParams = await params;
    const notificationId = resolvedParams.id;

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

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
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication failed',
        },
        { status: 401 }
      );
    }

    // Validate notification ID
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid notification ID format',
        },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Mark notification as read using the shared function
    const success = await markNotificationsAsRead([notificationId], userId);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to mark notification as read',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read',
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
