// models/Contact.ts
import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
  marketingConsent: Boolean,
  files: [
    {
      fileName: String,
      fileUrl: String,
      fileType: String,
    },
  ],
  voiceNote: {
    fileName: String,
    fileUrl: String,
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'COMPLETED'],
    default: 'NEW',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema)
