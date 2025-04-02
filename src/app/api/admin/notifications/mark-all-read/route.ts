// src/app/api/admin/notifications/mark-all-read/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getNotificationModel } from '@/lib/notifications/admin-notifications';

// Mark all notifications as read for the current user
export async function POST(request: Request): Promise<Response> {
  try {
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

    // Connect to database
    await dbConnect();

    // Get notification model from the shared function
    const AdminNotification = await getNotificationModel();

    // Update all notifications for this user
    const result = await AdminNotification.updateMany(
      {
        recipients: new mongoose.Types.ObjectId(userId),
        isRead: false,
      },
      {
        $set: { isRead: true },
      }
    );

    return NextResponse.json({
      success: true,
      message: 'All notifications marked as read',
      count: result.modifiedCount,
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
