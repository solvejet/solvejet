// app/api/admin/auth/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { AdminUser } from '@/models/Admin'
import { verifyToken } from '@/lib/csrf'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '1d'

// Input validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// GET - Verify token and return user data
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload

    await connectToDatabase()

    const user = await AdminUser.findById(decoded.userId)
      .select('-password')
      .lean()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    })
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    // Verify CSRF token
    const csrfToken = request.headers.get('x-csrf-token')
    const sessionToken = request.cookies.get('csrf_session_token')?.value

    if (!csrfToken || !sessionToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }

    const isValidCsrf = await verifyToken(csrfToken, sessionToken)
    if (!isValidCsrf) {
      return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 })
    }

    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)

    // Connect to database
    await connectToDatabase()

    // Find user
    const user = await AdminUser.findOne({ email: validatedData.email })
    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await user.comparePassword(validatedData.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        roles: user.roles,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    // Create response
    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
