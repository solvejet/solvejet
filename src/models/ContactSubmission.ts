// src/models/ContactSubmission.ts
import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  services: {
    customSoftware: boolean;
    webDevelopment: boolean;
    mobileDevelopment: boolean;
    cloudServices: boolean;
    aiSolutions: boolean;
    staffAugmentation: boolean;
    other: boolean;
  };
  status: 'new' | 'in_progress' | 'completed';
  assignedTo?: mongoose.Types.ObjectId; // Reference to User ID
  source: string; // Where the submission came from (e.g., 'custom_software_page')
  notificationSent: boolean; // Flag for push notification status
  emailConfirmationSent: boolean; // Flag for email confirmation status
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new mongoose.Schema<IContactSubmission>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    services: {
      customSoftware: {
        type: Boolean,
        default: false,
      },
      webDevelopment: {
        type: Boolean,
        default: false,
      },
      mobileDevelopment: {
        type: Boolean,
        default: false,
      },
      cloudServices: {
        type: Boolean,
        default: false,
      },
      aiSolutions: {
        type: Boolean,
        default: false,
      },
      staffAugmentation: {
        type: Boolean,
        default: false,
      },
      other: {
        type: Boolean,
        default: false,
      },
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'completed'],
      default: 'new',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    source: {
      type: String,
      required: true,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
    emailConfirmationSent: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster querying
ContactSubmissionSchema.index({ status: 1 });
ContactSubmissionSchema.index({ createdAt: -1 });
ContactSubmissionSchema.index({ email: 1 });

// Create the model - proper pattern for Next.js
// This uses a safer pattern that avoids the unnecessary conditional check
let ContactSubmissionModel: mongoose.Model<IContactSubmission>;

// Check if the model exists, if not, create it
if (mongoose.models.ContactSubmission) {
  ContactSubmissionModel = mongoose.models.ContactSubmission as mongoose.Model<IContactSubmission>;
} else {
  ContactSubmissionModel = mongoose.model<IContactSubmission>(
    'ContactSubmission',
    ContactSubmissionSchema
  );
}

export default ContactSubmissionModel;
