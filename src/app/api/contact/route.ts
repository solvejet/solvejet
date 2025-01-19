// src/app/api/contact/route.ts

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { Contact } from '@/models/Contact'
import { saveFile, saveBase64File } from '@/lib/storage'
import { sendThankYouEmail } from '@/lib/email'
import type { NextRequest } from 'next/server'

// Types for the contact form data
interface FileRecord {
  fileName: string
  fileUrl: string
  fileType: string
}

interface VoiceNoteRecord {
  fileName: string
  fileUrl: string
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  message: z.string().min(10, 'Please describe your needs'),
  consent: z.boolean().refine((val) => val === true, 'Consent is required'),
  marketingConsent: z.boolean().optional(),
  files: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        data: z.string(), // Base64 encoded file data
      })
    )
    .optional(),
  voiceNote: z
    .object({
      data: z.string(), // Base64 encoded audio data
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase()

    // Parse and validate request data
    const data = await request.json()
    const validatedData = contactSchema.parse(data)

    // Process files if present
    const fileRecords: FileRecord[] = []
    if (validatedData.files && validatedData.files.length > 0) {
      for (const file of validatedData.files) {
        const fileData = Buffer.from(file.data.split(',')[1], 'base64')
        const savedFile = await saveFile(fileData, file.name, 'contact-')
        fileRecords.push({
          fileName: savedFile.fileName,
          fileUrl: savedFile.fileUrl,
          fileType: file.type,
        })
      }
    }

    // Process voice note if present
    let voiceNoteRecord: VoiceNoteRecord | null = null
    if (validatedData.voiceNote) {
      const savedVoiceNote = await saveBase64File(
        validatedData.voiceNote.data,
        'voice-'
      )
      voiceNoteRecord = {
        fileName: savedVoiceNote.fileName,
        fileUrl: savedVoiceNote.fileUrl,
      }
    }

    // Get notification email from environment variables
    const notificationEmail = process.env.NOTIFICATION_EMAIL
    if (!notificationEmail) {
      throw new Error('NOTIFICATION_EMAIL environment variable is not defined')
    }

    // Save to database
    const contact = await Contact.create({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      message: validatedData.message,
      consent: validatedData.consent,
      marketingConsent: validatedData.marketingConsent,
      files: fileRecords,
      voiceNote: voiceNoteRecord,
      status: 'NEW',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Send thank you email
    await sendThankYouEmail({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
    })

    // Send internal notification
    await sendThankYouEmail({
      name: 'SolveJet Team',
      email: notificationEmail,
      company: validatedData.company,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: contact._id.toString(),
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Internal server error',
          message: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = searchParams.get('status')

  try {
    await connectToDatabase()

    const query = status ? { status } : {}
    const skip = (page - 1) * limit

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
