// src/lib/email/email-service.ts
import nodemailer from 'nodemailer';

export interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: {
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }[];
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: Error;
}

/**
 * Send an email using Nodemailer
 */
export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  try {
    // Check for required environment variables
    const host = process.env.EMAIL_SERVER_HOST;
    const port = process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT, 10) : 587;
    const user = process.env.EMAIL_SERVER_USER;
    const password = process.env.EMAIL_SERVER_PASSWORD;
    const defaultFrom = process.env.EMAIL_FROM ?? 'hello@solvejet.net';

    // If any required config is missing in production, log an error
    if (!host || !user || !password) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Missing email configuration. Emails will not be sent.');
        return { success: false, error: new Error('Missing email configuration') };
      } else {
        // In development/test, log to console instead
        console.warn('Email would have been sent:', {
          to: emailData.to,
          subject: emailData.subject,
          text:
            (emailData.text?.substring(0, 100) ?? '') +
            (emailData.text && emailData.text.length > 100 ? '...' : ''),
        });
        return { success: true, messageId: 'dev-mode-no-email-sent' };
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass: password,
      },
    });

    // Send email
    const result = await transporter.sendMail({
      from: emailData.from ?? defaultFrom,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo,
      attachments: emailData.attachments,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error sending email'),
    };
  }
}
