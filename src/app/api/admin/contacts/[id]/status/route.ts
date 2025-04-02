// src/app/api/admin/contacts/[id]/status/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import type { Model } from 'mongoose';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import ContactSubmissionModel from '@/models/ContactSubmission';
import type { IContactSubmission } from '@/models/ContactSubmission';
import { sendAdminNotification } from '@/lib/notifications/admin-notifications';
import type { IUser } from '@/models/User';

// Define the interface for the request body
interface StatusUpdateBody {
  status: 'new' | 'in_progress' | 'completed';
}

// Interface for User document with name field
interface UserWithName {
  _id: mongoose.Types.ObjectId;
  name?: string;
}

// Interface for the User document with _id
interface UserWithId {
  _id: mongoose.Types.ObjectId;
}

// Update contact status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const resolvedParams = await params;
    const contactId = resolvedParams.id;

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
      const decoded = verify(tokenToVerify, jwtSecret) as { id: string; role: string };
      if (typeof decoded !== 'object') {
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

    // Parse request body with type safety
    const bodyText = await request.text();
    const body = JSON.parse(bodyText) as StatusUpdateBody;
    const { status } = body;

    // Validate status
    if (!['new', 'in_progress', 'completed'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid status value, must be one of: new, in_progress, completed',
        },
        { status: 400 }
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

    // Find the contact submission and update it directly using findByIdAndUpdate
    const updatedContact = await ContactSubmissionModel.findByIdAndUpdate(
      contactId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact not found',
        },
        { status: 404 }
      );
    }

    // Convert the Mongoose document to a plain object with proper typing
    const contactData = updatedContact.toObject() as IContactSubmission;

    // Properly type the User model
    const UserModel = mongoose.models.User as Model<IUser>;

    // Find the admin user's name with proper typing
    const adminUserResult = await UserModel.findById(userId).select('name').lean();

    // Use explicit type casting with a specific known shape
    const adminUser = adminUserResult as UserWithName | null;

    // Get admin name with safe null check
    const adminName = adminUser?.name ?? 'An administrator';

    // Find all admin users to notify with proper typing
    const adminUsersResult = await UserModel.find({
      $or: [{ role: 'SUPER_ADMIN' }, { role: 'ADMIN' }],
    })
      .select('_id')
      .lean();

    // Use explicit type casting with a specific known shape
    const adminUsers = adminUsersResult as unknown as UserWithId[];

    // Extract _id values
    const adminIds: mongoose.Types.ObjectId[] = adminUsers.map(user => user._id);

    // Send notification to all admins
    if (adminIds.length > 0) {
      await sendAdminNotification({
        type: 'contact_status_changed',
        title: 'Contact Status Updated',
        message: `${adminName} changed the status of ${contactData.name}'s contact to ${status}`,
        data: {
          submissionId: contactId,
          email: contactData.email,
          newStatus: status,
          updatedBy: userId,
        },
        recipients: adminIds,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully',
      contact: contactData,
    });
  } catch (error) {
    console.error('Error updating contact status:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
