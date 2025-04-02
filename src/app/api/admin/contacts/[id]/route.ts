// src/app/api/admin/contacts/[id]/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import ContactSubmissionModel from '@/models/ContactSubmission';

// Get a specific contact by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const resolvedParams = await params;
    const contactId = resolvedParams.id;

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('admin_session');
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
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication failed',
        },
        { status: 401 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid contact ID format',
        },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find the contact submission
    const contact = await ContactSubmissionModel.findById(contactId).lean();

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
