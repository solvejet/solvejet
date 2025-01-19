// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  consent: z.boolean().refine((val) => val === true),
  marketingConsent: z.boolean().optional(),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // const validatedData = contactSchema.parse(data)

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Log the contact request
    // For example:

    // await prisma.contact.create({
    //   data: {
    //     ...validatedData,
    //     createdAt: new Date(),
    //     status: 'NEW'
    //   }
    // });

    // Example email sending (you'd need to set up your email provider)
    // await sendEmail({
    //   to: process.env.NOTIFICATION_EMAIL,
    //   subject: 'New Contact Form Submission',
    //   text: `New contact from ${validatedData.name} (${validatedData.email})`
    // });

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
