// src/app/api/admin/contacts/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import ContactSubmissionModel from '@/models/ContactSubmission';

// Get all contact submissions
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

    // Verify JWT token
    const jwtSecret = process.env.JWT_SECRET ?? 'your-default-jwt-secret-for-dev-only';

    try {
      const decoded = verify(tokenToVerify, jwtSecret);
      if (!decoded || typeof decoded !== 'object') {
        throw new Error('Invalid token');
      }
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

    // Get query parameters for filtering
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');

    // Build query
    const query: Record<string, unknown> = {};

    if (status && ['new', 'in_progress', 'completed'].includes(status)) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch contact submissions with optional filtering
    const contacts = await ContactSubmissionModel.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();

    return NextResponse.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
