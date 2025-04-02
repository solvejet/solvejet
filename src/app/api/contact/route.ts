// src/app/api/contact/route.ts
import dbConnect from '@/lib/mongodb';
import { sendAdminNotification } from '@/lib/notifications/admin-notifications';
import { secureInputValidation } from '@/lib/security/validation';
import { sendEmail } from '@/lib/email/email-service';
import {
  generateContactConfirmationEmail,
  generateContactNotificationEmail,
} from '@/lib/email/templates';
import type mongoose from 'mongoose';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { ZodIssue } from 'zod';
import ContactSubmissionModel from '@/models/ContactSubmission';
import User from '@/models/User';

// Create a schema for input validation
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: secureInputValidation.email,
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  services: z.object({
    customSoftware: z.boolean().default(false),
    webDevelopment: z.boolean().default(false),
    mobileDevelopment: z.boolean().default(false),
    cloudServices: z.boolean().default(false),
    aiSolutions: z.boolean().default(false),
    staffAugmentation: z.boolean().default(false),
    other: z.boolean().default(false),
  }),
  source: z.string().default('website'),
});

// Define the type for the form data from zod schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Interface for success response
interface ContactSuccessResponse {
  success: true;
  message: string;
  id: string;
}

// Interface for error response
interface ContactErrorResponse {
  success: false;
  message: string;
  errors?: ZodIssue[];
  code?: string;
}

// Extended document type with the properties we need
interface ContactSubmissionDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  notificationSent?: boolean;
  emailConfirmationSent?: boolean;
}

// Type-safe function to find admin users
async function findAdminUsers(): Promise<mongoose.Types.ObjectId[]> {
  try {
    // Connect to the DB if not already connected
    await dbConnect();

    // Create a type-safe query to find admin users
    const query = { $or: [{ role: 'SUPER_ADMIN' }, { role: 'ADMIN' }] };
    const projection = { _id: 1 };

    // Explicitly type the model to avoid ESLint unsafe call warning
    const userModel = User as mongoose.Model<unknown>;

    // Execute the query
    const adminDocs = (await userModel.find(query, projection).lean()) as {
      _id: mongoose.Types.ObjectId;
    }[];

    // Process the results safely
    const adminIds: mongoose.Types.ObjectId[] = [];

    for (const doc of adminDocs) {
      // The doc._id is already a mongoose.Types.ObjectId from our type assertion above
      adminIds.push(doc._id);
    }

    return adminIds;
  } catch (error) {
    console.error('Error finding admin users:', error);
    return [];
  }
}

// Type-safe function to find admin emails
async function findAdminEmails(): Promise<string[]> {
  try {
    // Connect to the DB if not already connected
    await dbConnect();

    // Create a type-safe query to find admin users
    const query = { $or: [{ role: 'SUPER_ADMIN' }, { role: 'ADMIN' }] };
    const projection = { email: 1 };

    // Explicitly type the model to avoid ESLint unsafe call warning
    const userModel = User as mongoose.Model<unknown>;

    // Execute the query
    const adminDocs = (await userModel.find(query, projection).lean()) as unknown as {
      email: string;
    }[];

    // Process the results safely
    return adminDocs.map(doc => doc.email);
  } catch (error) {
    console.error('Error finding admin emails:', error);
    return [];
  }
}

// Type-safe function to create contact submission
async function createContactSubmission(data: {
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
  message: string;
  services: Record<string, boolean>;
  source: string;
  ipAddress: string;
  userAgent: string;
}): Promise<ContactSubmissionDocument> {
  // Connect to the DB if not already connected
  await dbConnect();

  // Create the submission document - use the imported model directly
  const submission = new ContactSubmissionModel(data) as ContactSubmissionDocument;

  // Save and return
  await submission.save();
  return submission;
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse and validate request body using Zod
    const requestData = (await request.json()) as Record<string, unknown>;
    const result = contactFormSchema.safeParse(requestData);

    if (!result.success) {
      const errorResponse: ContactErrorResponse = {
        success: false,
        message: 'Invalid form data',
        errors: result.error.errors,
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Now we have properly typed data
    const validatedData: ContactFormData = result.data;

    // Capture IP and user agent for security and analytics
    const headersList = headers();
    const ipAddressHeader =
      (await headersList).get('x-forwarded-for') ?? (await headersList).get('x-real-ip');
    const ipAddress: string = ipAddressHeader ?? 'unknown';

    const userAgentHeader = (await headersList).get('user-agent');
    const userAgent: string = userAgentHeader ?? 'unknown';

    // Get the host to use for email templates
    const host = (await headersList).get('host') ?? 'solvejet.net';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    // Sanitize inputs (especially the message which could contain HTML)
    const sanitizedData = {
      ...validatedData,
      name: secureInputValidation.sanitizeHTML(validatedData.name),
      message: secureInputValidation.sanitizeHTML(validatedData.message),
      company: validatedData.company
        ? secureInputValidation.sanitizeHTML(validatedData.company)
        : undefined,
    };

    // Create new contact submission using our type-safe function
    const submissionDoc = await createContactSubmission({
      ...sanitizedData,
      ipAddress,
      userAgent,
    });

    // Get the submission ID as a string
    const submissionId: string = submissionDoc._id.toString();

    // Find admin users using our type-safe function
    const adminRecipients = await findAdminUsers();

    // Notify admins (for future mobile notifications)
    if (adminRecipients.length > 0) {
      try {
        // Get service names that were selected
        const selectedServices = Object.entries(sanitizedData.services)
          .filter(([, value]) => value)
          .map(([key]) => {
            switch (key) {
              case 'customSoftware':
                return 'Custom Software';
              case 'webDevelopment':
                return 'Web Development';
              case 'mobileDevelopment':
                return 'Mobile Development';
              case 'cloudServices':
                return 'Cloud Services';
              case 'aiSolutions':
                return 'AI Solutions';
              case 'staffAugmentation':
                return 'Staff Augmentation';
              case 'other':
                return 'Other Services';
              default:
                return key;
            }
          })
          .join(', ');

        await sendAdminNotification({
          type: 'new_contact',
          title: 'New Contact Form Submission',
          message: `New inquiry from ${sanitizedData.name} about ${selectedServices}`,
          data: {
            submissionId,
            email: sanitizedData.email,
            source: sanitizedData.source,
            services: selectedServices,
          },
          recipients: adminRecipients,
        });

        // Mark notification as sent
        submissionDoc.notificationSent = true;
        await submissionDoc.save();
      } catch (notifyError) {
        console.error('Error sending admin notification:', notifyError);
        // Continue execution - notifications are not critical for submission
      }
    }

    // Send email confirmation to the user
    try {
      const { subject, text, html } = generateContactConfirmationEmail(sanitizedData, {
        baseUrl,
      });

      const emailResult = await sendEmail({
        to: sanitizedData.email,
        subject,
        text,
        html,
        replyTo: process.env.CONTACT_EMAIL ?? 'karan@solvejet.net',
      });

      if (emailResult.success) {
        submissionDoc.emailConfirmationSent = true;
        await submissionDoc.save();
      } else {
        console.error('Failed to send confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue execution - email confirmation is not critical for submission
    }

    // Send notification email to admins
    try {
      const adminEmails = await findAdminEmails();

      if (adminEmails.length > 0) {
        const { subject, text, html } = generateContactNotificationEmail(sanitizedData);

        await sendEmail({
          to: adminEmails.join(','),
          subject,
          text,
          html,
          replyTo: sanitizedData.email,
        });
      }
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError);
      // Continue execution - admin notification email is not critical
    }

    // Return success response
    const successResponse: ContactSuccessResponse = {
      success: true,
      message: 'Contact form submitted successfully',
      id: submissionId,
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    console.error('Contact form submission error:', error);

    const errorResponse: ContactErrorResponse = {
      success: false,
      message: 'An error occurred while processing your submission',
      code: 'INTERNAL_ERROR',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Block unsupported methods
export function GET(): NextResponse {
  return methodNotAllowed();
}

export function PUT(): NextResponse {
  return methodNotAllowed();
}

export function DELETE(): NextResponse {
  return methodNotAllowed();
}

export function PATCH(): NextResponse {
  return methodNotAllowed();
}

function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
    },
    {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    }
  );
}
