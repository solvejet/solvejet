// app/api/csrf/route.ts
import { NextResponse } from 'next/server'
import { generateToken } from '@/lib/csrf'

export async function GET() {
  try {
    const { clientToken, sessionToken } = await generateToken()

    const response = NextResponse.json({ token: clientToken })

    // Set cookie using NextResponse
    response.cookies.set('csrf_session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
