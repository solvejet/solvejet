// src/lib/notifications/admin-notifications.ts
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

// Notification types for better type safety
export type NotificationType = 'new_contact' | 'contact_status_changed' | 'system_alert';

// Notification interface with properly defined optional types
export interface AdminNotification {
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown> | undefined;
  recipients: mongoose.Types.ObjectId[]; // User IDs
  isRead?: boolean | undefined;
  createdAt?: Date | undefined;
}

// Schema interface to match document shape
interface AdminNotificationDocument extends mongoose.Document, AdminNotification {}

// Define the schema for admin notifications with proper defaults
const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['new_contact', 'contact_status_changed', 'system_alert'],
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  recipients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model dynamically to avoid issues with Next.js
export const getNotificationModel = async (): Promise<
  mongoose.Model<AdminNotificationDocument>
> => {
  await dbConnect();
  return (
    mongoose.models.AdminNotification ??
    mongoose.model<AdminNotificationDocument>('AdminNotification', notificationSchema)
  );
};

// Function to send notifications
export async function sendAdminNotification(notification: AdminNotification): Promise<boolean> {
  try {
    // Connect to database if not already connected
    await dbConnect();

    // Get model
    const AdminNotification = await getNotificationModel();

    // Create notification in database
    await AdminNotification.create({
      ...notification,
      createdAt: new Date(),
    });

    // In the future, this function will be extended to support mobile push notifications
    if (process.env.NODE_ENV !== 'production') {
      console.warn('📱 Would send mobile push notification:', {
        title: notification.title,
        body: notification.message,
        data: notification.data,
        to: notification.recipients,
      });
    }

    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}

// Function to mark notifications as read
export async function markNotificationsAsRead(
  notificationIds: string[],
  userId: string
): Promise<boolean> {
  try {
    await dbConnect();
    const AdminNotification = await getNotificationModel();

    await AdminNotification.updateMany(
      {
        _id: { $in: notificationIds.map(id => new mongoose.Types.ObjectId(id)) },
        recipients: new mongoose.Types.ObjectId(userId),
      },
      { $set: { isRead: true } }
    );

    return true;
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return false;
  }
}

// Function to get notifications for a user
export async function getNotificationsForUser(
  userId: string,
  limit = 20,
  skip = 0
): Promise<AdminNotification[]> {
  try {
    await dbConnect();
    const AdminNotification = await getNotificationModel();

    const notifications = await AdminNotification.find({
      recipients: new mongoose.Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return notifications as unknown as AdminNotification[];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

// Count unread notifications for a user
export async function countUnreadNotifications(userId: string): Promise<number> {
  try {
    await dbConnect();
    const AdminNotification = await getNotificationModel();

    const count = await AdminNotification.countDocuments({
      recipients: new mongoose.Types.ObjectId(userId),
      isRead: false,
    });

    return count;
  } catch (error) {
    console.error('Error counting unread notifications:', error);
    return 0;
  }
}
